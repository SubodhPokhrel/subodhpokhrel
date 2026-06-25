## Summary

<!-- What changed and why. -->

Closes #

## Compliance checklist (docs/COMPLIANCE.md)

- [ ] Composed from `src/components/primitives` — no hand-rolled primitives
- [ ] Tokens only — no raw hex / px font-size / ad-hoc duration in components
- [ ] No brand names in code or copy
- [ ] Accessible — keyboard, visible focus, `prefers-reduced-motion`, AA contrast
- [ ] Responsive at 375 and 1440
- [ ] `pnpm verify` and `pnpm test` pass
- [ ] Playwright visual gate — screenshots clean in light & dark
- [ ] Storybook specimen added for any new primitive/variant
