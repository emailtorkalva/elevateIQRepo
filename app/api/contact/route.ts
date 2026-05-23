import { NextResponse } from "next/server";
import { z } from "zod";

import { createAdminClient } from "@/lib/supabase/admin";
import {
  getSupabaseServiceRoleKey,
  isSupabaseConfigured,
} from "@/lib/supabase/env";

const contactBodySchema = z.object({
  full_name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional().default(""),
  service: z.string().min(1, "Service is required"),
  message: z.string().min(1, "Message is required"),
});

function supabaseErrorMessage(error: { message: string; code?: string; hint?: string }) {
  const parts = [error.message];
  if (error.hint) parts.push(error.hint);
  return parts.join(" ");
}

/** GET /api/contact — quick deploy check (no secrets returned). */
export async function GET() {
  const hasPublic = isSupabaseConfigured();
  const hasServiceRole = Boolean(getSupabaseServiceRoleKey());

  if (!hasPublic || !hasServiceRole) {
    return NextResponse.json({
      ok: false,
      hasPublicEnv: hasPublic,
      hasServiceRoleKey: hasServiceRole,
      table: null,
      hint: "Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY on your host, then redeploy.",
    });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_requests").select("id").limit(1);

    if (error) {
      return NextResponse.json({
        ok: false,
        hasPublicEnv: true,
        hasServiceRoleKey: true,
        table: "error",
        supabaseMessage: error.message,
        supabaseCode: error.code ?? null,
        hint:
          error.code === "42P01" || /does not exist/i.test(error.message)
            ? "Run supabase/contact_requests.sql in the Supabase SQL Editor for this project."
            : "Check Vercel env vars match this Supabase project (Settings → API).",
      });
    }

    return NextResponse.json({
      ok: true,
      hasPublicEnv: true,
      hasServiceRoleKey: true,
      table: "contact_requests reachable",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({
      ok: false,
      hasPublicEnv: hasPublic,
      hasServiceRoleKey: hasServiceRole,
      table: "error",
      supabaseMessage: message,
      hint: "Fix Supabase env vars on your host and redeploy.",
    });
  }
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured() || !getSupabaseServiceRoleKey()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Contact form is not configured. Add Supabase env vars on Vercel (see .env.example), then redeploy.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid form data",
      },
      { status: 400 }
    );
  }

  try {
    const { full_name, email, company, service, message } = parsed.data;
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("contact_requests")
      .insert({
        full_name,
        email,
        company: company || null,
        service,
        message,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[contact] Supabase insert failed:", error.code, error.message, error.hint);
      return NextResponse.json(
        {
          success: false,
          message: supabaseErrorMessage(error),
          code: error.code ?? null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
