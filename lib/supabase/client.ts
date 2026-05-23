import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/supabase/env";

let browserClient: SupabaseClient | undefined;

/**
 * Supabase client for Client Components, hooks, and browser code.
 * Reuses a singleton in the browser to avoid creating multiple instances.
 */
export function createClient(): SupabaseClient {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } =
    getSupabaseEnv();

  if (typeof window === "undefined") {
    return createBrowserClient(
      NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  if (!browserClient) {
    browserClient = createBrowserClient(
      NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  return browserClient;
}
