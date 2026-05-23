"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { clients, partners } from "@/lib/company";
import { fadeUp, staggerContainer } from "@/lib/motion";

function LogoStrip({
  title,
  eyebrow,
  items,
  id,
}: {
  title: string;
  eyebrow: string;
  items: string[];
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id={id} className="border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          align="center"
          className="mx-auto"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {items.map((name) => (
            <motion.span
              key={name}
              variants={fadeUp}
              className="rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-brand/30 hover:text-foreground"
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Partners() {
  return (
    <LogoStrip
      eyebrow="Ecosystem"
      title="Our partners"
      items={partners}
    />
  );
}

export function ClientsStrip() {
  return (
    <LogoStrip
      id="clients"
      eyebrow="Trust"
      title="Our clients"
      items={clients}
    />
  );
}
