"use client";

import { motion } from "framer-motion";

import { BRAND_NAME } from "@/lib/brand";
import { companyDescription } from "@/lib/company";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-80 w-[min(100%,700px)] -translate-x-1/2 rounded-full bg-brand/15 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand"
          >
            About us
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            {BRAND_NAME} — at the forefront of{" "}
            <span className="bg-gradient-to-r from-brand via-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-brand">
              technological innovation.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {companyDescription}
          </motion.p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border/80 bg-border/80 sm:grid-cols-3"
        >
          {[
            { label: "Focus areas", value: "IAM · Cloud · DevOps" },
            { label: "Delivery model", value: "Consulting & managed" },
            { label: "Workforce", value: "Staffing & augmentation" },
          ].map((item) => (
            <div key={item.label} className="bg-card px-6 py-5 sm:py-6">
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {item.label}
              </dt>
              <dd className="mt-1 text-lg font-semibold tracking-tight">
                {item.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
