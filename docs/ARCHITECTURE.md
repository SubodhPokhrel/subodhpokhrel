# ARCHITECTURE

How the codebase is organized and where each kind of file belongs. The goal is
that anyone can answer "where is the landing page?" and "where are the
functions?" in seconds.

## Top-level

```
subodhpokhrel/
├─ src/
│  ├─ app/            # Next.js App Router — ROUTING ONLY (thin files)
│  ├─ views/          # full-page compositions ("the pages")
│  ├─ components/     # all reusable UI
│  │  ├─ primitives/  # design-system atoms (Button, Panel, Container, …)
│  │  ├─ layout/      # Header, Nav, MobileMenu, Footer, ThemeToggle, Logo
│  │  ├─ sections/    # page sections (Hero, About, Skills, WorkGrid, …)
│  │  ├─ visual/      # aurora canvas + fallback + glow
│  │  └─ motion/      # motion wrappers (Reveal, Parallax, Tilt, Stagger)
│  ├─ content/        # typed data (no JSX): profile, projects, skills, …
│  ├─ lib/            # pure functions & config: cn, utils, env, email, seo
│  ├─ hooks/          # React hooks
│  ├─ types/          # shared TypeScript types
│  └─ fonts/          # self-hosted .woff2 (loaded via next/font/local)
├─ docs/              # discipline layer (this folder)
├─ tests/e2e/         # Playwright specs
├─ scripts/           # repo scripts (file-size guardrail)
├─ public/            # static assets (images, og, favicon)
└─ .github/           # CI workflow + templates
```

> **Why `views/` and not `pages/`?** In the App Router, a folder named `pages/`
> is reserved (it triggers the legacy Pages Router and conflicts with `app/`).
> `views/` is the safe, conventional home for page-level compositions.

## The routing → view → sections flow

Routing is intentionally thin. A route file does almost nothing except render a
view:

```
src/app/page.tsx          →  renders <HomeView/>
src/app/about/page.tsx    →  renders <AboutView/>
src/app/work/page.tsx     →  renders <WorkView/>
src/app/contact/page.tsx  →  renders <ContactView/>
```

A **view** (`src/views/*`) composes **sections** (`src/components/sections/*`),
which compose **primitives** (`src/components/primitives/*`), which consume
**tokens** (`src/app/globals.css`). Data comes from `src/content/*`.

```
app (route)  →  views  →  sections  →  primitives  →  tokens
                                   ↘  content (data)
```

## Rules of placement

| If you're adding…                      | Put it in…                          |
| -------------------------------------- | ----------------------------------- |
| a new URL                              | `src/app/<segment>/page.tsx` (thin) |
| a full page's layout/composition       | `src/views/`                        |
| a reusable atom (button, badge, input) | `src/components/primitives/`        |
| a page section (hero, skills, contact) | `src/components/sections/`          |
| header/footer/nav/theme-toggle         | `src/components/layout/`            |
| aurora / WebGL / glow                  | `src/components/visual/`            |
| a scroll/parallax/reveal wrapper       | `src/components/motion/`            |
| editable text or lists of data         | `src/content/`                      |
| a pure helper or server config         | `src/lib/`                          |
| a React hook                           | `src/hooks/`                        |
| a shared type/interface                | `src/types/`                        |

## Conventions

- **Imports** use the `@/*` alias (→ `src/`). No deep `../../..` chains.
- **Exports** are named (`export function Button`), with a per-folder `index.ts`
  barrel re-exporting the public surface.
- **Client vs server:** default to server components. Add `"use client"` only
  when a file needs state, effects, events, or browser APIs.
- **`src/lib/env.ts` is server-only** — never import it into a client component.
- **File size:** split a component once it nears ~250 lines; hard cap 1000.
