import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/brand";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: `Industries | ${BRAND_NAME}`,
  description: `Industry-focused IT consulting for healthcare, financial services, retail, and technology.`,
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 sm:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Industries"
            title="Experience where compliance and velocity both matter"
            description="We tailor delivery playbooks to sector-specific regulations, operating models, and risk profiles."
            className="max-w-2xl"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {industries.map((industry) => (
              <article
                key={industry.slug}
                className="rounded-2xl border border-border/80 bg-card p-8"
              >
                <h2 className="text-xl font-semibold">{industry.name}</h2>
                <p className="mt-2 text-sm font-medium text-brand">{industry.headline}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {industry.focusAreas.map((area) => (
                    <li key={area} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="size-1.5 mt-2 shrink-0 rounded-full bg-brand" />
                      {area}
                    </li>
                  ))}
                </ul>
                {industry.compliance && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Common frameworks: {industry.compliance.join(" · ")}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border/80 bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground">
              Not sure which practice fits your sector? We&apos;ll map services during discovery.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/contact">Talk to a consultant</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
