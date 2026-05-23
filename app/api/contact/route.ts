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

export async function POST(req: Request) {
  if (!isSupabaseConfigured() || !getSupabaseServiceRoleKey()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Contact form is not configured. Add Supabase credentials to .env.local (see .env.example).",
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
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

    const { full_name, email, company, service, message } = parsed.data;
    const supabase = createAdminClient();

    const { data, error } = await supabase.from("contact_requests").insert([
      {
        full_name,
        email,
        company: company || null,
        service,
        message,
      },
    ]);

    if (error) {
      console.error("[contact] Supabase insert failed:", error.message);
      return NextResponse.json(
        {
          success: false,
          message:
            process.env.NODE_ENV === "development"
              ? error.message
              : "Unable to save your request. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
