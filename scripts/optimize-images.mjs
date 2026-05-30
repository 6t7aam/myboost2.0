import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const DIRS = [
  path.join(ROOT, "public", "service-images"),
  path.join(ROOT, "public", "images"),
];

const MAX_WIDTH = 800;
const WEBP_QUALITY = 80;
const SRC_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (SRC_EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const fmt = (b) => `${(b / 1024).toFixed(0)}KB`;

let totalBefore = 0;
let totalAfter = 0;
const files = DIRS.flatMap(walk);

for (const file of files) {
  const before = fs.statSync(file).size;
  const ext = path.extname(file).toLowerCase();
  const out = file.slice(0, -ext.length) + ".webp";

  const input = fs.readFileSync(file); // read fully first (safe for in-place .webp)
  const buf = await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toBuffer();

  fs.writeFileSync(out, buf);
  if (ext !== ".webp") fs.rmSync(file); // remove the heavy png/jpg original

  const after = buf.length;
  totalBefore += before;
  totalAfter += after;
  console.log(`${path.relative(ROOT, file).padEnd(52)} ${fmt(before).padStart(8)} -> ${fmt(after).padStart(8)}  (${out !== file ? "→webp" : "in-place"})`);
}

console.log("-".repeat(80));
console.log(`Files: ${files.length}   Total: ${fmt(totalBefore)} -> ${fmt(totalAfter)}  (saved ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
