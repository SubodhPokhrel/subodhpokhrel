const ROLES = [
  "text-display-xl",
  "text-display",
  "text-h1",
  "text-h2",
  "text-h3",
  "text-title",
  "text-body-lg",
  "text-body",
  "text-caption",
  "text-eyebrow",
] as const;

/** The full role-based type ramp, each labelled with its token. */
export function TypeScale() {
  return (
    <div className="flex flex-col gap-6">
      {ROLES.map((role) => (
        <div key={role} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
          <span className="w-28 shrink-0 font-mono text-caption text-muted-foreground">{role}</span>
          <span className={role}>Subodh Pokhrel</span>
        </div>
      ))}
    </div>
  );
}
