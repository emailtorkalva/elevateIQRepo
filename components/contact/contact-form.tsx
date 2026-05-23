import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeader } from "@/components/home/section-header";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  HQ_ADDRESS,
  LINKEDIN_URL,
  RESPONSE_TIME,
} from "@/lib/brand";

type ContactSectionProps = {
  showHeader?: boolean;
};

export function ContactSection({ showHeader = true }: ContactSectionProps) {
  return (
    <section id="contact" className="border-t border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeader && (
          <SectionHeader
            eyebrow="Contact"
            title="Start a conversation"
            description="Tell us about your program—IAM, cloud, data, managed services, or staffing. A principal consultant will respond."
            className="max-w-2xl"
          />
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold">Direct contact</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand"
                  >
                    <Mail className="size-4 shrink-0" />
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT_PHONE_HREF}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand"
                  >
                    <Phone className="size-4 shrink-0" />
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li className="inline-flex gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span>{HQ_ADDRESS}</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Typical response: {RESPONSE_TIME}. For RFPs and security questionnaires, mention your
              deadline in the message.
            </p>
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-brand hover:underline"
            >
              LinkedIn →
            </Link>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
