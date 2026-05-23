"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";

export function ServicesHero() {
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
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand"
          >
            Our services
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            End-to-end IT consulting{" "}
            <span className="bg-gradient-to-r from-brand via-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-brand">
              for digital transformation.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            IAM, application development, DevOps, data platforms, cloud,
            managed services, and staffing—designed to help you grow, secure
            operations, and unlock your full potential.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
