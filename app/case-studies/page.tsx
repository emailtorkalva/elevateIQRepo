import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/brand";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: `Case Studies | ${BRAND_NAME}`,
  description: `Client outcomes from ${BRAND_NAME} programs across healthcare, financial services, and retail.`,
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 sm:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Case studies"
            title="Programs with measurable outcomes"
            description="Representative engagements. Client names anonymized where required by NDA."
            className="max-w-2xl"
          />

          <div className="mt-14 space-y-8">
            {caseStudies.map((study) => (
              <article
                key={study.slug}
                className="rounded-2xl border border-border/80 bg-card p-8 sm:p-10"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                    {study.industry}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {study.duration}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight">{study.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{study.client}</p>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold">Challenge</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Approach</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {study.approach}
                    </p>
                  </div>
                </div>

                <h3 className="mt-6 text-sm font-semibold">Outcomes</h3>
                <ul className="mt-3 space-y-2">
                  {study.outcomes.map((o) => (
                    <li key={o} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                      {o}
                    </li>
                  ))}
                </ul>

                {study.quote && (
                  <blockquote className="mt-6 border-l-2 border-brand pl-4 text-sm italic">
                    &ldquo;{study.quote.text}&rdquo;
                    <footer className="mt-2 not-italic text-muted-foreground">
                      — {study.quote.author}, {study.quote.role}
                    </footer>
                  </blockquote>
                )}
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Discuss a similar program
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
