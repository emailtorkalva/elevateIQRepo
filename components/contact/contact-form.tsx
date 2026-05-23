"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { serviceOfferings } from "@/lib/services";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
);

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = {
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          typeof data.message === "string"
            ? data.message
            : "Something went wrong. Please try again or email us directly."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="get-in-touch" className="border-t border-border/60 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Get in touch"
          title="Tell us about your project"
          description="Share your requirements and our consultants will respond promptly."
          className="max-w-2xl"
        />

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-xl space-y-4"
          aria-label="Contact form"
          noValidate={false}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="full_name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="full_name"
                name="full_name"
                placeholder="Jane Smith"
                autoComplete="name"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Work email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company
              </label>
              <Input
                id="company"
                name="company"
                placeholder="Your organization"
                autoComplete="organization"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-medium">
              Service required
            </label>
            <select
              id="service"
              name="service"
              className={selectClassName}
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOfferings.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Describe your goals, timeline, and any constraints..."
              rows={5}
              className="min-h-32 resize-y"
              required
            />
          </div>

          {status === "success" && (
            <p className="text-sm text-brand" role="status">
              Request submitted successfully. We&apos;ll be in touch soon.
            </p>
          )}
          {status === "error" && errorMessage && (
            <p className="text-sm text-destructive" role="alert">
              {errorMessage}
            </p>
          )}

          <Button type="submit" size="lg" className="h-11 w-full sm:w-auto" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </form>
      </div>
    </section>
  );
}
