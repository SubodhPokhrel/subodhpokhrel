import type { ReactNode } from "react";

interface SpecimenProps {
  title: string;
  note?: string;
  children: ReactNode;
}

/** A labelled frame around one group of component specimens in the gallery. */
export function Specimen({ title, note, children }: SpecimenProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-title">{title}</h2>
        {note ? <p className="max-w-2xl text-caption text-muted-foreground">{note}</p> : null}
      </div>
      <div className="rounded-xl border border-border bg-surface p-6">{children}</div>
    </section>
  );
}
