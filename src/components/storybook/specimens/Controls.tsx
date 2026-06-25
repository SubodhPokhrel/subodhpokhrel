import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GradientText } from "@/components/primitives/GradientText";
import { ArrowRightIcon } from "@/components/primitives/Icon";

const VARIANTS = ["primary", "secondary", "ghost", "aurora"] as const;
const SIZES = ["sm", "md", "lg"] as const;

export function ButtonSpecimen() {
  return (
    <div
      className="flex flex-col gap-6 overflow-hidden rounded-xl p-6"
      style={{ background: "var(--gradient-aurora)" }}
    >
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-4">
          <span className="w-20 font-mono text-caption text-foreground/80">{variant}</span>
          {SIZES.map((size) => (
            <Button key={size} variant={variant} size={size}>
              Get in touch
            </Button>
          ))}
          <Button variant={variant}>
            Continue
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-4">
        <span className="w-20 font-mono text-caption text-foreground/80">disabled</span>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}

export function BadgeSpecimen() {
  return (
    <div className="flex flex-wrap gap-3">
      {["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "Docker"].map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}

export function LabelSpecimen() {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow>Selected work</Eyebrow>
      <p className="text-h2">
        Design that <GradientText>feels alive</GradientText>.
      </p>
    </div>
  );
}
