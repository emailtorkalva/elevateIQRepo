"use client";

import { ArrowRight, Calendar, Mail } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  RESPONSE_TIME,
} from "@/lib/brand";
import { fadeUp } from "@/lib/motion";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-border/80 bg-card px-6 py-14 sm:px-12 sm:py-16 lg:px-16"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--brand)_0%,transparent_55%)] opacity-15"
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Next step
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to scope your program?
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
              Share your requirements and a principal consultant will respond {RESPONSE_TIME}.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="h-11 w-full sm:w-auto" asChild>
                <Link href="/contact">
                  Contact us
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 w-full sm:w-auto" asChild>
                <Link href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail />
                  Email
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              <a href={CONTACT_PHONE_HREF} className="hover:text-brand">
                {CONTACT_PHONE}
              </a>
              {" · "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand">
                {CONTACT_EMAIL}
              </a>
            </p>

            <Button size="sm" variant="ghost" className="mt-4" asChild>
              <Link href="/case-studies">
                <Calendar />
                Review case studies first
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
