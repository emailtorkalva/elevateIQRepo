import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/login-form";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/auth";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Admin sign in | ${BRAND_NAME}`,
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md rounded-xl border border-border/80 bg-card p-6 text-sm">
          <p className="font-semibold">Admin is not configured</p>
          <p className="mt-2 text-muted-foreground">
            Add <code className="text-xs">ADMIN_PASSWORD</code> (at least 8 characters) to your
            environment variables on Vercel, then redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (await isAdminAuthenticated()) {
    redirect("/admin/leads");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <AdminLoginForm />
    </div>
  );
}
