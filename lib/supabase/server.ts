import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/supabase/env";

/**
 * Supabase client for Server Components, Server Actions, and Route Handlers.
 * Reads/writes auth cookies via Next.js `cookies()`.
 */
export async function createClient(): Promise<SupabaseClient> {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } =
    getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll from a Server Component — session refresh is handled in middleware.
          }
        },
      },
    }
  );
}
