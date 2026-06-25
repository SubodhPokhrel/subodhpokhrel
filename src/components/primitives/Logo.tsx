import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  /** Hide the wordmark, show only the monogram. */
  compact?: boolean;
}

/** Wordmark + monogram, links home. */
export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Subodh Pokhrel — home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="grid size-7 place-items-center rounded-md bg-foreground text-caption font-semibold tracking-tight text-background">
        SP
      </span>
      {!compact ? (
        <span className="text-title font-medium tracking-tight">Subodh Pokhrel</span>
      ) : null}
    </Link>
  );
}
