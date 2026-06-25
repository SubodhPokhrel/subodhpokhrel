# COMPLIANCE — gates & pre-merge checklist

The hard guardrails and how they're enforced. If a rule here isn't satisfied,
the change isn't done.

## Enforced automatically

| Gate                       | Rule                                 | Enforced by                                                          |
| -------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| File size                  | ≤ 1000 lines per source file         | ESLint `max-lines` + `scripts/check-file-size.mjs` (pre-commit + CI) |
| Function size / complexity | warn > ~120 lines / complexity 12    | ESLint `max-lines-per-function`, `complexity`                        |
| No brand names             | banned literals in code/comments     | ESLint `no-restricted-syntax`                                        |
| Types                      | strict, no `any`, no unchecked index | `tsc --noEmit`, `@typescript-eslint`                                 |
| Formatting                 | Prettier + Tailwind class order      | `prettier --check` (pre-commit + CI)                                 |
| Self-hosted fonts          | no third-party font CDN              | review + `next/font/local` only                                      |
| Build                      | production build succeeds            | CI                                                                   |
| E2E                        | Playwright smoke green               | CI                                                                   |

Local one-shot: `pnpm verify` runs typecheck + lint + format:check + file-size +
build. Pre-commit runs the staged subset via Husky + lint-staged.

## Pre-merge checklist (manual)

- [ ] Reads first: change honors `UI_DISCIPLINE.md` / `CONTENT_STYLE.md` / `ARCHITECTURE.md`.
- [ ] **Tokens only** — no raw hex/px-font/duration literals in components.
- [ ] **No brand names** in code, comments, or copy.
- [ ] New files in the right folder (see ARCHITECTURE) with named export + barrel.
- [ ] Accessible: keyboard + visible focus + `prefers-reduced-motion` respected + AA contrast.
- [ ] Responsive: no overflow at 320 / 375 / 768 / 1024 / 1440.
- [ ] No file over 1000 lines (`pnpm check:file-size`).
- [ ] `pnpm verify` and `pnpm test` pass.
- [ ] Placeholder content is flagged, not silently shipped.
- [ ] Linked to its GitHub issue (`#n`).

## Adding a new guardrail

1. Encode it in `eslint.config.mjs` and/or `scripts/`.
2. Document it in the table above and in `UI_DISCIPLINE.md`/`CONTENT_STYLE.md`.
3. Wire it into pre-commit and CI so it can't be bypassed.
