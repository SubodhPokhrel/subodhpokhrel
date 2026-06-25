import { Panel } from "@/components/primitives/Panel";
import { cn } from "@/lib/cn";

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={cn("h-14 w-full rounded-md border border-border", className)} />
      <span className="font-mono text-caption text-muted-foreground">{label}</span>
    </div>
  );
}

const SURFACES = [
  { className: "bg-background", label: "background" },
  { className: "bg-surface", label: "surface" },
  { className: "bg-surface-2", label: "surface-2" },
  { className: "bg-surface-3", label: "surface-3" },
  { className: "bg-foreground", label: "foreground" },
  { className: "bg-muted-foreground", label: "muted-fg" },
];

export function ColorSpecimen() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {SURFACES.map((surface) => (
        <Swatch key={surface.label} className={surface.className} label={surface.label} />
      ))}
    </div>
  );
}

export function PanelSpecimen() {
  return (
    <div
      className="relative grid gap-6 overflow-hidden rounded-2xl p-10 sm:grid-cols-3"
      style={{ background: "var(--gradient-aurora)" }}
    >
      <Panel className="relative flex flex-col gap-1 p-6">
        <p className="text-title text-foreground">Glass</p>
        <p className="text-caption text-foreground/70">
          Frosted window — the backdrop blurs through.
        </p>
      </Panel>
      <Panel glow className="relative flex flex-col gap-1 p-6">
        <p className="text-title text-foreground">Glow</p>
        <p className="text-caption text-foreground/70">With an aurora halo.</p>
      </Panel>
      <Panel bordered className="relative flex flex-col gap-1 p-6">
        <p className="text-title text-foreground">Bordered</p>
        <p className="text-caption text-foreground/70">Aurora hairline.</p>
      </Panel>
    </div>
  );
}

export function AuroraRecipeSpecimen() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-h3">
        Aurora text — <span className="text-aurora">intelligent</span> by design
      </p>
      <hr className="aurora-divider" />
      <div className="aurora-border rounded-lg p-5">
        <p className="text-body text-muted-foreground">.aurora-border — gradient hairline</p>
      </div>
      <div className="glow-aurora rounded-lg bg-surface p-5">
        <p className="text-body text-muted-foreground">.glow-aurora — soft halo</p>
      </div>
    </div>
  );
}
