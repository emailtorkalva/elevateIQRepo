export type JobOpening = {
  id: string;
  title: string;
  location: string;
  employment_type: string;
  summary: string;
  published: boolean;
  sort_order: number;
};

/** Shown when Supabase has no published jobs yet. */
export const defaultJobOpenings: Omit<JobOpening, "id" | "published" | "sort_order">[] = [
  {
    title: "Senior IAM Consultant",
    location: "Atlanta, GA · Hybrid",
    employment_type: "Full-time",
    summary:
      "Lead SSO, IGA, and PAM implementations for healthcare and financial services clients.",
  },
  {
    title: "Cloud / DevOps Engineer",
    location: "Remote (US)",
    employment_type: "Full-time",
    summary:
      "Build landing zones, CI/CD pipelines, and observability for AWS and Azure programs.",
  },
  {
    title: "Technical Recruiter",
    location: "Atlanta, GA",
    employment_type: "Contract",
    summary:
      "Source cloud, security, and engineering talent for client augmentation programs.",
  },
];

export type CareersJob = {
  title: string;
  location: string;
  type: string;
  summary: string;
};
