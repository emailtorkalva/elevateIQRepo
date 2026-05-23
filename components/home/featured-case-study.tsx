"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/home/section-header";
import { caseStudies } from "@/lib/case-studies";
import { fadeUp } from "@/lib/motion";

const featured = caseStudies[0];

export function FeaturedCaseStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Client outcomes"
          title="Programs with measurable results"
          description="Representative work across healthcare, financial services, and retail. Client names anonymized where required by NDA."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mt-12 rounded-3xl border border-border/80 bg-card p-8 sm:p-10 lg:p-12"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              {featured.industry}
            </span>
            <span className="text-xs text-muted-foreground">{featured.duration}</span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {featured.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{featured.client}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {featured.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm leading-relaxed"
              >
                {outcome}
              </li>
            ))}
          </ul>

          {featured.quote && (
            <blockquote className="mt-8 border-l-2 border-brand pl-4 text-base italic text-foreground/90">
              &ldquo;{featured.quote.text}&rdquo;
              <footer className="mt-3 text-sm not-italic text-muted-foreground">
                — {featured.quote.author}, {featured.quote.role}
              </footer>
            </blockquote>
          )}

          <Button className="mt-8 h-11" variant="outline" asChild>
            <Link href="/case-studies">
              View all case studies
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
