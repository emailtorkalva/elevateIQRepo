import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAdminConfigured()) {
    redirect("/admin/login");
  }

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
