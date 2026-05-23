import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

import {
  getSupabaseEnv,
  requireSupabaseServiceRoleKey,
} from "@/lib/supabase/env";

let adminClient: SupabaseClient | undefined;

/**
 * Supabase client with the service role key — bypasses Row Level Security.
 * Use only in trusted server code (cron jobs, webhooks, admin scripts).
 * Never import this module from Client Components.
 */
export function createAdminClient(): SupabaseClient {
  const { NEXT_PUBLIC_SUPABASE_URL } = getSupabaseEnv();
  const serviceRoleKey = requireSupabaseServiceRoleKey();

  if (!adminClient) {
    adminClient = createSupabaseClient(
      NEXT_PUBLIC_SUPABASE_URL,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }

  return adminClient;
}
