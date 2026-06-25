# DESIGN LANGUAGE

> **What it looks like.** This is the visual-identity spec — the _look_ grounded
> in the real tokens. How those tokens get _applied_ (the rules of use) lives in
> [`UI_DISCIPLINE.md`](./UI_DISCIPLINE.md); how copy reads lives in
> [`CONTENT_STYLE.md`](./CONTENT_STYLE.md). The single source of truth for every
> value below is [`src/app/globals.css`](../src/app/globals.css). If a number
> here ever disagrees with that file, the file wins — fix this doc.
>
> These are not suggestions. A screen that adds a second accent colour, hand-sets
> a font size, or scatters aurora over every card is not on-brand — it is not done.

---

## 1. The idea, in one paragraph

A quiet black-and-white canvas where a **single iridescent aurora** carries all
the colour. The monochrome does the work — type, space, and contrast establish
hierarchy and confidence — and the aurora appears two or three times per screen
to mark exactly the thing that matters: a key word in the headline, a hairline
under a section title, a halo behind the hero. Everything is premium-grade
restraint: generous whitespace, tight display typography, frosted-glass surfaces,
motion that means something. The result reads as a designer who sweats details,
not a template that shouts. Mono is the canvas; aurora is the seasoning.

---

## 2. Palette

### The mono canvas

The whole site is built from a neutral ramp consumed **only** through semantic
tokens — never raw hex in a component. Light is the default theme; dark flips the
same roles (see §7). True values, for reference only:

| Role token           | Utility                 | Light     | Dark      | What it is                                    |
| -------------------- | ----------------------- | --------- | --------- | --------------------------------------------- |
| `--background`       | `bg-background`         | `#fafafa` | `#000000` | The paper / the void. Off-white & true black. |
| `--foreground`       | `text-foreground`       | `#08080a` | `#f4f4f6` | Primary ink.                                  |
| `--surface`          | `bg-surface`            | `#ffffff` | `#0b0b0d` | Raised card base.                             |
| `--surface-2`        | `bg-surface-2`          | `#f3f3f5` | `#141417` | Second elevation.                             |
| `--surface-3`        | `bg-surface-3`          | `#e9e9ee` | `#1d1d21` | Third elevation / wells.                      |
| `--border`           | `border-border`         | 12% ink   | 11% light | Default hairline.                             |
| `--border-strong`    | `border-border-strong`  | 22% ink   | 20% light | Emphasis edge.                                |
| `--hairline`         | `border-hairline`       | 8% ink    | 7% light  | The faintest rule.                            |
| `--muted-foreground` | `text-muted-foreground` | `#6b6b73` | `#9a9aa3` | Secondary text, captions.                     |
| `--ring`             | `ring`                  | 55% ink   | 60% light | Focus ring.                                   |

Borders are expressed as `color-mix` over ink/light, so they read as true
hairlines on any surface rather than as a fixed grey. There is exactly one
"colour" family beyond this ramp — the aurora.

### The aurora stops

One gradient, four soft, low-saturation stops — indigo → violet → cyan → rose —
defined once and inherited by both themes:

| Stop         | Value              | Reads as    |
| ------------ | ------------------ | ----------- |
| `--aurora-1` | `hsl(255 72% 67%)` | soft indigo |
| `--aurora-2` | `hsl(282 64% 68%)` | violet      |
| `--aurora-3` | `hsl(200 78% 70%)` | cyan        |
| `--aurora-4` | `hsl(330 70% 72%)` | rose        |

Lightness sits in the high 60s/low 70s and saturation in the 60s–70s on purpose:
these are _pastel_ lights, not neon. The aurora glows; it never screams. Two
gradient primitives are derived from the stops:

- `--gradient-aurora` — a 110° linear sweep (`indigo → violet 28% → cyan 58% →
rose 82% → indigo`), loops back to the first stop so it can pan seamlessly.
- `--gradient-aurora-conic` — a 210° conic version for radial/halo treatments.

### The recipes (use these, don't reinvent)

Never paint with the stops directly. Reach for a named recipe:

| Recipe            | Effect                                                                              |
| ----------------- | ----------------------------------------------------------------------------------- |
| `.text-aurora`    | Gradient-clipped text, `220%` background, slow `aurora-pan` loop. One or two words. |
| `.aurora-divider` | 1px full-width rule painted with the gradient at `0.5` opacity.                     |
| `.aurora-border`  | Gradient hairline border via mask (no extra DOM), `0.6` opacity.                    |
| `.glow-aurora`    | Soft `90px` halo using `--aurora-2`, for the hero / one feature.                    |

Plus `::selection` is tinted with 32% `--aurora-2` — the one place the accent
shows up "for free".

> **The rule:** mono is the canvas, aurora is the seasoning. No second hue ever
> enters the palette. Status/feedback states are built from the mono ramp +
> iconography + text, never a new colour (color is never the only signal).

---

## 3. Typography

Two self-hosted families, one job each:

- **Inter** (`--font-sans`, the default everywhere) — UI and prose.
- **JetBrains Mono** (`--font-mono`) — **small technical labels only**: code,
  keycaps, metadata, the storybook specimen captions. Never body copy, never
  headings.

That is the whole roster. One-family discipline: if a screen needs a "different"
voice, it changes _weight, size, or tracking_ — not typeface.

### The role ramp

Every type role is a single utility that already carries weight + tracking +
line-height. **Never** add `font-bold` / `leading-*` / `tracking-*` by hand, and
never hand-set a px size.

| Utility           | Size (clamp)     | Tracking | Line-height | Weight | Use                 |
| ----------------- | ---------------- | -------- | ----------- | ------ | ------------------- |
| `text-display-xl` | 3.25 → 7rem      | −0.032em | 1.0         | 700    | Hero word.          |
| `text-display`    | 2.75 → 5rem      | −0.026em | 1.04        | 680    | Big statements.     |
| `text-h1`         | 2.25 → 3.75rem   | −0.022em | 1.07        | 650    | Page titles.        |
| `text-h2`         | 1.75 → 2.75rem   | −0.02em  | 1.12        | 600    | Section titles.     |
| `text-h3`         | 1.375 → 1.875rem | −0.015em | 1.2         | 600    | Sub-sections.       |
| `text-title`      | 1.125 → 1.375rem | −0.01em  | 1.35        | 600    | Card titles.        |
| `text-body-lg`    | 1.0625 → 1.25rem | 0        | 1.6         | —      | Lead paragraphs.    |
| `text-body`       | 1 → 1.0625rem    | 0        | 1.6         | —      | Default prose.      |
| `text-caption`    | 0.8 → 0.875rem   | 0        | 1.5         | —      | Secondary / meta.   |
| `text-eyebrow`    | 0.75rem          | 0.16em   | 1.0         | 600    | UPPERCASE overline. |

### Why the tracking moves

As type gets larger, the default spacing looks loose and amateurish, so display
roles pull tracking **negative** (down to −0.032em) — the letters knit into a
single confident shape. As type gets smaller, spacing must _open up_: the eyebrow
runs at **+0.16em** uppercase so a tiny label still reads as deliberate. Body
roles sit at 0 tracking with a **generous 1.6 line-height** for comfortable
reading at a `~60ch` measure; display roles sit near 1.0 line-height because a
headline is one object, not paragraphs. Headings get `text-wrap: balance`,
paragraphs get `text-wrap: pretty` (both global). `font-synthesis-weight: none`
ensures only real weights render — no faux-bolding.

---

## 4. Surfaces — the frosted "window"

The signature surface is `.glass`, a frosted window panel. Recipe:

```css
background: var(--glass-bg); /* translucent surface mix         */
backdrop-filter: blur(18px) saturate(1.6); /* the frost + colour lift         */
border: 1px solid var(--glass-border);
box-shadow:
  inset 0 1px 0 0 var(--glass-highlight),
  /* the top inset highlight */ var(--shadow-2); /* lift off the canvas    */
```

Three details make it read as glass and not a flat card: the **inset top
highlight** (a 1px light line where the panel "catches" light), the **blur +
1.6× saturation** (which subtly pulls the aurora behind it through the frost),
and the translucent fill (`--glass-bg`) that lets the canvas show through.

**When to use it:** cards, the site header, and feature surfaces — the things
that should feel like they float above the page. **When not to:** full-bleed
section backgrounds (glass over nothing is just a grey box), or stacking glass on
glass (the blur compounds into mud).

**Light vs dark behaviour:** the tokens flip so the effect stays honest. In light
the fill is ~64% white with an 85%-white highlight (a bright, paper-on-paper
frost); in dark the fill is ~55% of `surface-2` with a 10%-white highlight (a
dim, smoky glass where the aurora glow reads strongest). Shadows scale too —
soft and short in light, deeper and longer in dark.

---

## 5. Space & rhythm

- **8pt feel.** Spacing steps track an 8-point rhythm; lean on Tailwind's scale,
  not arbitrary values. Vertical section padding is **generous** — roughly
  `py-24`–`py-40` on desktop, tighter on mobile. Whitespace is a feature, not
  leftover space.
- **The container.** Content is centred at `max-w-6xl` with edge padding
  `px-5 sm:px-8`. The `Container` / `Section` primitives own this; views compose
  them rather than re-deriving widths.
- **Parents own spacing.** A child never carries its own `mt/mb/mx/my`; the
  parent supplies `gap-*` / `space-y-*` or a layout primitive. This keeps rhythm
  composable and predictable.
- **Whitespace as hierarchy.** Emphasis comes first from _room_ and _scale_, then
  from weight, and only last — and rarely — from the aurora.

The two contract widths everything is verified at: **375** and **1440**. Also
sanity-check 320 / 768 / 1024. No horizontal overflow at any width.

---

## 6. Motion character

Motion is meaning, not decoration: animate **transforms** (GPU), never layout.

**Easings** (refined):

| Token         | Curve                               | Use                                 |
| ------------- | ----------------------------------- | ----------------------------------- |
| `ease-out`    | `cubic-bezier(0.22, 1, 0.36, 1)`    | Expo-out — reveals, most entrances. |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)`    | Symmetric moves, the float loop.    |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | A little overshoot — taps, toggles. |

**Durations:** `--dur-fast` 180ms · `--dur` 280ms · `--dur-slow` 420ms ·
`--dur-slower` 700ms. **No UI animation exceeds ~700ms.** The one exception is
the **slow aurora loop** — `aurora-pan` runs `14s linear infinite`, so the
gradient drifts almost imperceptibly; the supporting `float` (9s) and `shimmer`
(2.4s) loops are equally unhurried. Ambient motion should feel like weather, not
a carousel.

**Restraint:** the `Reveal` wrapper is a small fade + `translateY` on
`ease-out`; `Parallax` and `Tilt` are subtle, transform-only, and never enough to
induce motion sickness. **Reduced motion is honored globally** — a
`prefers-reduced-motion` media query crushes all animation/transition durations
to ~0 and disables smooth scroll; the motion wrappers also bail out on their own.
If you animate by hand, gate it the same way.

---

## 7. Light & dark

Both themes are **first-class**, driven by `<html data-theme="…">` (the `dark`
variant is `[data-theme="dark"]`). The site **defaults to dark** because a true-
black canvas gives the hero aurora its maximum impact — the glow has the most to
push against. Light is a full, deliberate paper theme, not an afterthought.

Switching is purely a **token flip**: only the role tokens change value
(`--background`, `--foreground`, the surface/border ramp, the glass mix, the
shadows). The aurora stops are theme-independent — the same four lights read on
both canvases. Because components consume roles, never raw hex, nothing in a
component needs to know which theme is active. `color-scheme` is set per theme so
native form controls and scrollbars match.

---

## 8. Tone & voice

The visual restraint has a verbal twin. Copy is confident, warm, precise,
first-person, present-tense; sentence case; no buzzword soup. The full spec —
voice, mechanics, do/don't, and the `placeholder: true` rule — lives in
[`CONTENT_STYLE.md`](./CONTENT_STYLE.md). Words are designed too: they obey the
same discipline as the pixels.

---

## 9. How this avoids the generic-AI portfolio mean

The failure mode of an auto-generated portfolio is _maximalism_: five gradients,
glassmorphism on everything, neon everywhere, a different font per section, and
animation for its own sake. Every choice above is the opposite.

| Do (this site)                                           | Don't (the generic mean)                                         |
| -------------------------------------------------------- | ---------------------------------------------------------------- |
| **One** accent — the aurora, ≤ 2–3 touches per screen.   | Five competing gradients; rainbow buttons.                       |
| Tokenise everything; components reference roles.         | Raw hex, `text-[42px]`, ad-hoc `300ms` sprinkled inline.         |
| Hierarchy from **space + scale + weight** first.         | Hierarchy faked with colour and drop-shadows.                    |
| Glass on things that should float; mono elsewhere.       | Frosted glass on every surface until it's mud.                   |
| Negative tracking on display, generous body line-height. | Default tracking everywhere; cramped, loose, or both.            |
| Two families, each with one job.                         | A new typeface per section for "variety".                        |
| Motion that marks meaning; reduced-motion honored.       | Parallax/auto-play everywhere; ignores `prefers-reduced-motion`. |
| Pastel, low-sat aurora that glows.                       | High-sat neon that vibrates.                                     |

**The squint test.** Blur your eyes at the [storybook](../src/app/storybook)
gallery (the "squint view" of the whole system, light _and_ dark at 375/1440). A
clean design resolves into a calm grey field with a few precise glints of colour.
If squinting reveals a busy, multi-colour, high-contrast mess, the design has
drifted toward the mean — pull accents and add space until it's quiet again.
