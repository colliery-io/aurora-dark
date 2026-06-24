// Concatenate the full Aurora Dark stylesheet: IBM Plex @font-face rules +
// Mantine 7's component styles + the Aurora token layer, into one self-contained
// dist/aurora.css that consumers (and the design-sync converter's cssEntry) load.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const fonts = read("src/fonts.css");
const mantine = read("node_modules/@mantine/core/styles.css");
const tokens = read("src/theme.css");

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(
  join(root, "dist/aurora.css"),
  `/* @colliery-io/aurora-dark — full stylesheet (fonts + Mantine + Aurora tokens) */\n${fonts}\n${mantine}\n${tokens}`,
);
console.log("wrote dist/aurora.css");
