# TECH STACK — decision record

> **Why these and not others.** This file records the _reasoning_ behind each
> tool, not just the choice. Read it when you're tempted to add a dependency or
> swap a layer — most of those temptations are already answered below. A choice
> that contradicts the guiding principle is not a neutral preference; it's a
> regression.

## Guiding principle

Three rules, in order:

1. **Pick opinionated tools that make the messy path harder.** The right
   framework should make the wrong thing awkward — strict types, file routing,
   and a closed primitive set exist so that the easy way is also the correct
   way.
2. **Adopt mature libraries for commodity concerns.** Email delivery, schema
   validation, class merging, animation — these are solved problems. We don't
   hand-roll them, and we don't gold-plate them either.
3. **Keep the codebase small and legible.** Every dependency is a liability
   someone else has to understand. Fewer moving parts, fewer files, shorter
   files (the ≤ 1000-line cap is a _symptom_ check, not the goal). If a layer
   doesn't earn its weight, it doesn't ship.

These are not suggestions. A dependency that violates the principle — heavy, a
third-party CDN, a brand-named style ref, a thing that cold-starts — is a defect
regardless of how nicely it works.

---

## 1. Language & app shape

**TypeScript, strict, everywhere.** `strict: true` plus
`noUncheckedIndexedAccess` — so `arr[i]` is `T | undefined`, not a lie. No
`any`; the lint config treats it as an error, not a style nit. The reasoning:
this is a small site maintained intermittently by one person. The compiler is
the cheapest, most patient reviewer we have; it catches the class of bug
("undefined is not a function") that otherwise surfaces in production at 2am.
Strictness is front-loaded cost that pays back every refactor.

**A single Next.js app — not a monorepo.** This is the most important shape
decision, and the answer is deliberately boring. A monorepo (Turborepo,
workspace packages, a shared `ui` package) buys you _isolation between multiple
deployables_. We have exactly one deployable: a portfolio. There is no second
app to share a design system with, no backend service in its own package, no
publishable library. Introducing workspaces would add tooling (package
boundaries, build graphs, version juggling) to solve a problem we don't have —
and it would make the codebase _less_ legible, not more, because "where does
this live?" gains a second axis. The design system lives in
`src/components/primitives`; that's the whole "package." If a real second
surface ever appears (a separate dashboard, a published component lib), that is
the moment to reach for workspaces — not before. See `docs/ARCHITECTURE.md` for
the in-app folder structure that gives us the _organization_ benefit of a
monorepo without the _machinery_.

---

## 2. Framework — Next.js 16 App Router + React 19

**Why Next.js.** A portfolio's whole job is to be found and to load instantly.
Next.js gives us, out of the box, the things that matter for that:

- **SSR/SSG for SEO.** Pages render to HTML at build/request time, so crawlers
  and link unfurlers see real content, not an empty `<div id="root">`. For a
  site whose primary KPI is "a recruiter Googles the name and the page is
  perfect," this is non-negotiable. A pure client SPA would be the wrong tool.
- **File-based routing.** Routes are folders. There's no router config to drift
  from reality, and the messy path (a route that exists in config but not on
  disk, or vice versa) is structurally impossible.
- **`next/image`.** Automatic responsive sizing, modern formats, and
  lazy-loading for free — image weight is the usual reason a "minimal" site is
  secretly slow.
- **Vercel co-deploy.** The framework and the host are built by the same team;
  edge, image optimization, and route handlers Just Work without an ops layer.

**Why React 19.** It's the version the App Router targets; Server Components,
`use`, and the form/action primitives are first-class. Staying current avoids a
forced migration later and keeps us on a supported line.

**App Router, used correctly: `app/` is routing only.** Route files are thin —
they import a composition and render it. The actual pages ("the views") live in
`src/views/*`, which compose `src/components/sections/*`, which compose
primitives, which consume tokens. This keeps routing decisions (segments,
metadata, loading/error boundaries) separate from layout decisions, and it's why
a folder named `pages/` is _not_ used — that name is reserved by Next and would
silently re-enable the legacy Pages Router. Full rationale in
`docs/ARCHITECTURE.md`.

---

## 3. Styling — Tailwind v4, CSS-first

**Tailwind CSS v4, configured in CSS (`@theme`), no `tailwind.config.js`.** v4
moves configuration into `src/app/globals.css` via the `@theme` block. We lean
into that fully: there is no JS config file. The reasoning:

- **One source of truth for design tokens.** Colors, the role type scale, radii,
  easings, and durations are all CSS custom properties in `@theme`. The same
  file that a browser reads is the file a developer edits — no JS-to-CSS
  translation layer to get out of sync.
- **The token system is the discipline.** Components never write raw hex, `px`
  font sizes, or ad-hoc millisecond durations. They use semantic utilities
  (`bg-background`, `text-foreground`, `bg-surface`/`-2`/`-3`,
  `border-border`/`-strong`, `text-muted-foreground`) and the role type scale
  (`text-display-xl` … `text-eyebrow`), each of which already carries weight,
  tracking, and line-height. The aurora "recipes" (`.text-aurora`,
  `.aurora-divider`, `.aurora-border`, `.glow-aurora`, `.glass`) are defined
  once, centrally, so the single accent stays consistent. Tailwind's utility
  model makes the _tokenized_ path the _convenient_ path — exactly rule 1 of the
  guiding principle. See `docs/UI_DISCIPLINE.md`.
- **No runtime CSS-in-JS.** Styles are static CSS; nothing computes class names
  at render time, so there's no styling cost in the React tree and no extra
  client bundle.

**`prettier-plugin-tailwindcss` for class order.** Class lists are sorted
deterministically on save and checked in CI. This isn't cosmetic: a stable order
makes diffs readable and removes "which order do the classes go in?" as a thing
anyone ever debates.

---

## 4. Motion & 3D

**Framer Motion via `motion/react`.** Animation is meaning, not decoration —
reveals on scroll, subtle parallax/tilt, the slow aurora loop. Framer Motion
gives us a declarative, transform-first API and, critically, first-class
`prefers-reduced-motion` handling, which our motion wrappers
(`components/motion`: `Reveal`, `Parallax`, `Tilt`) bake in so individual
sections can't forget it. We import from the `motion/react` package (the current
entry point), not the legacy `framer-motion` path. Animating transforms (not
layout) keeps it on the GPU and off the main thread.

**The hero aurora is a hand-written WebGL fragment shader** — `src/components/visual/AuroraCanvas`,
lazy-loaded `ssr: false`, DPR-capped — with a **pure-CSS `AuroraFallback`** for
reduced-motion, low-end, or no-WebGL conditions. This is the deliberate
centerpiece, so the build choice is deliberate too.

**Why NOT React-Three-Fiber in v1:**

- **Bundle weight.** R3F pulls in three.js and its reconciler — hundreds of KB
  for what is, in v1, a single full-screen gradient. A self-contained fragment
  shader is a few KB of GLSL plus a thin canvas host. For a site whose brand
  promise is "fast and restrained," shipping a 3D engine to draw one quad is the
  opposite of the intent.
- **React-19 compatibility risk.** R3F's reconciler tracks React internals; on a
  brand-new major (React 19) that's a moving target we don't want on the
  critical path of the _first_ thing a visitor sees.
- **Minimalist intent.** The aesthetic is restraint. A bespoke shader is the
  smallest thing that achieves the exact look; an engine would be capability we
  pay for and don't use.

**R3F is a clean phase-2 add, not a rewrite.** The aurora is already isolated
behind `src/components/visual` with an SSR-false boundary and a fallback. If
real 3D scenes become the design (interactive objects, lighting, geometry),
R3F slots in _behind that same boundary_ — the rest of the app never learns the
difference.

---

## 5. Fonts — self-hosted

**Inter (sans) + JetBrains Mono (mono), self-hosted via `next/font/local`,**
files in `src/fonts/`, no third-party font CDN — ever. Mono is for small
technical labels only; we never use more than these two families. The reasons,
in priority order:

- **Performance.** `next/font/local` inlines the font CSS and self-hosts the
  `.woff2`, so there's no extra DNS lookup or connection to a font host on the
  critical path. The files are served from our own origin alongside everything
  else.
- **No layout shift.** `next/font` computes fallback metrics and reserves space,
  eliminating the FOUT/CLS jump that a `<link>` to an external font causes. CLS
  is a Core Web Vital and a visible quality tell.
- **Privacy.** A third-party font CDN sees every visitor's IP. Self-hosting
  means no visitor data leaves our origin for the sake of a typeface.
- **No third-party dependency.** A font CDN is an availability and policy risk we
  simply don't take on for an asset we can ship ourselves. This is also a hard
  rule (`docs/UI_DISCIPLINE.md`, `docs/COMPLIANCE.md`): self-hosted only.

---

## 6. Contact / backend

**A Next.js route handler (`src/app/api/contact`) + Resend + zod +
in-memory rate-limit + a graceful `mailto` fallback.** All secrets are
env-driven (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`) — never hardcoded. The form
itself renders the full four states (loading / empty / error / populated), gives
feedback on every action, and guards against double-submit.

**Why no separate backend or database in v1.** The only dynamic thing this site
does is send one email. Standing up a backend service and a database to move a
contact message would be infrastructure theatre — more surface to secure,
monitor, and pay for, in service of a single fire-and-forget action. A Next.js
route handler runs in the same deployment, ships and versions with the
frontend, and needs no separate ops story.

**Nothing should cold-start.** This is a hard constraint, not a preference. A
visitor who clicks "Send" should not wait on a container spinning up. The route
handler is lightweight and the email provider is a hosted API call; there is no
warm-up. Each piece earns its place:

- **Resend** — a mature, hosted email API. Delivery is a commodity concern
  (rule 2); we call it, we don't run an SMTP server.
- **zod** — schema validation at the boundary. Untrusted input is parsed into a
  typed shape _once_, at the edge, so the rest of the handler works with values
  the compiler trusts.
- **In-memory rate-limit** — enough to blunt casual abuse of a single form
  without dragging in Redis or a stateful store. Honest about its scope: it's
  per-instance, which is the right size for v1 traffic.
- **`mailto` fallback** — if the send path is unavailable (missing key, provider
  down), the UI degrades to a plain `mailto:` link. The visitor is never
  stranded. This is the four-state discipline applied to a network boundary.

**Deferred seams (do not build now, but the seam exists):**
**Supabase** for a CMS/content store, and **Render** for any heavy or
long-running job. Both are left as future adapters, not present infrastructure
— see §7 and §10.

---

## 7. Provider seams / future-proofing

**The email send is the one external boundary today.** Everything else is
static: content is typed data in `src/content/*` (profile, projects, skills,
socials, experience), rendered at build time. There is exactly one place where
the app reaches outside itself, and it's deliberately isolated in
`src/lib/email` behind the route handler.

That isolation is what makes the deferred providers _adapters, not rewrites_:

- **Adding Supabase (a CMS) later** is swapping the _source_ of `src/content`
  from typed files to a fetch — without touching a single view or section,
  because they already consume `content` through a typed interface, not from the
  filesystem directly. The shape stays; only the loader changes.
- **Adding Render (heavy/async jobs) later** is the email send growing a second
  implementation behind the same `src/lib/email` function signature. Callers
  already depend on the function, not on Resend. The send is the seam.

The discipline that buys this: **content lives in `src/content`, and the send is
isolated.** As long as those two boundaries hold, every deferred provider is one
adapter file away. The moment a view imports a vendor SDK directly, that promise
is broken — so it doesn't.

---

## 8. Tooling & quality gates

The principle here: **CI is the drift backstop; pre-commit is the fast first
line.** Nothing that's enforced in CI is _only_ in CI — the cheap, fast subset
runs on every commit so problems are caught in seconds, and CI guarantees no one
can bypass the slow checks.

- **pnpm** — the package manager. Strict, content-addressed, fast installs; its
  non-flat `node_modules` prevents phantom-dependency bugs (using a package you
  never declared), which is rule-1 discipline applied to dependencies.
- **ESLint, flat config** — the rule engine. Two gates beyond standard lint
  carry real weight: **`max-lines: 1000` as a hard error** (the legibility cap;
  `max-lines-per-function` and `complexity` warn earlier), and a
  **`no-restricted-syntax` ban on brand-name string literals** so the
  "aurora-not-a-product-name" rule is enforced by tooling, not vigilance.
- **Prettier** (+ `prettier-plugin-tailwindcss`) — formatting and class order,
  checked in CI, fixed on save. Removes an entire category of review comment.
- **Husky + lint-staged** — the pre-commit hook. Runs lint/format/type checks on
  _staged_ files only, so the feedback loop is sub-second and bad commits don't
  form in the first place.
- **`scripts/check-file-size.mjs`** — the file-size guardrail, run in pre-commit
  _and_ CI. Belt-and-suspenders with ESLint `max-lines` so the cap holds even if
  a file dodges the linter.
- **GitHub Actions CI** — the backstop. Runs the full matrix on every push:
  typecheck, lint, format, file-size, build, and Playwright. If it's red, it's
  not done.
- **Playwright e2e** (`tests/e2e`) — smoke coverage of the real, built site:
  the page renders, the nav works, the contact form runs its states. Tests the
  thing users get, not a mock of it.
- **MCP, project-scoped (`.mcp.json`)** — Playwright + a hosted GitHub MCP, so
  the same browser-driving and repo tooling is available to assistive workflows
  without per-machine setup.

One-shot locally: `pnpm verify` (typecheck + lint + format:check + file-size +
build). The full gate list and the pre-merge checklist live in
`docs/COMPLIANCE.md`.

---

## 9. Hosting & domain

**Vercel**, with the custom domain **subodhpokhrel.com**. Vercel is the host the
framework is built for: zero-config builds from the repo, automatic preview
deployments per branch/PR, edge serving, and the image-optimization pipeline
that `next/image` relies on — no separate CDN or build server to operate. For a
one-person portfolio, the right amount of ops is _none_, and this is how you get
there. The domain is the brand; everything else is wiring.

---

## 10. Deferred to phase-2

Left as clean seams, **not** present infrastructure. Each is a future adapter
behind a boundary that already exists today — none is a rewrite.

| Deferred                | One-line reason it waits                                                              |
| ----------------------- | ------------------------------------------------------------------------------------- |
| Supabase (CMS / store)  | No dynamic content yet; `src/content` is typed data — swap the source, not the views. |
| Render (backend / jobs) | Nothing heavy or long-running to run; the email send isolates where it'd plug in.     |
| React-Three-Fiber (3D)  | The aurora is one shader; an engine is bundle weight we don't yet use.                |
| Blog / MDX              | No long-form content to publish; routing & views are ready when there is.             |
| i18n (EN / 中文)        | Single-locale ships first; copy lives in `src/content`, so locales are additive.      |

---

## Summary

| Layer           | Choice                                                 | One-line reason                                                        |
| --------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| Language        | TypeScript, strict + `noUncheckedIndexedAccess`        | The compiler is the cheapest reviewer; no `any`.                       |
| App shape       | Single Next.js app (no monorepo)                       | One deployable — workspaces would add machinery for a problem we lack. |
| Framework       | Next.js 16 App Router + React 19                       | SSR/SSG for SEO, file routing, image optimization, Vercel co-deploy.   |
| App layering    | `app/` routing-only → `views/` compositions            | Routing decisions stay separate from layout decisions.                 |
| Styling         | Tailwind v4 CSS-first (`@theme`, no config.js)         | One source of truth for tokens; the tokenized path is the easy path.   |
| Class order     | `prettier-plugin-tailwindcss`                          | Deterministic, reviewable diffs.                                       |
| Motion          | Framer Motion (`motion/react`)                         | Declarative, transform-first, reduced-motion-aware.                    |
| Aurora          | Hand-written WebGL shader + CSS fallback               | A few KB vs. a 3D engine; restraint over capability.                   |
| 3D              | R3F deferred to phase-2                                | Bundle weight + React-19 risk; clean add behind the visual boundary.   |
| Fonts           | Self-hosted Inter + JetBrains Mono (`next/font/local`) | Performance, privacy, no CDN dependency, no layout shift.              |
| Contact         | Route handler + Resend + zod + rate-limit + `mailto`   | One email to send; no backend/DB, nothing cold-starts.                 |
| Validation      | zod                                                    | Parse untrusted input to a typed shape at the boundary.                |
| Content         | Typed data in `src/content`                            | Static today, the swap-point for a CMS tomorrow.                       |
| Provider seam   | `src/lib/email` is the only external boundary          | Supabase/Render later = one adapter, not a rewrite.                    |
| Package manager | pnpm                                                   | Fast, strict, no phantom dependencies.                                 |
| Lint            | ESLint flat (`max-lines` 1000 + brand-name ban)        | Legibility cap and the aurora rule, enforced by tooling.               |
| Format          | Prettier                                               | Kills a whole category of review comment.                              |
| Pre-commit      | Husky + lint-staged                                    | Sub-second first line of defense on staged files.                      |
| File-size gate  | `scripts/check-file-size.mjs`                          | Belt-and-suspenders on the 1000-line cap.                              |
| CI              | GitHub Actions                                         | The drift backstop — red means not done.                               |
| E2E             | Playwright                                             | Tests the built site users get, not a mock.                            |
| Tooling access  | Project-scoped MCP (Playwright + GitHub)               | Shared assistive tooling, no per-machine setup.                        |
| Hosting         | Vercel                                                 | Built for Next.js; zero-config, previews, edge — no ops.               |
| Domain          | subodhpokhrel.com                                      | The brand; everything else is wiring.                                  |

> Related discipline: `docs/ARCHITECTURE.md` (where files live),
> `docs/UI_DISCIPLINE.md` (how visuals are built),
> `docs/CONTENT_STYLE.md` (how copy is written),
> `docs/COMPLIANCE.md` (the gates), and the root `CLAUDE.md` (the working
> agreement). A choice in this file that breaks one of those isn't done.
