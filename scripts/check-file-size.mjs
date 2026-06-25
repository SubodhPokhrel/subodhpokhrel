// Fails if any tracked source file exceeds the hard line cap (docs/COMPLIANCE.md).
// Usage: node scripts/check-file-size.mjs [files...]  (files optional; defaults to all tracked)
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const MAX = 1000;
const EXT = /\.(ts|tsx|js|jsx|mjs|css)$/;

function listFiles() {
  const args = process.argv.slice(2).filter((f) => EXT.test(f));
  if (args.length) return args;
  try {
    return execSync("git ls-files", { encoding: "utf8" })
      .split("\n")
      .map((s) => s.trim())
      .filter((f) => f && EXT.test(f) && !f.startsWith("node_modules/"));
  } catch {
    return [];
  }
}

const violations = [];
for (const file of listFiles()) {
  try {
    const count = readFileSync(file, "utf8").split("\n").length;
    if (count > MAX) violations.push({ file, count });
  } catch {
    // deleted / unreadable — skip
  }
}

if (violations.length) {
  console.error(`\n✗ ${violations.length} file(s) exceed ${MAX} lines:`);
  for (const v of violations) console.error(`  ${v.file} — ${v.count} lines`);
  process.exit(1);
}
console.log(`✓ No file exceeds ${MAX} lines.`);
