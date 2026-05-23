"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/home/section-header";
import { BRAND_NAME } from "@/lib/brand";
import { businessGrowthBlurb, companyDescription } from "@/lib/company";
import { fadeUp } from "@/lib/motion";

export function CompanyIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about-preview" className="border-t border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <SectionHeader
            eyebrow="About the company"
            title={BRAND_NAME}
            description={companyDescription}
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="flex flex-col gap-6"
          >
            <article className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-xl border border-border/80 bg-brand/10 text-brand">
                <TrendingUp className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                Business growth
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {businessGrowthBlurb}
              </p>
              <Button variant="link" className="mt-4 h-auto p-0" asChild>
                <Link href="/about">
                  Read more
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
