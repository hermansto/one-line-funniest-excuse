import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single funniest excuse, exactly as submitted — one line, 88 chars
// (90 bytes in UTF-8, because the em dash is 3 bytes).
// Guard the length and the single-line shape up front, so a stray edit
// can never silently ship a two-line or over-long entry.
const line =
  "I didn't fail the task — I successfully discovered 47 ways not to do it. You're welcome.";
if (line.length !== 88 || line.includes("\n")) {
  throw new Error(`expected an 88-character single line, got ${line.length} chars`);
}

// The grader mounts the repo read-only, so the only writable place is
// the output directory it provides through the environment.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line + "\n", "utf8");

// Read it back and refuse to pass silently if anything drifted.
const written = readFileSync(outPath, "utf8");
if (written !== line + "\n") {
  throw new Error("entry.txt does not match the expected line");
}
console.log(`Wrote ${written.trim().length} characters to ${outPath}`);
