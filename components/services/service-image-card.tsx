"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ServiceOffering } from "@/lib/services";
import { scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ServiceImageCardProps = {
  service: ServiceOffering;
  index?: number;
  highlight?: boolean;
  showLink?: boolean;
};

export function ServiceImageCard({
  service,
  index = 0,
  highlight = service.highlight,
  showLink = true,
}: ServiceImageCardProps) {
  const Icon = service.icon;

  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card",
        highlight && "md:col-span-2 lg:col-span-2"
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={service.image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-xl border border-border/80 bg-background/90 text-brand backdrop-blur-sm">
          <Icon className="size-5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{service.title}</h3>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed text-muted-foreground",
            highlight && "lg:max-w-2xl"
          )}
        >
          {service.description}
        </p>

        {showLink && (
          <Link
            href={`/services/${service.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            Learn more
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
