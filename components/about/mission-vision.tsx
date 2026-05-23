"use client";

import { Eye, Target } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { fadeUp, staggerContainer } from "@/lib/motion";

const pillars = [
  {
    icon: Target,
    title: "Mission",
    headline: "Accelerate digital transformation with secure, scalable technology.",
    body: "We deliver IAM, cybersecurity, application development, cloud, DevOps, and managed services that help organizations drive growth, enhance security, and achieve measurable business outcomes.",
  },
  {
    icon: Eye,
    title: "Vision",
    headline: "Every enterprise equipped to innovate without compromising trust.",
    body: "We envision a future where identity, infrastructure, and applications work as one—enabling teams to move faster while meeting the compliance and reliability standards their industries demand.",
  },
];

export function MissionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Purpose"
          title="Why we exist"
          description="Our mission and vision reflect what leading IT consulting firms stand for—delivery, security, and long-term partnership."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 grid gap-6 lg:grid-cols-2"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-8 sm:p-10"
              >
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-brand">
                      <Icon className="size-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                      {pillar.title}
                    </p>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight sm:text-[1.65rem] sm:leading-snug">
                    {pillar.headline}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 border-l-2 border-brand pl-6 sm:pl-8"
        >
          <p className="text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl">
            &ldquo;We help organizations harness the power of technology to unlock
            their full potential.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-muted-foreground">
            — Leadership, elevateIQ
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
