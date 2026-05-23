"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { BRAND_DOMAIN } from "@/lib/brand";
import { heroSlides } from "@/lib/company";
import { fadeUp, staggerContainer } from "@/lib/motion";

const floatingCards = [
  { label: "Programs delivered", value: "85+", sub: "since 2012" },
  { label: "Client retention", value: "92%", sub: "renew or expand" },
  { label: "Response time", value: "48h", sub: "for new inquiries" },
];

export function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[slideIndex];

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pb-32">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[min(100%,900px)] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px] dark:bg-brand/15"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm sm:text-sm">
              <Sparkles className="size-3.5 text-brand" />
              IT consulting · IAM · Cloud · DevOps · Staffing
            </span>
          </motion.div>

          <div className="min-h-[8.5rem] sm:min-h-[9.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                  <span className="bg-gradient-to-r from-brand via-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-brand">
                    {slide.headline}
                  </span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {slide.subline}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex justify-center gap-2"
            aria-label="Hero slides"
          >
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlideIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === slideIndex
                    ? "w-8 bg-brand"
                    : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === slideIndex}
              />
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" className="h-11 px-6" asChild>
              <Link href="/contact">
                Contact us
                <ArrowRight className="ml-1" data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-11 px-6" asChild>
              <Link href="/services">Our services</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="rounded-2xl border border-border/80 bg-card/60 p-1 shadow-2xl shadow-black/10 backdrop-blur-md dark:shadow-black/40">
            <div className="overflow-hidden rounded-[calc(var(--radius-xl)-2px)] border border-border/50 bg-muted/30">
              <div className="flex items-center gap-2 border-b border-border/60 bg-muted/50 px-4 py-3">
                <span className="size-2.5 rounded-full bg-red-400/90" />
                <span className="size-2.5 rounded-full bg-amber-400/90" />
                <span className="size-2.5 rounded-full bg-emerald-400/90" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  {BRAND_DOMAIN}
                </span>
              </div>
              <div className="grid gap-px bg-border/40 p-4 sm:grid-cols-3 sm:p-6">
                {floatingCards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + i * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="rounded-xl bg-card p-4 sm:p-5"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {card.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                      {card.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {card.sub}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
