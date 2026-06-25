# Subodh Pokhrel — Portfolio

A premium, black-and-white personal portfolio with a single iridescent **aurora**
accent. Built for clarity, speed, and craft — refined typography, frosted
"window" panels, and tasteful motion.

**Live:** https://subodhpokhrel.com · **Design system:** `/storybook`

---

## Read these before writing code

- [CLAUDE.md](CLAUDE.md) — the working agreement. Read it every session.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — where every kind of file lives.
- [docs/UI_DISCIPLINE.md](docs/UI_DISCIPLINE.md) — how the UI stays clean.
- [docs/DESIGN_LANGUAGE.md](docs/DESIGN_LANGUAGE.md) — what it looks like.
- [docs/TECH_STACK.md](docs/TECH_STACK.md) — every stack decision and the reasoning.
- [docs/COMPLIANCE.md](docs/COMPLIANCE.md) — the gates. Not optional.
- [docs/CONTENT_STYLE.md](docs/CONTENT_STYLE.md) — how copy is written.

## The stack in one breath

TypeScript (strict) in a single **Next.js 16** App Router app. **React 19**,
**Tailwind CSS v4** (CSS-first design tokens), **Framer Motion**, a hand-written
**WebGL aurora shader** (lazy-loaded, with a CSS fallback), and **self-hosted**
Inter + JetBrains Mono. The contact form posts to a serverless route (Resend +
Zod) with a graceful `mailto:` fallback. Deployed on **Vercel**. See
[docs/TECH_STACK.md](docs/TECH_STACK.md).

## Getting started

Prerequisites: **Node 24+** and **pnpm 11+**.

```bash
pnpm install
pnpm dev        # http://localhost:3600
```

The **living gallery** — every primitive in its variants and states — is at
[http://localhost:3600/storybook](http://localhost:3600/storybook).

### Environment (optional)

Copy `.env.example` to `.env.local`. Without `RESEND_API_KEY` + `CONTACT_TO_EMAIL`
the contact form gracefully falls back to `mailto:`.

## Layout

```
src/app/         routing only (App Router) — thin route files
src/views/       full-page compositions ("the pages")
src/components/  primitives · layout · sections · visual · motion
src/content/     typed data (profile, projects, skills, socials, experience)
src/lib/         pure functions & server config (cn, utils, env, email, seo)
src/hooks/       React hooks
src/types/       shared types
src/fonts/       self-hosted .woff2
docs/            the discipline layer
tests/e2e/       Playwright specs
```

## Scripts

| Command                | What it does                                     |
| ---------------------- | ------------------------------------------------ |
| `pnpm dev`             | Local dev server on `:3600`                      |
| `pnpm build` / `start` | Production build / serve                         |
| `pnpm lint`            | ESLint (incl. `max-lines` 1000 + brand-name ban) |
| `pnpm typecheck`       | `tsc --noEmit`                                   |
| `pnpm format`          | Prettier (with Tailwind class sorting)           |
| `pnpm check:file-size` | Fail if any file exceeds 1000 lines              |
| `pnpm follow:audit`    | UI-discipline audit                              |
| `pnpm test`            | Playwright e2e                                   |
| `pnpm verify`          | typecheck + lint + format + file-size + build    |

## Quality gates

`pnpm verify` and `pnpm test` must pass before a PR. A Husky + lint-staged
pre-commit runs the staged subset; GitHub Actions runs the full suite. Before
pushing, also run `pnpm follow:audit`. Work is tracked on **Project #1**.

## Deploy

Connect the repo to Vercel, add the env vars from `.env.example`, and point the
custom domain. The build is fully static/SSG except the contact route.

## Status

Foundation and full v1 site: builds, typechecks, and lints clean. Hero, about,
work (with per-project case studies), skills, experience, contact, and the
design-system gallery are live. Placeholder copy is clearly flagged in
`src/content/*` for replacement with final wording.
