import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/** Standard section shell: vertical rhythm, container, optional header. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  innerClassName,
  children,
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || description);
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-24", className)}>
      <Container className={cn("flex flex-col gap-12 lg:gap-16", innerClassName)}>
        {hasHeader ? (
          <header
            className={cn(
              "flex max-w-2xl flex-col gap-4",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {title ? <h2 className="text-h2">{title}</h2> : null}
            {description ? (
              <p className="text-body-lg text-muted-foreground">{description}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
