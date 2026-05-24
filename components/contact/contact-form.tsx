"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RESPONSE_TIME } from "@/lib/brand";
import { serviceOfferings } from "@/lib/services";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
);

type ContactFormProps = {
  id?: string;
  className?: string;
};

export function ContactForm({ id, className }: ContactFormProps) {
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
        const detail =
          typeof data.message === "string"
            ? data.message
            : "Something went wrong. Please try again or email us directly.";
        setErrorMessage(detail);
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
    <form
      id={id}
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      aria-label="Contact form"
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
        <select id="service" name="service" className={selectClassName} defaultValue="" required>
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
          placeholder="Goals, timeline, compliance needs, team size..."
          rows={5}
          className="min-h-32 resize-y"
          required
        />
      </div>

      <p className="text-xs text-muted-foreground">
        We respond {RESPONSE_TIME}. Your information is used only to reply to this inquiry. See
        our{" "}
        <a href="/privacy" className="text-brand hover:underline">
          Privacy Policy
        </a>
        .
      </p>

      {status === "success" && (
        <p className="text-sm text-brand" role="status">
          Thank you — we&apos;ve received your message and will follow up shortly.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" size="lg" className="h-11 w-full sm:w-auto" disabled={loading}>
        {loading ? "Sending..." : "Send message"}
        <ArrowRight data-icon="inline-end" />
      </Button>
    </form>
  );
}
