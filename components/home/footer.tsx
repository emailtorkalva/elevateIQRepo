import Link from "next/link";

import { LogoLink } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { BRAND_NAME, BRAND_TAGLINE, CONTACT_EMAIL } from "@/lib/brand";
import { serviceOfferings } from "@/lib/services";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Contact Us", href: "/#contact" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <LogoLink />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {BRAND_TAGLINE}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-3">
              {serviceOfferings.map((service) => (
                <li key={service.slug}>
                  <Link
                    href="/services"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built for reliability · SOC 2 ready
          </p>
        </div>
      </div>
    </footer>
  );
}
