import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getSupabaseServiceRoleKey,
  isSupabaseConfigured,
} from "@/lib/supabase/env";

export async function GET() {
  const authError = await requireAdminApi();
  if (authError) return authError;

  if (!isSupabaseConfigured() || !getSupabaseServiceRoleKey()) {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured. Add Supabase env vars and run supabase/contact_requests.sql.",
      },
      { status: 503 }
    );
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("contact_requests")
      .select("id, full_name, email, company, service, message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ leads: data ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
