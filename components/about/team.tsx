"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const team = [
  {
    name: "James Okonkwo",
    role: "Founder & CEO",
    bio: "20+ years leading IAM, cloud, and digital transformation programs for Fortune 500 enterprises.",
    initials: "JO",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    name: "Sarah Chen",
    role: "VP, Application Development",
    bio: "Heads custom application delivery—modern stacks, agile teams, and enterprise integration.",
    initials: "SC",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Marcus Rivera",
    role: "VP, IAM & Cybersecurity",
    bio: "CISSP. Leads identity governance, PAM, and compliance programs across regulated sectors.",
    initials: "MR",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Elena Vasquez",
    role: "VP, Cloud & DevOps",
    bio: "Architects cloud migrations, DevSecOps pipelines, and platform operations at scale.",
    initials: "EV",
    gradient: "from-indigo-400 to-blue-600",
  },
  {
    name: "David Kim",
    role: "Director, Data & Analytics",
    bio: "Designs data warehouses, cloud data platforms, and analytics solutions for enterprise clients.",
    initials: "DK",
    gradient: "from-sky-500 to-indigo-600",
  },
  {
    name: "Amara Osei",
    role: "Director, Staffing & Managed Services",
    bio: "Oversees IT staffing, managed services, and 24/7 operations with SLA accountability.",
    initials: "AO",
    gradient: "from-purple-500 to-indigo-600",
  },
];

export function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Leadership"
          title="Experienced practitioners at the helm"
          description="Leaders who have delivered IAM, cloud, DevOps, and staffing programs across healthcare, finance, and technology."
          align="center"
          className="mx-auto"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeUp}
              className="group rounded-2xl border border-border/80 bg-card p-6 transition-colors hover:border-brand/30 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={cn(
                    "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-semibold text-white shadow-md",
                    member.gradient
                  )}
                  aria-hidden
                >
                  {member.initials}
                </div>
                <Link
                  href="#"
                  className="rounded-lg p-2 text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
                  aria-label={`${member.name} profile`}
                >
                  <ExternalLink className="size-4" />
                </Link>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {member.name}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-brand">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
