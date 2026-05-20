// One-off uniqueness checker for src/data/dota2PageSEO.ts.
// Run: `node scripts/check-dota2-seo-uniqueness.js`.
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(
  path.join(__dirname, "..", "src", "data", "dota2PageSEO.ts"),
  "utf8",
);

const fields = [
  "title",
  "description",
  "keywords",
  "canonicalUrl",
  "ogImage",
  "ogTitle",
  "ogDescription",
  "twitterTitle",
  "twitterDescription",
];

let totalDupes = 0;
for (const field of fields) {
  // Match `field:` followed by a "string", a `template`, OR an `img("...")` call.
  const rx = new RegExp(
    `${field}:\\s*(?:"([^"]+)"|\`([^\`]+)\`|img\\("([^"]+)"\\))`,
    "g",
  );
  const seen = new Set();
  const dupes = [];
  let m;
  while ((m = rx.exec(src)) !== null) {
    const value = m[1] ?? m[2] ?? m[3];
    if (!value) continue;
    if (seen.has(value)) dupes.push(value);
    seen.add(value);
  }
  totalDupes += dupes.length;
  const label = field.padEnd(22, " ");
  const status = dupes.length === 0 ? "OK " : "DUP";
  console.log(`${status} ${label} count=${seen.size} dupes=${dupes.length}`);
  for (const d of dupes) console.log(`     -> ${d}`);
}

if (totalDupes === 0) {
  console.log("\nAll 8 Dota 2 SEO fields are unique. ✓");
  process.exit(0);
} else {
  console.error(`\n${totalDupes} duplicate value(s) found.`);
  process.exit(1);
}
