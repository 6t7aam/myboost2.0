/**
 * Full prerender pipeline (replaces the old head-only generate-static-pages.js).
 *
 * Why: the app is a client-only Vite SPA, so search engines received an empty
 * <body> and — for any route without a generated file — the homepage's title +
 * canonical. This script boots `vite preview` against the built `dist/`, drives a
 * real browser (Playwright Chromium) to render every indexable route, and writes
 * the fully-rendered HTML (body + Helmet head + JSON-LD) to `dist/<route>/index.html`.
 *
 * Routes are discovered by crawling the app's own internal links starting from the
 * home page and the game hubs — so the route list stays in sync with the site
 * automatically (single source of truth = the links the app actually renders).
 *
 * It also regenerates sitemap.xml from the discovered set (no dead URLs).
 */
import { spawn } from "node:child_process";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import net from "node:net";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const BASE_URL = "https://www.myboost.top";
const PORT = 5123;
const ORIGIN = `http://localhost:${PORT}`;

// Routes that must never be indexed/prerendered (auth, checkout, account, admin).
const EXCLUDE_PREFIXES = [
  "/login", "/signup", "/reset-password", "/account",
  "/cart", "/order", "/orders", "/my-orders", "/chat",
  "/admin", "/choose-booster",
];

// Seeds: home + hubs + legal pages guarantee the crawler reaches every service
// grid even if some links are not present on the home page.
const SEEDS = [
  "/",
  "/game/arena-breakout",
  "/game/cs2",
  "/game/dota-2",
  "/game/rust",
  "/terms",
  "/privacy",
  "/refund",
];

const isIndexable = (pathname) => {
  if (!pathname.startsWith("/")) return false;
  if (pathname.includes("#") || pathname.includes("?")) return false;
  if (/\.[a-z0-9]+$/i.test(pathname)) return false; // has a file extension
  return !EXCLUDE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
};

const waitForServer = (port, timeoutMs = 30000) =>
  new Promise((resolve, reject) => {
    const start = Date.now();
    const tryConnect = () => {
      const socket = net.connect(port, "localhost");
      socket.on("connect", () => { socket.end(); resolve(); });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - start > timeoutMs) reject(new Error("vite preview did not start"));
        else setTimeout(tryConnect, 300);
      });
    };
    tryConnect();
  });

async function loadChromium() {
  const { chromium } = await import("@playwright/test");
  try {
    const b = await chromium.launch({ args: ["--no-sandbox"] });
    return b;
  } catch (err) {
    // Browser binary missing (fresh CI / Vercel) — install once and retry.
    console.warn("Chromium launch failed, installing Playwright browser…");
    execSync("npx playwright install chromium", { stdio: "inherit" });
    return chromium.launch({ args: ["--no-sandbox"] });
  }
}

/**
 * react-helmet-async injects its managed tags (marked data-rh="true") in addition
 * to the static SEO tags baked into index.html, producing duplicate canonical /
 * og / description tags (the static ones still point at the homepage). Remove each
 * static tag when a Helmet-managed equivalent exists, so every page has exactly
 * one self-referencing canonical and one of each meta.
 */
function dedupeHead(html) {
  const strip = (staticRe, dataRhRe) => {
    if (dataRhRe.test(html)) html = html.replace(staticRe, "");
  };
  strip(
    /<link rel="canonical"(?![^>]*data-rh)[^>]*>\s*/g,
    /<link rel="canonical"[^>]*data-rh="true"[^>]*>/
  );
  for (const name of ["title", "description", "keywords"]) {
    strip(
      new RegExp(`<meta name="${name}"(?![^>]*data-rh)[^>]*>\\s*`, "g"),
      new RegExp(`<meta name="${name}"[^>]*data-rh="true"[^>]*>`)
    );
  }
  for (const prop of ["og:type", "og:url", "og:title", "og:description", "og:image", "og:site_name"]) {
    strip(
      new RegExp(`<meta property="${prop}"(?![^>]*data-rh)[^>]*>\\s*`, "g"),
      new RegExp(`<meta property="${prop}"[^>]*data-rh="true"[^>]*>`)
    );
  }
  for (const name of ["twitter:card", "twitter:url", "twitter:title", "twitter:description", "twitter:image"]) {
    strip(
      new RegExp(`<meta name="${name}"(?![^>]*data-rh)[^>]*>\\s*`, "g"),
      new RegExp(`<meta name="${name}"[^>]*data-rh="true"[^>]*>`)
    );
  }
  return html;
}

const distFileFor = (pathname) => {
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  return clean === ""
    ? path.join(DIST, "index.html")
    : path.join(DIST, clean, "index.html");
};

async function main() {
  if (process.env.SKIP_PRERENDER === "1") {
    console.log("SKIP_PRERENDER=1 — skipping prerender (SPA-only build).");
    return;
  }
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    throw new Error("dist/index.html not found — run `vite build` first.");
  }

  // 1) Serve the built app with SPA fallback.
  const preview = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--strictPort"],
    { cwd: ROOT, stdio: "inherit", shell: true }
  );
  const cleanup = () => { try { preview.kill(); } catch {} };
  process.on("exit", cleanup);

  try {
    await waitForServer(PORT);
    const browser = await loadChromium();
    const page = await browser.newPage();

    // 2) BFS crawl to discover every indexable route from the app's own links.
    const discovered = new Set();
    const queue = [...SEEDS];
    const seen = new Set(SEEDS);

    while (queue.length) {
      const route = queue.shift();
      const url = ORIGIN + route;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      } catch {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      }
      if (isIndexable(route)) discovered.add(route);

      const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
      for (const href of hrefs) {
        if (!href || !href.startsWith("/")) continue;
        const clean = href.split("#")[0].split("?")[0].replace(/\/+$/, "") || "/";
        if (!seen.has(clean) && isIndexable(clean)) {
          seen.add(clean);
          queue.push(clean);
        }
      }
    }

    const routes = [...discovered].sort();
    console.log(`Discovered ${routes.length} indexable routes.`);

    // 3) Render each route and write static HTML. Use a fresh tab per route so
    // no SPA state (e.g. a previous page's <title>) can bleed across renders.
    for (const route of routes) {
      const url = ORIGIN + route;
      const rp = await browser.newPage();
      try {
        try {
          await rp.goto(url, { waitUntil: "networkidle", timeout: 45000 });
        } catch {
          await rp.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
        }
        // Wait for the app to mount and Helmet to apply head tags.
        await rp.waitForFunction(
          () => {
            const root = document.getElementById("root");
            return !!root && root.childElementCount > 0 && !!document.title;
          },
          { timeout: 20000 }
        ).catch(() => {});
        await rp.waitForTimeout(400);

        let html = await rp.content();
        // Normalise localhost origin if it leaked into any absolute URL.
        html = html.replaceAll(ORIGIN, BASE_URL);
        html = dedupeHead(html);

        const file = distFileFor(route);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
        console.log(`✓ ${route}`);
      } finally {
        await rp.close();
      }
    }

    await browser.close();

    // 4) Regenerate sitemap.xml from the discovered set.
    writeSitemap(routes);

    console.log(`\n✓ Prerendered ${routes.length} pages + sitemap.`);
  } finally {
    cleanup();
  }
}

function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const priorityFor = (r) => {
    if (r === "/") return "1.0";
    if (/^\/game\/[^/]+$/.test(r)) return "0.9"; // hub
    if (/^\/(terms|privacy|refund)$/.test(r)) return "0.3";
    return "0.8"; // service
  };
  const changefreqFor = (r) => (/^\/(terms|privacy|refund)$/.test(r) ? "monthly" : "weekly");

  const urls = routes
    .map((r) => {
      const loc = r === "/" ? `${BASE_URL}/` : `${BASE_URL}${r}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreqFor(r)}</changefreq>\n    <priority>${priorityFor(r)}</priority>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml);
  fs.writeFileSync(path.join(ROOT, "public", "sitemap.xml"), xml);
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
