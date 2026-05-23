import Link from "next/link";

import { LogoLink } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  HQ_ADDRESS,
  LINKEDIN_URL,
} from "@/lib/brand";
import { serviceOfferings } from "@/lib/services";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Industries", href: "/industries" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
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
            <address className="mt-4 space-y-1 text-sm not-italic text-muted-foreground">
              <p>{HQ_ADDRESS}</p>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>
                <a href={CONTACT_PHONE_HREF} className="hover:text-brand">
                  {CONTACT_PHONE}
                </a>
              </p>
            </address>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
            >
              LinkedIn
            </a>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-3">
              {serviceOfferings.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm font-medium text-brand hover:underline"
                >
                  All services →
                </Link>
              </li>
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
          <p className="text-center text-xs text-muted-foreground sm:text-right">
            Independent consultancy · Client names used with permission or anonymized per NDA
          </p>
        </div>
      </div>
    </footer>
  );
}
