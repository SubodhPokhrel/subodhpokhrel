# UI DISCIPLINE

> The design system is the source of truth — not habit, not the first idea, not
> whatever the model emitted. This document is the contract every visual change
> signs. **These are not suggestions.** A change that breaks one of these rules
> is not done — it is a regression that happened to compile.

Tokens live in [`src/app/globals.css`](../src/app/globals.css). Primitives live
in [`src/components/primitives`](../src/components/primitives). The living
gallery lives at `src/app/storybook` (renders `src/views/StorybookView`). When
this doc and a component disagree, the component is wrong.

**Cross-links:** [`../CLAUDE.md`](../CLAUDE.md) ·
[`ARCHITECTURE.md`](ARCHITECTURE.md) · [`COMPLIANCE.md`](COMPLIANCE.md) ·
[`CONTENT_STYLE.md`](CONTENT_STYLE.md).

---

## 0. How we keep the UI from rotting

The risk has a name: **vibe-coding** — generating plausible-looking JSX with
fresh `flex`, fresh hex values, a new radius, a fourth gradient, a hand-rolled
button "just for here." Each one is individually defensible. Together they are
how a coherent system degrades into generic-AI maximalism: the opposite of what
this site is.

The defenses, in order of authority:

1. **The design system is the source of truth.** Visual values come from tokens
   in `globals.css`. Components come from `src/components/primitives`. You do not
   invent; you compose.
2. **A rule break is not "done."** Passing tests is necessary, not sufficient. If
   a change introduces an off-vocabulary spacing value, a raw hex, a hand-rolled
   panel, or a second accent hue, it is unfinished regardless of green CI.
3. **The gallery is the witness.** `src/app/storybook` shows the whole system in
   one squint. If a new thing isn't there, the next person re-invents it — that
   is how drift starts.
4. **The Playwright visual gate is non-skippable** (§9). No UI change ships
   without screenshots at the contract widths in both themes.

Everything below is the elaboration of those four.

---

## 1. Design intent before JSX

Do not open a `.tsx` file and start typing markup. First establish, in words,
what the screen is _for_ and what dominates it.

**Before writing a section or view, write a short text wireframe:**

```
INTENT:   Convince a visitor in 5 seconds that this is a designer who ships.
FOCAL:    The display-tier headline with ONE aurora word.
ORDER:    eyebrow → headline → one-line subhead → primary CTA → secondary link
ACCENT:   aurora on the headline word only (1 of this view's ~2–3 touches)
STATES:   n/a (static) — but the contact section below has 4 (see §6)
REF:      visually match the shipped Hero section in src/components/sections
```

Then pick an **existing shipped section as the visual reference** so the new work
inherits established rhythm and density instead of re-deriving it.

**Driving a design tool.** If a design surface is driven, it is driven through
the **Playwright MCP** — never by eyeballing a screenshot pasted into the chat.
When the design tool is unreachable, you build from **the text wireframe + the
tokens + an existing section**, and you state plainly in the PR that _the design
pass is still owed_. You do **not** improvise a "close enough" look and call it
designed. Improvisation is exactly the rot in §0.

The Playwright **visual gate (§9) stays non-skippable** whether or not a design
tool was available. Unreachable tooling lowers confidence; it never lowers the
gate.

---

## 2. Tokens are the only source of visual values

Every color, type size, radius, easing, and duration in a component is a token
utility from `globals.css`. No raw hex. No `text-[42px]`. No `duration-[317ms]`.
If a value isn't in the vocabulary, the answer is not "add an arbitrary value" —
it is "use the nearest token, or change the token deliberately."

**The exact utilities (these are the whole palette of legal values):**

| Category          | Utilities                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Color (semantic)  | `bg-background` · `text-foreground` · `bg-surface` / `bg-surface-2` / `bg-surface-3` · `border-border` · `border-border-strong` · `text-muted-foreground` · `ring` (focus ring color) |
| Type (role scale) | `text-display-xl` · `text-display` · `text-h1` · `text-h2` · `text-h3` · `text-title` · `text-body-lg` · `text-body` · `text-caption` · `text-eyebrow`                                |
| Radius            | `rounded-xs` · `rounded-sm` · `rounded-md` · `rounded-lg` · `rounded-xl` · `rounded-2xl`                                                                                              |
| Easing            | `ease-out` · `ease-in-out` · `ease-spring`                                                                                                                                            |
| Duration          | `--dur-fast` · `--dur` · `--dur-slow` · `--dur-slower`                                                                                                                                |
| Aurora recipes    | `.text-aurora` · `.aurora-divider` · `.aurora-border` · `.glow-aurora` · `.glass`                                                                                                     |

Each **type-scale utility already carries its font-weight, letter-spacing, and
line-height.** Therefore: **never** add `font-bold`, `leading-*`, or
`tracking-*` by hand on top of a `text-*` role utility. If a heading needs to be
heavier or tighter, that is a token change, not a component override.

### 2.1 THE CLOSED VOCABULARY

A screen should be physically unable to pick a value that isn't in the system.
That is enforced three ways: a closed spacing set, parents owning spacing, and
layout primitives.

**Closed spacing set.** A portfolio breathes — its rhythm is generous, not
dense. We use a small, deliberately spaced ramp and nothing between:

```
gap-2  gap-3  gap-4  gap-6  gap-8  gap-12  gap-16  gap-24
(0.5  0.75   1     1.5    2     3      4      6     rem)
```

The set is sparse on purpose. Tight intervals (`gap-2`–`gap-4`) group elements
_within_ a component; wide intervals (`gap-8`–`gap-24`) separate _sections and
blocks_, which is where a marketing site earns its premium feel. The same scale
governs `space-y-*`, `p-*`, and section padding.

> **Forbidden:** arbitrary values like `gap-[13px]`, `mt-[27px]`, `p-2.5`, or any
> odd in-between tier. If you reach for one, you have either mis-grouped the
> layout or you need a layout primitive — not a magic number.

**PARENTS OWN SPACING.** A child component **never** carries `mt/mb/ml/mr/mx/my`.
A child does not know what it sits next to and must not assume. The **parent**
supplies the rhythm via `gap-*` (flex/grid), `space-y-*`, or a layout primitive.
This is what lets the same `<Panel>` sit in a grid, a stack, or a hero without
fighting its neighbors.

**The TYPE RAMP — this IS a marketing site.** Unlike an app shell, the display
tiers are fully in scope here; the hero is supposed to be loud. Map token → role:

| Token utility     | Role on this site                                               |
| ----------------- | --------------------------------------------------------------- |
| `text-display-xl` | The hero's single biggest statement. One per site, effectively. |
| `text-display`    | Large landing headline / section opener with display weight.    |
| `text-h1`         | Primary page title.                                             |
| `text-h2`         | Section heading.                                                |
| `text-h3`         | Sub-section / card group heading.                               |
| `text-title`      | Card title, panel heading, project name.                        |
| `text-body-lg`    | Lead paragraph / subhead under a headline.                      |
| `text-body`       | Default running copy.                                           |
| `text-caption`    | Meta, captions, secondary labels, timestamps.                   |
| `text-eyebrow`    | Uppercase wide-tracked overline above a heading.                |

Skipping tiers is fine; inventing a size is not. Two adjacent text blocks should
differ by at least one ramp step so hierarchy reads (§15).

**COLOR = monochrome + ONE aurora accent.** The canvas is black-and-white
(semantic tokens only). The aurora is the _single_ color, and it is rationed:
**at most ~2–3 aurora touches per view.** A "touch" is one use of `.text-aurora`,
`.aurora-divider`, `.aurora-border`, `.glow-aurora`, the `<GradientText>`
primitive, or the hero `<Aurora>` canvas. Three is a ceiling, not a target — one
confident touch beats three timid ones. Full details and the pairing table in §3.

**LAYOUT PRIMITIVES compose pages.** Pages are laid out with `<Container>` and
`<Section>` from `src/components/primitives`, not with hand-rolled wrapper divs
carrying bespoke `max-w-*` and `px-*`. Because the page width, gutters, and
section rhythm live _inside_ those primitives, a screen built from them
**physically cannot** pick a non-vocabulary width or padding. That is the point:
the vocabulary is closed by construction, not by good intentions.

---

## 3. Color & contrast — black/white + aurora

The aurora is **fill and emphasis**, never information and never running text.

- **Allowed aurora roles:** a single headline _word_ (`.text-aurora` /
  `<GradientText>`), a hairline `aurora-divider`, a gradient hairline
  `aurora-border` on a focal panel, a soft `glow-aurora` halo, and the hero
  `<Aurora>` canvas.
- **Never:** body text, captions, labels, links you must read; the aurora as a
  large flat fill behind text; aurora over a busy or low-contrast field where its
  own gradient destroys legibility.

**AA contrast holds in BOTH themes.** `foreground`/`muted-foreground` on
`background`/`surface`/`surface-2`/`surface-3` are AA in light _and_ dark — that
is why we use the **semantic role tokens, which flip in dark mode**, and never
raw values, which don't. `text-[#08080a]` is black in both themes and invisible
on the dark canvas; `text-foreground` is correct in both. **Color is never the
only signal** — pair it with weight, an icon (the `Icon` primitive), or text.

**Allowed / never pairings:**

| Surface                       | Foreground / text                                   | Aurora use                                 | Verdict                        |
| ----------------------------- | --------------------------------------------------- | ------------------------------------------ | ------------------------------ |
| `bg-background`               | `text-foreground`                                   | aurora on one headline word                | ✅ Allowed                     |
| `bg-surface` / `bg-surface-2` | `text-foreground`, `text-muted-foreground` for meta | `aurora-border` on the panel edge          | ✅ Allowed                     |
| `bg-background`               | —                                                   | `aurora-divider` hairline between sections | ✅ Allowed                     |
| focal `<Panel>`               | `text-foreground`                                   | one `glow-aurora` halo                     | ✅ Allowed (counts as a touch) |
| any surface                   | **aurora as body/caption/label text**               | —                                          | ❌ Never                       |
| busy/low-contrast field       | text over a large aurora fill                       | —                                          | ❌ Never (legibility)          |
| any                           | a **second** accent hue beyond aurora               | —                                          | ❌ Never (mono + one accent)   |
| any                           | raw hex / raw Tailwind palette (`text-zinc-500`)    | —                                          | ❌ Never (use role tokens)     |

---

## 4. Components are composed, not hand-rolled — THE PRIMITIVES RULE

**This is the rule that keeps the system from being re-invented file by file.
Read it before you write any markup.**

1. **CHECK `src/components/primitives` first.** Before building _anything_, look
   at what already exists. The closed primitive set is: **`Container`,
   `Section`, `Button`, `Panel`, `Eyebrow`, `GradientText`, `Badge`, `Input`,
   `Textarea`, `Logo`, `Icon`** (inline SVG set). The barrel
   (`src/components/primitives/index.ts`) is the menu.
2. **If a primitive exists, use it.** Sections and views **compose** from
   primitives. They do **not** hand-roll a button, panel, badge, input, eyebrow,
   icon, or container — ever. A raw `<button className="...">` or a div dressed
   up as a card in a section is a defect, not a shortcut.
3. **Rule of three → extract.** The first time a pattern appears, inline it. The
   second, note the duplication. **The third time, extract it into
   `src/components/primitives`** (with a Storybook specimen, §5) instead of
   copy-pasting a fourth. Copy-paste is how four slightly-different buttons are
   born.
4. **Motion wrappers** (`Reveal`, `Parallax`, `Tilt` in
   `src/components/motion`) and **visual** (`Aurora`, `AuroraFallback`,
   `GlowBorder` in `src/components/visual`) are composed the same way — don't
   re-implement a reveal or a glow inline.

**Styling is Tailwind utilities.** No inline `style={{…}}` except a genuinely
**dynamic** value that cannot be a class: the shader/gradient CSS variable, or a
computed transform driven by state. A static color/size/spacing as an inline
style is always wrong — it is a token bypass.

**Server-by-default.** Components are server components unless they need state,
effects, events, or browser APIs; only then add `"use client"`. **Interactive
primitives that animate carry `"use client"`** (e.g. a button with hover/press
motion, a tilt wrapper). Keep the client boundary as low in the tree as possible.

---

## 5. Every component reviewable in isolation — the LIVING GALLERY

We **ship a living gallery** at `src/app/storybook`, which renders
`src/views/StorybookView`. It is the one-page **"squint view"** of the entire
design system: **every primitive, in every variant and state, in light AND dark,
at the 375 and 1440 contract widths.** It is `robots` **noindex** — internal, not
a public page.

The gallery is non-negotiable plumbing:

- **In the same change** that adds a new primitive _or a new variant of an
  existing one_, you **add its specimen** to the gallery. New variant with no
  specimen = unfinished change.
- A specimen shows the thing in **all its states** (default / hover / focus /
  disabled / loading where applicable) so the gallery doubles as the §6 + §7
  evidence.
- This is **how the next person discovers what already exists** — which is the
  thing that stops the copy-paste drift §4 forbids. If it's not in the gallery,
  the next contributor can't find it and will rebuild it.

---

## 6. Four states, always

Any view that renders data renders **all four** states — never just the happy
path:

| State         | What it shows                                                    |
| ------------- | ---------------------------------------------------------------- |
| **Loading**   | A calm placeholder / disabled-with-progress; no layout jump.     |
| **Empty**     | A deliberate "nothing here yet" — not a blank hole.              |
| **Error**     | A human message + a way forward (retry, or the mailto fallback). |
| **Populated** | The real content.                                                |

**This binds the contact form.** The form must handle: idle, **submitting**
(disabled + progress, §7), **success** (confirmation, focus moves sensibly), and
**error** (message + the graceful `mailto:` fallback). Shipping only the success
path is an incomplete feature.

**Primitives degrade gracefully.** A missing image renders **nothing** (no broken
icon, no layout shift) — decorative images use `alt=""`/`aria-hidden`. A channel
with no inline render (e.g. WeChat) shows a **QR / fallback**, never a dead link.

---

## 7. Feedback on every action

- Buttons **disable and show progress while in flight** — no double-submit, ever.
  The `Button` primitive owns this; use its loading/disabled affordance rather
  than rolling your own.
- **Both outcomes surface.** Success _and_ failure are visible to the user — a
  silent failure is a bug.
- **Focus lands sensibly after.** On success, move focus to the confirmation or
  next logical control; on error, to the message or the first invalid field. The
  user is never left wondering whether anything happened.

---

## 8. Responsive + accessible are part of "done"

**Responsive.** Works at the contract widths **375** (mobile) and **1440**
(desktop), and stays sensible at **iPad** widths in between. No horizontal
overflow at any width. The fluid `clamp()` type scale handles most scaling — you
verify, you don't re-tune per breakpoint.

**Accessible (required, not a follow-up):**

- Full **keyboard navigation**; logical tab order.
- **Visible `:focus-visible` ring** (the global ring uses the `ring` token) — do
  not remove outlines.
- **Labelled fields** (`Input`/`Textarea` get real labels, not placeholder-only).
- **Alt text** on meaningful images; `alt=""` on decorative.
- **Color is never the only signal** (§3).
- **Hit targets ≥ 44px** on touch.
- **`prefers-reduced-motion` honored** (§11).
- **AA contrast** in both themes (§3).

---

## 9. The Playwright MCP visual gate (every UI change, no exceptions)

No UI change ships without running it. The loop is:

> **screenshot → inspect → fix → screenshot** (repeat until clean).

On every UI change, capture and check:

- **Four states** (§6) where the view has data.
- **Both contract widths:** 375 and 1440.
- **Both themes:** light and dark (semantic tokens must flip correctly).
- **Keyboard order:** tab through; order is logical, focus ring visible.
- **Clean console:** no errors or warnings.
- **Sane network:** no unexpected requests, no third-party font CDN, no 4xx/5xx.
- **THE SQUINT TEST:** blur the screenshot until detail disappears. **One focal
  element still dominates. Groups still separate. Edges still hold.** If squinting
  produces an even gray mush, the hierarchy failed — fix it before shipping.

This gate is **non-skippable**, including when a design tool was unreachable
(§1). Unreachable tooling means the design pass is _owed_; it does not waive the
gate.

---

## 10. Size & structure limits

- **Components and pages aim ≤ 500 lines.** Past that, **extract** (a subcomponent,
  a hook, a content module). The **hard cap is 1000 lines** — a CI failure
  (`max-lines` + `scripts/check-file-size.mjs`), not a guideline.
- **One component does one thing.** **Data lives in a hook** (`src/hooks`),
  **presentation lives in the component.** A component that fetches, transforms,
  and renders is three components wearing a trench coat.
- **No vague names.** `Card2`, `handleClick`, `data`, `Wrapper`, `temp` are
  rejected in review. Name the thing for what it _is_ (`ProjectCard`,
  `submitContactForm`, `projects`).

---

## 11. Motion discipline

Motion is **meaning, not decoration.**

- **Every** hover, focus, and press **eases** — `ease-out` / `ease-spring` with a
  `--dur*` token. **No hard snap** on interactive state changes.
- **Honor `useReducedMotion()`** (and the global reduced-motion media query). The
  `src/components/motion` wrappers already bail out; hand-rolled animation must
  gate the same way.
- **Animate transforms and opacity, not layout** (`transform`/`opacity`, never
  animating `width`/`height`/`top` that trigger reflow).
- **Aurora restraint applies to motion too** — the panning aurora is the hero's,
  not every card's.
- **Nothing that delays the user.** Entrance reveals are quick; no animation
  blocks interaction or makes the user wait to read.

---

## 12. i18n-ready

- **No user-facing string is hardcoded in a component.** All copy lives in
  `src/content` (`profile`, `projects`, `skills`, `socials`, `experience`, site
  strings). Components render content; they do not author it.
- Full **EN / 中文 i18n is phase-2** and intentionally deferred. But because the
  content layer is already separated, switching it on is a **translation task,
  not a rewrite.** Keep that seam clean: a new label that goes straight into JSX
  breaks the seam and is rejected.

---

## 13. The "not cheap" tells — auto-reject table

These are the fingerprints of generic, rushed UI. Each is an automatic reject
with a fix that points back into the system.

| Tell                             | Why it's cheap                             | Fix                                           |
| -------------------------------- | ------------------------------------------ | --------------------------------------------- |
| Emoji used as icons              | Inconsistent, unstyled, off-brand          | Use the **`Icon`** primitive (inline SVG set) |
| Extra hues beyond mono + aurora  | Breaks the single-accent identity          | Mono semantic tokens + the **one** aurora     |
| Inconsistent corner radii        | Reads as un-systematic                     | One of `rounded-xs…2xl` per role              |
| Uneven / arbitrary spacing       | The "vibe-coded" smell                     | The **closed spacing set** (§2.1)             |
| Raw focus rings / no hover state | Feels like a prototype                     | Token `ring` + eased hover (§11)              |
| Walls of text                    | No hierarchy, nothing to read first        | The **type ramp** + spacing rhythm (§2.1/§15) |
| Happy-path only                  | Looks broken the moment data isn't perfect | **Four states** (§6)                          |
| Raw hex / `text-zinc-500` etc.   | Won't flip in dark; off-palette            | **Semantic role tokens** (§3)                 |
| Gaudy multi-gradient overuse     | The opposite of restraint                  | **One** aurora accent, ~2–3 touches (§2.1/§3) |
| Hand-rolled button/panel/input   | Drift from the system                      | Compose from **primitives** (§4)              |

---

## 14. The audit prompt

Run this against the codebase to find drift. **List `file:line`, do not fix yet.**

> Audit `src/**` against `docs/UI_DISCIPLINE.md`. For each finding, output
> `file:line` and the rule violated — **do not change any code yet.** Flag:
> spacing values outside the closed set `{2,3,4,6,8,12,16,24}` (any `gap-[…]`,
> `p-2.5`, arbitrary tier); any **child margin** (`mt/mb/ml/mr/mx/my` on a
> component that has a parent); type sizes **outside the role ramp** (`text-[…px]`
> or `font-bold`/`leading-*`/`tracking-*` layered on a `text-*` role); **raw hex
> or raw Tailwind palette** colors (`#…`, `text-zinc-*`, `bg-slate-*`); **raw
> `flex`/`grid` wrappers where `Container`/`Section` belong**; **data views
> missing one of the four states** (loading/empty/error/populated); views with
> **more than one focal action** or **more than ~3 aurora touches**; interactive
> elements with **no hover/focus** state; **inline `style`** that isn't a genuinely
> dynamic value; **brand-name string literals**; and files **over 500** (warn) or
> **over 1000** (fail) lines. Group by rule.

---

## 15. Visual composition

- **One focal point per view.** Decide what wins the eye, then make everything
  else yield. Two co-equal focal elements = no focal element.
- **Visible hierarchy via ≥ 2 of {size, weight, color}.** The type ramp already
  bundles size + weight; aurora or `muted-foreground` adds the color axis. One
  axis alone usually isn't enough.
- **Group by proximity** using the spacing tiers — tight `gap-2`–`gap-4` _within_
  a group, wide `gap-8`–`gap-24` _between_ groups. Spacing is how the eye knows
  what belongs together.
- **Align to a grid.** Things line up. **Centering is a deliberate choice** (a
  hero, a single CTA), not the lazy default for everything.
- **De-emphasize meta** with the **`muted-foreground`** role — timestamps,
  captions, secondary labels recede so primary content leads.

**Gate:** the **squint test** (§9). If hierarchy survives the blur, composition is
done.

---

## 16. Definition of done for a UI change

A UI change is done only when **all** of these are true:

- [ ] **Design intent written first** (§1) — text wireframe + a referenced shipped
      section; if a design tool was unreachable, the owed design pass is noted.
- [ ] **Tokens only** (§2) — no raw hex/px/duration; no `font-bold`/`leading-*`/
      `tracking-*` layered on a role utility.
- [ ] **Closed vocabulary respected** (§2.1) — spacing in the set; **no child
      margins** (parents own spacing); type from the ramp; laid out with
      `Container`/`Section`.
- [ ] **Mono + one aurora** (§3) — ≤ ~3 aurora touches; aurora never as text;
      AA contrast in **both** themes.
- [ ] **Composed from `src/components/primitives`** (§4) — nothing hand-rolled
      that a primitive covers; rule-of-three extractions done; inline `style`
      only for genuinely dynamic values.
- [ ] **A Storybook specimen added** (§5) for any new primitive or variant, in
      light + dark at 375 + 1440.
- [ ] **Four states** (§6) for any data view (binds the contact form).
- [ ] **Feedback on every action** (§7) — disabled-in-flight, both outcomes
      surfaced, focus lands sensibly.
- [ ] **Responsive + accessible** (§8) — 375 & 1440, keyboard, visible focus,
      labels, alt text, 44px targets, reduced motion.
- [ ] **Motion is meaning** (§11) — everything eases, reduced motion honored,
      transforms not layout.
- [ ] **No hardcoded user-facing strings** (§12) — copy lives in `src/content`.
- [ ] **Within size limits** (§10) — aim ≤ 500 lines, hard cap 1000; clear names.
- [ ] **Playwright visual gate passed** (§9) — screenshot→inspect→fix→screenshot;
      four states, 375 & 1440, light & dark, keyboard order, clean console, sane
      network, **squint test** holds.

If any box is unchecked, the change is **not done.**
