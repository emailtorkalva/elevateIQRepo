import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
});

export type SupabasePublicEnv = z.infer<typeof publicEnvSchema>;

function formatZodError(error: z.ZodError): string {
  return error.issues.map((issue) => issue.message).join("; ");
}

/** True when both public Supabase env vars are present (does not throw). */
export function isSupabaseConfigured(): boolean {
  return publicEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }).success;
}

/** Validates and returns public Supabase env vars (safe for browser and server). */
export function getSupabaseEnv(): SupabasePublicEnv {
  const result = publicEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  if (!result.success) {
    throw new Error(
      `Supabase environment variables are missing or invalid: ${formatZodError(result.error)}. ` +
        "Copy .env.example to .env.local and add your project credentials from the Supabase dashboard."
    );
  }

  return result.data;
}

/** Service role key for trusted server-only operations (never expose to the client). */
export function getSupabaseServiceRoleKey(): string | undefined {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return key && key.length > 0 ? key : undefined;
}

export function requireSupabaseServiceRoleKey(): string {
  const key = getSupabaseServiceRoleKey();
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for this operation. Add it to .env.local (server-only)."
    );
  }
  return key;
}
