"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

import { SectionHeader } from "@/components/home/section-header";
import { ServiceImageCard } from "@/components/services/service-image-card";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/motion";
import { serviceOfferings } from "@/lib/services";

export function ServiceCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border/60 pb-24 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Full catalog"
          title="Solutions across the modern IT stack"
          description="Explore our practices—from IAM and cloud to data platforms and workforce programs."
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
          {serviceOfferings.map((service, index) => (
            <ServiceImageCard
              key={service.slug}
              service={service}
              index={index}
              highlight={service.highlight}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Button size="lg" variant="outline" className="h-11" asChild>
            <Link href="/contact">Discuss your requirements</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
