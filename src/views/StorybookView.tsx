"use client";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Specimen } from "@/components/storybook/Specimen";
import {
  BadgeSpecimen,
  ButtonSpecimen,
  LabelSpecimen,
} from "@/components/storybook/specimens/Controls";
import { FormSpecimen } from "@/components/storybook/specimens/Forms";
import { IconSpecimen } from "@/components/storybook/specimens/Icons";
import {
  AuroraRecipeSpecimen,
  ColorSpecimen,
  PanelSpecimen,
} from "@/components/storybook/specimens/Surfaces";
import { TypeScale } from "@/components/storybook/specimens/TypeScale";

/** The living gallery — every primitive in its variants and states. */
export function StorybookView() {
  return (
    <div className="py-16">
      <Container className="flex flex-col gap-16">
        <header className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
              <Eyebrow>Design system</Eyebrow>
              <h1 className="text-display">The living gallery</h1>
            </div>
            <ThemeToggle />
          </div>
          <p className="max-w-2xl text-body-lg text-muted-foreground">
            Every primitive in its variants and states. Toggle the theme; resize to 375 / 1440. This
            is the squint view of the system — if a component isn&apos;t here, it doesn&apos;t
            exist.
          </p>
        </header>

        <Specimen
          title="Type scale"
          note="Role-based fluid ramp; each token already carries its own weight, tracking, and line-height."
        >
          <TypeScale />
        </Specimen>
        <Specimen title="Color & surfaces" note="Semantic tokens — they flip with the theme.">
          <ColorSpecimen />
        </Specimen>
        <Specimen
          title="Aurora recipes"
          note="The single accent — rationed to a few touches per view."
        >
          <AuroraRecipeSpecimen />
        </Specimen>
        <Specimen
          title="Panels"
          note="The .glass frosted window, with glow and aurora-border variants."
        >
          <PanelSpecimen />
        </Specimen>
        <Specimen title="Buttons" note="Variants × sizes, with icon and disabled states.">
          <ButtonSpecimen />
        </Specimen>
        <Specimen title="Labels" note="Eyebrow overline + gradient text.">
          <LabelSpecimen />
        </Specimen>
        <Specimen title="Badges">
          <BadgeSpecimen />
        </Specimen>
        <Specimen title="Form controls" note="Default, error, and disabled states.">
          <FormSpecimen />
        </Specimen>
        <Specimen title="Icons" note="Dependency-free inline SVG set.">
          <IconSpecimen />
        </Specimen>
      </Container>
    </div>
  );
}
