"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "2010",
    title: "elevateIQ founded",
    description:
      "Launched as an IT consulting practice focused on identity management and enterprise application delivery.",
  },
  {
    year: "2014",
    title: "IAM & cybersecurity practice",
    description:
      "Expanded Identity and Access Management and security services for healthcare, finance, and regulated industries.",
  },
  {
    year: "2017",
    title: "Cloud & DevOps division",
    description:
      "Added cloud engineering, DevSecOps, and migration services to support digital transformation programs.",
  },
  {
    year: "2020",
    title: "Data & analytics capabilities",
    description:
      "Introduced data warehousing, cloud data services, and quality assurance for enterprise analytics initiatives.",
  },
  {
    year: "2022",
    title: "Staffing & managed services",
    description:
      "Launched IT staffing solutions and 24/7 managed services to support clients end-to-end.",
  },
  {
    year: "2025",
    title: "Full-stack IT partner",
    description:
      "Unified IAM, applications, cloud, data center, and workforce services under one delivery model.",
  },
];

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border/60 bg-muted/20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our journey"
          title="Growing with our clients"
          description="A deliberate expansion of capabilities—from IAM and apps to cloud, data, and workforce solutions."
          align="center"
          className="mx-auto"
        />

        <motion.ol
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          <div
            className="absolute top-2 bottom-2 left-[1.125rem] w-px bg-border sm:left-1/2 sm:-translate-x-px"
            aria-hidden
          />

          {milestones.map((item, index) => (
            <motion.li
              key={item.year}
              variants={fadeUp}
              className={cn(
                "relative grid gap-4 pb-12 last:pb-0 sm:grid-cols-2 sm:gap-8",
                index % 2 === 0
                  ? "sm:[&>div:first-child]:col-start-1 sm:[&>div:last-child]:col-start-2"
                  : "sm:[&>div:first-child]:col-start-2 sm:[&>div:last-child]:col-start-1 sm:[&>div:last-child]:row-start-1"
              )}
            >
              <div
                className={cn(
                  "pl-12 sm:pl-0",
                  index % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"
                )}
              >
                <time
                  dateTime={item.year}
                  className="font-mono text-sm font-medium text-brand"
                >
                  {item.year}
                </time>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
              </div>

              <div
                className={cn(
                  "relative pl-12 sm:pl-0",
                  index % 2 === 0 ? "sm:pl-10" : "sm:pr-10 sm:text-right"
                )}
              >
                <span
                  className="absolute top-1.5 left-3 flex size-[1.125rem] items-center justify-center rounded-full border-2 border-brand bg-background sm:left-1/2 sm:-translate-x-1/2"
                  aria-hidden
                >
                  <span className="size-1.5 rounded-full bg-brand" />
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground sm:mt-7">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
