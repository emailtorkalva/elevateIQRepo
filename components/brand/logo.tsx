import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showIcon?: boolean;
};

export function Logo({ className, showIcon = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {showIcon && (
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-brand-foreground shadow-sm">
          e
        </span>
      )}
      <span className="font-semibold tracking-tight text-foreground">
        elevate<span className="text-brand">IQ</span>
      </span>
    </span>
  );
}

export function LogoLink({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex", className)}>
      <Logo />
    </Link>
  );
}
