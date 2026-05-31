import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const stripManagedHeadTags = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta[^>]+name="title"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name="keywords"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name="robots"[^>]*>\s*/gi, "")
    .replace(/<link[^>]+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]+property="og:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta[^>]+name="twitter:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, "");

const writePage = (html, routePath) => {
  const normalizedPath = routePath === "/" ? "" : routePath.replace(/^\/+/, "");
  const targetDir = path.join(distDir, normalizedPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf-8");
};

const writeSitemap = (paths, siteUrl) => {
  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (routePath) => `  <url>
    <loc>${escapeXml(`${siteUrl}${routePath}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${routePath === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${
      routePath === "/"
        ? "1.0"
        : routePath.includes("boosting") || routePath.includes("arena-breakout-")
          ? "0.9"
          : "0.8"
    }</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), xml, "utf-8");
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml, "utf-8");
};

const main = async () => {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Build template not found at ${templatePath}`);
  }

  const vite = await createServer({
    root: rootDir,
    appType: "custom",
    server: {
      middlewareMode: true,
    },
  });

  try {
    const [{ render }, routesModule, siteConfigModule] = await Promise.all([
      vite.ssrLoadModule("/src/entry-server.tsx"),
      vite.ssrLoadModule("/src/lib/prerenderRoutes.ts"),
      vite.ssrLoadModule("/src/lib/siteConfig.ts"),
    ]);

    const template = fs.readFileSync(templatePath, "utf-8");
    const cleanTemplate = stripManagedHeadTags(template);
    const helmetKey = "helmet";
    const routes = [...new Set(routesModule.PRERENDER_PATHS)];

    for (const routePath of routes) {
      const { appHtml, helmetContext } = render(routePath);
      const helmet = helmetContext[helmetKey];
      const head = [
        helmet?.title?.toString?.() ?? "",
        helmet?.meta?.toString?.() ?? "",
        helmet?.link?.toString?.() ?? "",
        helmet?.script?.toString?.() ?? "",
      ].join("");

      const html = cleanTemplate
        .replace("</head>", `${head}</head>`)
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      writePage(html, routePath);
      console.log(`Generated prerendered HTML: ${routePath}`);
    }

    writeSitemap(routesModule.CANONICAL_SITEMAP_PATHS, siteConfigModule.SITE_URL);
    console.log("Updated sitemap.xml");
  } finally {
    await vite.close();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
