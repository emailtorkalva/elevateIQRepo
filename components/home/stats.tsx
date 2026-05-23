"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { fadeUp, staggerContainer } from "@/lib/motion";

const stats = [
  { value: 150, suffix: "+", label: "IAM & security programs", format: "int" as const },
  { value: 500, suffix: "+", label: "IT professionals placed", format: "int" as const },
  { value: 99, suffix: "%", label: "Client satisfaction", format: "int" as const },
  { value: 15, suffix: "+", label: "Years of consulting excellence", format: "int" as const },
];

function AnimatedNumber({
  value,
  suffix,
  format,
  inView,
}: {
  value: number;
  suffix: string;
  format: "int" | "decimal";
  inView: boolean;
}) {
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    if (!inView) return;

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      setDisplay(`${Math.round(current)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value, suffix, format]);

  return <span>{display}</span>;
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="impact"
      className="relative overflow-hidden border-t border-border/60 py-24 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Impact"
          title="Delivering at enterprise scale"
          description="Measurable outcomes across identity, cloud, data, and workforce programs."
          align="center"
          className="mx-auto"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/80 bg-border/80 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center justify-center bg-card px-6 py-10 text-center sm:py-12"
            >
              <p className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  format={stat.format}
                  inView={inView}
                />
              </p>
              <p className="mt-3 max-w-[12rem] text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
