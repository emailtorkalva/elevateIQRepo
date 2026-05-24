import type { Metadata } from "next";

import { LeadsTable } from "@/components/admin/leads-table";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Leads | Admin | ${BRAND_NAME}`,
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return <LeadsTable />;
}
