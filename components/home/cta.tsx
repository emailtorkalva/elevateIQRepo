"use client";

import { ArrowRight, Calendar, Mail } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT_EMAIL } from "@/lib/brand";
import { fadeUp } from "@/lib/motion";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 sm:py-28">
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

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Contact us
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s discuss your IT priorities
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
                Share your requirements—IAM, cloud, DevOps, staffing, or managed
                services—and our consultants will respond promptly.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
              >
                <Mail className="size-4" />
                {CONTACT_EMAIL}
              </a>
              <Button size="lg" variant="outline" className="mt-6 h-11" asChild>
                <Link href={`mailto:${CONTACT_EMAIL}`}>
                  <Calendar />
                  Email us directly
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Contact form"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Jane Smith" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Work email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input id="company" placeholder="Your organization" />
              </div>
              <div className="space-y-2">
                <label htmlFor="interest" className="text-sm font-medium">
                  Area of interest
                </label>
                <Input
                  id="interest"
                  placeholder="IAM, Cloud, DevOps, Staffing..."
                />
              </div>
              <Button type="submit" size="lg" className="h-11 w-full sm:w-auto">
                Contact us
                <ArrowRight data-icon="inline-end" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
