import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import {
  getSupabaseServiceRoleKey,
  isSupabaseConfigured,
} from "@/lib/supabase/env";
import {
  defaultJobOpenings,
  type CareersJob,
  type JobOpening,
} from "@/lib/jobs";

export async function getPublishedJobsForCareers(): Promise<CareersJob[]> {
  if (!isSupabaseConfigured() || !getSupabaseServiceRoleKey()) {
    return defaultJobOpenings.map((job) => ({
      title: job.title,
      location: job.location,
      type: job.employment_type,
      summary: job.summary,
    }));
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("job_openings")
      .select("title, location, employment_type, summary")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data?.length) {
      return defaultJobOpenings.map((job) => ({
        title: job.title,
        location: job.location,
        type: job.employment_type,
        summary: job.summary,
      }));
    }

    return data.map((row) => ({
      title: row.title,
      location: row.location,
      type: row.employment_type,
      summary: row.summary,
    }));
  } catch {
    return defaultJobOpenings.map((job) => ({
      title: job.title,
      location: job.location,
      type: job.employment_type,
      summary: job.summary,
    }));
  }
}

export async function listAllJobsAdmin(): Promise<JobOpening[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("job_openings")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as JobOpening[];
}
