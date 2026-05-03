import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseTemplate = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8');

const pages = [
  {
    path: 'game/arena-breakout/warlord-tournament',
    title: 'Warlord Tournament Boost – Arena Breakout: Infinite | MyBoost',
    description: 'Buy Warlord Tournament boost in Arena Breakout: Infinite. Rank up fast from Recruit to Warlord, boost Warlord stars, and start instantly.',
    canonical: 'https://www.myboost.top/game/arena-breakout/warlord-tournament'
  },
  {
    path: 'game/arena-breakout/koens-farming',
    title: 'Arena Breakout: Infinite Koens Farming - MyBoost',
    description: 'Buy Arena Breakout: Infinite Koens farming service. Professional boosters deliver 1M-500M Koens in 1-2 hours. Secure, affordable, VPN protected. 600+ orders, 4.9★ rating.',
    canonical: 'https://www.myboost.top/game/arena-breakout/koens-farming'
  },
  {
    path: 'game/arena-breakout/raids-boost',
    title: 'Arena Breakout: Infinite Raids Boost - MyBoost',
    description: 'Arena Breakout: Infinite raids boost on all maps. Expert Lockdown & Forbidden mode carries with VIP extraction. 30-60 min per raid, guaranteed loot. Safe & professional service.',
    canonical: 'https://www.myboost.top/game/arena-breakout/raids-boost'
  },
  {
    path: 'game/arena-breakout/titanium-case',
    title: 'Arena Breakout: Infinite Titanium 3x3 Case - MyBoost',
    description: 'Get Arena Breakout: Infinite Titanium 3x3 Case with guaranteed top-tier loot. Premium weapons, rare attachments, high-tier armor. $99.99, delivered in 24-48 hours. Safe & secure.',
    canonical: 'https://www.myboost.top/game/arena-breakout/titanium-case'
  },
  {
    path: 'game/arena-breakout/coaching',
    title: 'Arena Breakout: Infinite Coaching - MyBoost',
    description: 'Arena Breakout: Infinite coaching by top players. Learn maps, rotations, PvP tactics, loot routes. Personalized 1-on-1 sessions from $8.50/hour. Improve fast with expert guidance.',
    canonical: 'https://www.myboost.top/game/arena-breakout/coaching'
  },
  {
    path: 'game/arena-breakout/rent-a-booster',
    title: 'Arena Breakout: Infinite Rent a Booster - MyBoost',
    description: 'Rent a booster for Arena Breakout: Infinite. Play alongside elite players in raids with real-time guidance. Instant start, $8.50/hour. Safe, fun, and effective boosting service.',
    canonical: 'https://www.myboost.top/game/arena-breakout/rent-a-booster'
  },
  {
    path: 'game/cs2',
    title: 'CS2 Boosting Services - ELO Boost, Premier Rank & Coaching',
    description: 'Professional CS2 boosting services. ELO boost, Premier rank boosting, coaching, and more. 2,400+ orders, 4.9★ rating. Fast, safe, and affordable CS2 boost.',
    canonical: 'https://www.myboost.top/game/cs2'
  },
  {
    path: 'game/dota-2',
    title: 'Dota 2 Boosting Services - MMR Boost, LP Removal & Tokens',
    description: 'Professional Dota 2 boosting by Immortal players. MMR boost, Low Priority removal, rank tokens farming. 1,800+ orders, 4.8★ rating. Safe and fast delivery.',
    canonical: 'https://www.myboost.top/game/dota-2'
  },
  {
    path: 'game/rust',
    title: 'Rust Boosting Services - Base Building, Raids & Resource Farming',
    description: 'Professional Rust services. Expert base building, raid assistance, resource farming, and coaching. 900+ orders completed. Dominate your server with our help.',
    canonical: 'https://www.myboost.top/game/rust'
  }
];

pages.forEach(page => {
  let html = baseTemplate;

  // Replace title (with multiline support)
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${page.title}</title>`
  );

  // Replace meta name="title"
  html = html.replace(
    /<meta name="title" content="[^"]*"\s*\/>/g,
    `<meta name="title" content="${page.title}" />`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/g,
    `<meta name="description" content="${page.description}" />`
  );

  // Replace canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/g,
    `<link rel="canonical" href="${page.canonical}" />`
  );

  // Update OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/g,
    `<meta property="og:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/g,
    `<meta property="og:description" content="${page.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/g,
    `<meta property="og:url" content="${page.canonical}" />`
  );

  // Update Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/g,
    `<meta name="twitter:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/g,
    `<meta name="twitter:description" content="${page.description}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"\s*\/>/g,
    `<meta name="twitter:url" content="${page.canonical}" />`
  );

  // Create directory structure
  const filePath = path.join(__dirname, '../dist', page.path, 'index.html');
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, html);
  console.log(`✓ Generated: ${page.path}/index.html`);
});

console.log('\n✓ All static pages generated successfully!');
