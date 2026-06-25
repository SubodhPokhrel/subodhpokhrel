# CLAUDE.md — Working agreement for this repository

> **Read this first, every time.** Before writing or changing any code, text, or
> config, consult the discipline docs below. They are the source of truth — not
> habit, not the first idea. If a change would violate one, stop and reconcile.

## What this is

The personal portfolio of **Subodh Pokhrel** — UI/UX & graphics designer and
developer. Aesthetic: **black-and-white** with a single **iridescent aurora**
gradient accent; **premium** typography, spacing, and motion. Fast,
responsive, accessible.

## The discipline (read in this order)

1. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — where every kind of file lives and why.
2. [`docs/UI_DISCIPLINE.md`](docs/UI_DISCIPLINE.md) — how anything visual must be built (tokens, type, motion, a11y).
3. [`docs/CONTENT_STYLE.md`](docs/CONTENT_STYLE.md) — how any copy ("text type") must be written.
4. [`docs/COMPLIANCE.md`](docs/COMPLIANCE.md) — the hard gates and the pre-merge checklist.

## Hard rules (non-negotiable — enforced by tooling)

- **≤ 1000 lines per file.** Aim for ≤ 250. Split before you sprawl. (ESLint `max-lines` + `scripts/check-file-size.mjs`.)
- **Tokens only.** No raw hex, px font-sizes, or ad-hoc durations in components. Use the `text-*` scale, semantic colors (`bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`), radii, and easings from `globals.css`.
- **No brand names** in code, comments, or copy (no "Apple", "Apple Intelligence", "SF Pro", etc.). The accent is "aurora". (ESLint `no-restricted-syntax`.)
- **Self-hosted fonts only.** No third-party font CDN. (`next/font/local` from `src/fonts/`.)
- **One component per file**, named export, per-folder barrel (`index.ts`). Pages/views compose; they don't define primitives.
- **Accessibility is not optional.** Keyboard reachable, visible focus, honors `prefers-reduced-motion`, AA contrast.
- **TypeScript strict.** No `any`. No unchecked index access.

## Project structure (summary — full map in ARCHITECTURE.md)

```
src/app/         routing only (App Router); thin route files
src/views/       full-page compositions ("the pages") — the landing page lives here
src/components/  primitives · layout · sections · visual · motion
src/content/     typed data (profile, projects, skills, socials, experience)
src/lib/         pure functions & config (cn, utils, env, email, seo)
src/hooks/       React hooks
src/types/       shared types
src/fonts/       self-hosted .woff2
docs/            this discipline layer
```

## Commands

```bash
pnpm dev               # local dev (http://localhost:3000)
pnpm build             # production build
pnpm lint              # eslint (incl. max-lines + brand-name ban)
pnpm typecheck         # tsc --noEmit
pnpm format            # prettier --write
pnpm check:file-size   # fail if any file > 1000 lines
pnpm test              # Playwright e2e
pnpm verify            # typecheck + lint + format:check + file-size + build
```

## Workflow

- Work on a branch; reference the GitHub issue (`#n`, Project #1) in commits.
- Before opening a PR, run `pnpm verify` and `pnpm test` — both must be green.
- Keep PRs scoped to one issue where possible.
