// UI-discipline audit (docs/UI_DISCIPLINE.md §13). Heuristic — reports likely
// violations for review. Run: pnpm follow:audit
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src";

const RULES = [
  {
    desc: "brand-name literal",
    ext: /\.(ts|tsx|css)$/,
    test: /\b(Apple|SF Pro|San Francisco font)\b/,
  },
  {
    desc: "raw hex in className",
    ext: /\.tsx$/,
    test: /className=["'`][^"'`]*#[0-9a-fA-F]{6}/,
  },
  {
    desc: "child margin (parents own spacing)",
    ext: /\.tsx$/,
    test: /className=["'`][^"'`]*\b-?m[trblxy]?-(?:\d|\[)/,
  },
  {
    desc: "arbitrary spacing value",
    ext: /\.tsx$/,
    test: /className=["'`][^"'`]*\b(?:gap|p[trblxy]?|space-[xy])-\[/,
  },
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const findings = [];
for (const file of walk(ROOT)) {
  const applicable = RULES.filter((r) => r.ext.test(file));
  if (!applicable.length) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const rule of applicable) {
      if (rule.test.test(line)) {
        findings.push({ file, line: i + 1, rule: rule.desc, text: line.trim().slice(0, 100) });
      }
    }
  });
}

if (findings.length) {
  console.error(`\n✗ follow:audit found ${findings.length} possible violation(s):\n`);
  for (const f of findings) console.error(`  ${f.file}:${f.line}  [${f.rule}]\n    ${f.text}`);
  console.error("\nReview each against docs/UI_DISCIPLINE.md, then fix or justify.\n");
  process.exit(1);
}
console.log("✓ follow:audit clean — no discipline violations detected.");
