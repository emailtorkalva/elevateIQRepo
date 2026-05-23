import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/brand";
import { getService, serviceOfferings } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return serviceOfferings.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: BRAND_NAME };
  return {
    title: `${service.title} | ${BRAND_NAME}`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="relative aspect-[21/9] max-h-[420px] w-full overflow-hidden">
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
            <div className="flex size-12 items-center justify-center rounded-xl border border-border/80 bg-background/90 text-brand backdrop-blur-sm">
              <Icon className="size-6" />
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{service.description}</p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {service.longDescription}
              </p>

              <h2 className="mt-10 text-xl font-semibold">Capabilities</h2>
              <ul className="mt-4 space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-2xl border border-border/80 bg-card p-6 h-fit">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">
                Typical deliverables
              </h2>
              <ul className="mt-4 space-y-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="text-sm text-muted-foreground">
                    · {d}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full" asChild>
                <Link href="/contact">
                  Discuss {service.title}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button className="mt-3 w-full" variant="outline" asChild>
                <Link href="/services">All services</Link>
              </Button>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
