import type { Metadata } from "next";

import { JobsManager } from "@/components/admin/jobs-manager";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Jobs | Admin | ${BRAND_NAME}`,
  robots: { index: false, follow: false },
};

export default function AdminJobsPage() {
  return <JobsManager />;
}
