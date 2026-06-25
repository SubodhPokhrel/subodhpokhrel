import type { ComponentType } from "react";
import * as IconSet from "@/components/primitives/Icon";

type IconComponent = ComponentType<{ size?: number }>;

const icons = Object.entries(IconSet).filter(([name]) => name.endsWith("Icon")) as [
  string,
  IconComponent,
][];

/** The full inline-SVG icon set. */
export function IconSpecimen() {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
      {icons.map(([name, Glyph]) => (
        <div key={name} className="flex flex-col items-center gap-2 text-foreground">
          <Glyph size={22} />
          <span className="text-caption text-muted-foreground">{name.replace("Icon", "")}</span>
        </div>
      ))}
    </div>
  );
}
