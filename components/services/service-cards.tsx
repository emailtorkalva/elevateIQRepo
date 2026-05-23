"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { scaleIn, staggerContainer } from "@/lib/motion";
import { serviceOfferings } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServiceCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border/60 pb-24 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Full catalog"
          title="Solutions across the modern IT stack"
          description="The same breadth of services trusted by enterprises for identity, applications, data, cloud, and workforce needs."
          align="center"
          className="mx-auto"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {serviceOfferings.map((service, index) => {
            const Icon = service.icon;
            const isHighlight = service.highlight;

            return (
              <motion.article
                key={service.slug}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-6 sm:p-7",
                  isHighlight && "md:col-span-2 lg:col-span-2"
                )}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-brand transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand/10">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed text-muted-foreground",
                      isHighlight && "lg:max-w-xl"
                    )}
                  >
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-brand" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Button size="lg" variant="outline" className="h-11" asChild>
            <Link href="/#contact">Contact us</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
