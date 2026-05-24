import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, CONTACT_EMAIL, HQ_ADDRESS } from "@/lib/brand";
import { getPublishedJobsForCareers } from "@/lib/jobs-server";

export const metadata: Metadata = {
  title: `Careers | ${BRAND_NAME}`,
  description: `Join ${BRAND_NAME}—consulting roles in IAM, cloud, DevOps, and staffing.`,
};

export default async function CareersPage() {
  const openings = await getPublishedJobsForCareers();

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Careers"
            title="Work on programs that matter"
            description="We hire practitioners who communicate clearly, document their work, and care about client outcomes."
          />

          <p className="mt-8 text-sm text-muted-foreground">
            Headquarters: {HQ_ADDRESS}. We offer hybrid and remote roles for qualified US-based
            candidates.
          </p>

          <ul className="mt-10 space-y-6">
            {openings.map((job) => (
              <li
                key={`${job.title}-${job.location}`}
                className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-brand">{job.type}</span>
                  <span className="text-xs text-muted-foreground">{job.location}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold">{job.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{job.summary}</p>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-muted-foreground">
            Don&apos;t see a fit? Send your résumé to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">
              {CONTACT_EMAIL}
            </a>{" "}
            with the subject line &ldquo;Careers — [your specialty]&rdquo;.
          </p>

          <Button className="mt-6" variant="outline" asChild>
            <Link href="/about">Meet the leadership team</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
