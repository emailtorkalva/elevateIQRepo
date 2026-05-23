import Link from "next/link";
import type { ReactNode } from "react";

import { CONTACT_EMAIL } from "@/lib/brand";

type ProsePageProps = {
  title: string;
  description: string;
  children: ReactNode;
  updated?: string;
};

export function ProsePage({ title, description, children, updated = "May 2026" }: ProsePageProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-28 sm:px-6 sm:py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Legal</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>

      <div className="mt-10 space-y-8 text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-relaxed">
        {children}
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        Questions?{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">
          {CONTACT_EMAIL}
        </a>
        {" · "}
        <Link href="/contact" className="text-brand hover:underline">
          Contact form
        </Link>
      </p>
    </article>
  );
}
