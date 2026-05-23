"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { scaleIn, staggerContainer } from "@/lib/motion";
import { featuredServiceOfferings } from "@/lib/services";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof featuredServiceOfferings)[number];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-6 transition-colors hover:border-brand/30 sm:p-7"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-brand/5 transition-transform duration-500 group-hover:scale-150"
        aria-hidden
      />
      <div>
        <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-brand transition-colors group-hover:border-brand/30 group-hover:bg-brand/10">
          <Icon className="size-5" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>
      <p className="mt-6 font-mono text-xs text-muted-foreground/80">
        {String(index + 1).padStart(2, "0")} — service
      </p>
    </motion.article>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="border-t border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our services"
          title="Comprehensive IT consulting & services"
          description="IAM, application development, digital transformation, DevOps, data, cloud, managed services, and staffing—aligned to how enterprises buy technology today."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredServiceOfferings.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/services">
              View all services
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
