export default {
  "*.{ts,tsx,js,jsx,mjs}": ["eslint --fix", "prettier --write", "node scripts/check-file-size.mjs"],
  "*.{json,css,md,yml,yaml}": ["prettier --write"],
};
