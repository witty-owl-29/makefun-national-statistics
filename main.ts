// NusaData — entry builder for make.fun's "Make the best national
// statistics site" bounty.
//
// Copies the site (app/) and its screenshots (screenshots/) from this
// repository into the output directory and writes dossier.json with
// buildDossier from vendor/makefun-frontend.ts. Node 22+, stdlib only,
// no build step. Run:
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The output directory defaults to /output when the variable is unset.

import { buildDossier } from "./vendor/makefun-frontend.ts";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname);
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

// Start from an empty directory so stale files can never leak in.
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const dir of ["app", "screenshots"]) {
  const src = join(repoRoot, dir);
  if (!existsSync(src)) throw new Error(`main.ts: missing ${dir}/ in ${repoRoot}`);
  cpSync(src, join(outDir, dir), { recursive: true });
}

writeFileSync(join(outDir, "dossier.json"), buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
}));

console.log(`NusaData entry written to ${outDir}`);
