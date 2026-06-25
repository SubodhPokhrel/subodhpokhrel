import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    name: "portfolio/guardrails",
    rules: {
      // Hard structural guardrail — see docs/COMPLIANCE.md.
      "max-lines": ["error", { max: 1000, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["warn", { max: 200, skipBlankLines: true, skipComments: true }],
      complexity: ["warn", 16],
      // SSR-safe client-detection hooks (mount/theme/media) intentionally set
      // state in an effect to avoid hydration mismatches — surface, don't fail.
      "react-hooks/set-state-in-effect": "warn",
      // Brand names are banned in code/copy — the accent is "aurora".
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/Apple|SF Pro|San Francisco font/]",
          message:
            "No brand names in code or copy — the accent is 'aurora'. See docs/UI_DISCIPLINE.md.",
        },
      ],
    },
  },
  {
    name: "portfolio/scripts",
    files: ["scripts/**", "*.config.*", "*.mjs"],
    // These files define the brand-name ban, so they contain the terms by design.
    rules: { "max-lines-per-function": "off", "no-restricted-syntax": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "playwright-report/**"]),
]);

export default eslintConfig;
