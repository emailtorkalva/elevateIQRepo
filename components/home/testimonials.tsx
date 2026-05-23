"use client";

import { Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { testimonials } from "@/lib/company";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Client feedback"
          title="What leaders say about working with us"
          description="Named references available under NDA. Summaries below reflect recent programs."
          align="center"
          className="mx-auto"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {testimonials.map((item, i) => (
            <motion.figure
              key={item.author}
              variants={fadeUp}
              className={cn(
                "relative flex flex-col rounded-2xl border border-border/80 bg-card p-6 sm:p-8",
                i === 1 &&
                  "lg:-translate-y-2 lg:shadow-xl lg:shadow-black/5 dark:lg:shadow-black/30"
              )}
            >
              <Quote className="mb-4 size-8 text-brand/40" aria-hidden />
              <blockquote className="flex-1 text-base leading-relaxed text-foreground/90">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-6">
                <p className="font-medium">{item.author}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.role}, {item.company}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
