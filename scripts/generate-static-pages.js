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
    title: 'Koens Farming – Arena Breakout: Infinite | MyBoost',
    description: 'Buy Koens farming in Arena Breakout: Infinite. Get rich fast with safe and efficient currency farming service.',
    canonical: 'https://www.myboost.top/game/arena-breakout/koens-farming'
  },
  {
    path: 'game/arena-breakout/raids-boost',
    title: 'Raids Boost – Arena Breakout: Infinite | MyBoost',
    description: 'Buy Raids boost in Arena Breakout: Infinite. Complete raids faster, get better loot and improve your gameplay.',
    canonical: 'https://www.myboost.top/game/arena-breakout/raids-boost'
  },
  {
    path: 'game/arena-breakout/titanium-case',
    title: 'Titanium Case – Arena Breakout: Infinite | MyBoost',
    description: 'Get Titanium Case in Arena Breakout: Infinite quickly and safely. Secure your best loot with our service.',
    canonical: 'https://www.myboost.top/game/arena-breakout/titanium-case'
  },
  {
    path: 'game/arena-breakout/coaching',
    title: 'Coaching – Arena Breakout: Infinite | MyBoost',
    description: 'Improve your skills in Arena Breakout: Infinite with professional coaching. Learn strategies, positioning and tactics.',
    canonical: 'https://www.myboost.top/game/arena-breakout/coaching'
  },
  {
    path: 'game/arena-breakout/rent-a-booster',
    title: 'Rent a Booster – Arena Breakout: Infinite | MyBoost',
    description: 'Rent a professional booster for Arena Breakout: Infinite. Play together and win more raids with expert help.',
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
