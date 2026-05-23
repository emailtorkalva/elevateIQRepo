export { createClient as createBrowserClient } from "@/lib/supabase/client";
export { createClient as createServerClient } from "@/lib/supabase/server";
export { createAdminClient } from "@/lib/supabase/admin";
export { updateSession } from "@/lib/supabase/middleware";
export {
  getSupabaseEnv,
  getSupabaseServiceRoleKey,
  isSupabaseConfigured,
  requireSupabaseServiceRoleKey,
  type SupabasePublicEnv,
} from "@/lib/supabase/env";
