"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { engagementProcess } from "@/lib/company";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ProcessSection() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border/60 bg-muted/20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="How we work"
          title="A delivery model executives can track"
          description="Every engagement follows a transparent discover → design → deliver → operate rhythm with weekly governance."
        />

        <motion.ol
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {engagementProcess.map((item) => (
            <motion.li
              key={item.step}
              variants={fadeUp}
              className="rounded-2xl border border-border/80 bg-card p-6"
            >
              <span className="font-mono text-xs font-semibold text-brand">{item.step}</span>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
