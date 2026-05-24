import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminApi } from "@/lib/admin/auth";
import { listAllJobsAdmin } from "@/lib/jobs-server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getSupabaseServiceRoleKey,
  isSupabaseConfigured,
} from "@/lib/supabase/env";

const jobBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  employment_type: z.string().min(1, "Type is required"),
  summary: z.string().min(1, "Summary is required"),
  published: z.boolean().optional().default(true),
  sort_order: z.number().int().optional().default(0),
});

function supabaseUnavailable() {
  return NextResponse.json(
    {
      error:
        "Supabase is not configured. Add Supabase env vars and run supabase/job_openings.sql.",
    },
    { status: 503 }
  );
}

export async function GET() {
  const authError = await requireAdminApi();
  if (authError) return authError;

  if (!isSupabaseConfigured() || !getSupabaseServiceRoleKey()) {
    return supabaseUnavailable();
  }

  try {
    const jobs = await listAllJobsAdmin();
    return NextResponse.json({ jobs });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  if (!isSupabaseConfigured() || !getSupabaseServiceRoleKey()) {
    return supabaseUnavailable();
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = jobBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 }
    );
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("job_openings")
      .insert({
        ...parsed.data,
        updated_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ job: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
