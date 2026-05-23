"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { whyChooseUs } from "@/lib/company";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border/60 bg-muted/20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Why choose us"
          title="Partnership built on delivery"
          description="The same principles that define leading IT consultancies—expertise, speed, customization, and access to talent."
          align="center"
          className="mx-auto"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyChooseUs.map((item, index) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="rounded-2xl border border-border/80 bg-card p-6"
            >
              <span className="font-mono text-xs text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
