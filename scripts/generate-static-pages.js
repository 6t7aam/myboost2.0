import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseTemplate = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8');

const pages = [
  {
    path: 'game/arena-breakout/koens-farming',
    title: 'ABI – Koens Farming – Arena Breakout: Infinite | MyBoost',
    description: 'Buy Koens farming in Arena Breakout: Infinite. Get rich fast with safe and efficient currency farming service.',
    canonical: 'https://www.myboost.top/game/arena-breakout/koens-farming'
  },
  {
    path: 'game/arena-breakout/raids-boost',
    title: 'ABI – Raids Boost – Arena Breakout: Infinite | MyBoost',
    description: 'Buy Raids boost in Arena Breakout: Infinite. Complete raids faster, get better loot and improve your gameplay.',
    canonical: 'https://www.myboost.top/game/arena-breakout/raids-boost'
  },
  {
    path: 'game/arena-breakout/titanium-case',
    title: 'ABI – Titanium Case – Arena Breakout: Infinite | MyBoost',
    description: 'Get Titanium Case in Arena Breakout: Infinite quickly and safely. Secure your best loot with our service.',
    canonical: 'https://www.myboost.top/game/arena-breakout/titanium-case'
  },
  {
    path: 'game/arena-breakout/coaching',
    title: 'ABI – Coaching – Arena Breakout: Infinite | MyBoost',
    description: 'Improve your skills in Arena Breakout: Infinite with professional coaching. Learn strategies, positioning and tactics.',
    canonical: 'https://www.myboost.top/game/arena-breakout/coaching'
  },
  {
    path: 'game/arena-breakout/rent-a-booster',
    title: 'ABI – Rent a Booster – Arena Breakout: Infinite | MyBoost',
    description: 'Rent a professional booster for Arena Breakout: Infinite. Play together and win more raids with expert help.',
    canonical: 'https://www.myboost.top/game/arena-breakout/rent-a-booster'
  },
  {
    path: 'game/dota-2/mmr-boost',
    title: 'Dota 2 MMR Boost - Fast Rank Up by Immortal Players | MyBoost',
    description: 'Buy Dota 2 MMR boost from top Immortal & Divine players. Safe, fast rank climbing with VPN protection. Solo or duo boosting available. Start in 15 minutes.',
    canonical: 'https://www.myboost.top/game/dota-2/mmr-boost'
  },
  {
    path: 'game/dota-2/lp-removal',
    title: 'Dota 2 Low Priority Removal - Fast LP Queue Exit | MyBoost',
    description: 'Remove Dota 2 Low Priority fast. Our boosters play your LP games professionally. Get out of LP queue in hours, not days. Safe method, no ban risk.',
    canonical: 'https://www.myboost.top/game/dota-2/lp-removal'
  },
  {
    path: 'game/dota-2/rank-tokens',
    title: 'Dota 2 Rank Tokens Farming - Fast Token Collection | MyBoost',
    description: 'Buy Dota 2 rank tokens farming service. Collect tokens fast with our Immortal players. Safe account handling, fast delivery, competitive prices. Start today.',
    canonical: 'https://www.myboost.top/game/dota-2/rank-tokens'
  },
  {
    path: 'game/cs2',
    title: 'CS2 Boosting Services - Premier, FACEIT, Ranks & Coaching',
    description: 'Professional CS2 boosting services. Premier rating, FACEIT wins & rank, ESEA, competitive & wingman ranks, coaching, and more. 2,400+ orders, 4.9★ rating. Fast, safe, and affordable CS2 boost.',
    canonical: 'https://www.myboost.top/game/cs2'
  },
  {
    path: 'game/cs2/premier-rating',
    title: 'CS2 Premier Rating Boost - Up to 21k ELO | MyBoost',
    description: 'Boost your CS2 Premier Rating with skilled players. Up to 21k ELO, many games with high KD, choose the number of pros. Fast and safe delivery.',
    canonical: 'https://www.myboost.top/game/cs2/premier-rating'
  },
  {
    path: 'game/cs2/rent-a-booster',
    title: 'CS2 Rent a Booster - Hourly Pro Session | MyBoost',
    description: 'Hire a professional CS2 booster for an hourly session. Any in-game activities, up to 4 professionals. Instant start, safe and reliable.',
    canonical: 'https://www.myboost.top/game/cs2/rent-a-booster'
  },
  {
    path: 'game/cs2/faceit-wins',
    title: 'CS2 FACEIT Wins Boost - High KD Performance | MyBoost',
    description: 'Get FACEIT wins fast with high KD performance. Up to 5 wins, all games with high KD, available for all levels. Fast and safe delivery.',
    canonical: 'https://www.myboost.top/game/cs2/faceit-wins'
  },
  {
    path: 'game/cs2/faceit-rank',
    title: 'CS2 FACEIT Rank Boost - ELO & Level | MyBoost',
    description: 'Boost your FACEIT level safely and quickly. Both ELO and level boost, many games with high KD, customizable offer. Fast and safe delivery.',
    canonical: 'https://www.myboost.top/game/cs2/faceit-rank'
  },
  {
    path: 'game/cs2/esea-rank',
    title: 'CS2 ESEA Rank Boost - Any Desired Rank | MyBoost',
    description: 'Reach your desired ESEA rank with experienced players. Any desired ESEA rank, many games with high KD, safe rank progression.',
    canonical: 'https://www.myboost.top/game/cs2/esea-rank'
  },
  {
    path: 'game/cs2/competitive-rank',
    title: 'CS2 Competitive Rank Boost - Silver to Global | MyBoost',
    description: 'Climb CS2 Competitive ranks fast and safely. From Silver to Global fast, many games with high KD, all maps available.',
    canonical: 'https://www.myboost.top/game/cs2/competitive-rank'
  },
  {
    path: 'game/cs2/wingman-rank',
    title: 'CS2 Wingman Rank Boost - Any Desired Rank | MyBoost',
    description: 'Boost your CS2 Wingman rank with reliable players. Any desired wingman rank, many games with high KD, add extra wins.',
    canonical: 'https://www.myboost.top/game/cs2/wingman-rank'
  },
  {
    path: 'game/cs2/placement-matches',
    title: 'CS2 Placement Matches - Unlock Competitive | MyBoost',
    description: 'Complete CS2 placement matches with strong results. Unlock competitive mode, up to 10 wins available, no cheats or hacks.',
    canonical: 'https://www.myboost.top/game/cs2/placement-matches'
  },
  {
    path: 'game/cs2/wins-boost',
    title: 'CS2 Wins Boost - Any Number of Wins | MyBoost',
    description: 'Order any number of CS2 wins with professional players. Any number of wins, no software used, all ranks available.',
    canonical: 'https://www.myboost.top/game/cs2/wins-boost'
  },
  {
    path: 'game/cs2/armory-boost',
    title: 'CS2 The Armory Boost - Farm Armory Credits | MyBoost',
    description: 'Farm CS2 Armory credits safely and efficiently. Any number of Armory credits, no software used, chance to get top skins.',
    canonical: 'https://www.myboost.top/game/cs2/armory-boost'
  },
  {
    path: 'game/cs2/profile-rank',
    title: 'CS2 Profile Rank Boost - Military Ranks | MyBoost',
    description: 'Boost your CS2 profile rank and unlock rewards. Up to 40 military ranks, many games with high KD, chance to get Service Medal.',
    canonical: 'https://www.myboost.top/game/cs2/profile-rank'
  },
  {
    path: 'game/cs2/coaching',
    title: 'CS2 Coaching - Pro Player Sessions | MyBoost',
    description: 'Improve your CS2 skills with professional coaching. Hourly gaming session, learn the best tactics, solidify your progress.',
    canonical: 'https://www.myboost.top/game/cs2/coaching'
  },
  {
    path: 'game/cs2/esea-wins',
    title: 'CS2 ESEA Wins Boost - Stable Results | MyBoost',
    description: 'Get ESEA wins with skilled players and stable results. Up to 5 wins, all games with high KD, available for all levels.',
    canonical: 'https://www.myboost.top/game/cs2/esea-wins'
  },
  {
    path: 'game/cs2/global-elite-boost',
    title: 'CS2 Global Elite Boost - Reach Global Elite | MyBoost',
    description: 'Reach Global Elite rank with expert CS2 players. Get Global Elite rank, many games with high KD, rank-based discounts.',
    canonical: 'https://www.myboost.top/game/cs2/global-elite-boost'
  },
  {
    path: 'game/dota-2',
    title: 'Dota 2 Boosting Services - MMR Boost, LP Removal & Tokens',
    description: 'Professional Dota 2 boosting by Immortal players. MMR boost, Low Priority removal, rank tokens farming. 1,800+ orders, 4.8★ rating. Safe and fast delivery.',
    canonical: 'https://www.myboost.top/game/dota-2'
  },
  {
    path: 'game/rust',
    title: 'Rust Boosting Services - Bases, Raids, Resources, Components, Electronics & More',
    description: 'Premium Rust boosting — base building, raiding, resources, components, electronics, key cards, oil barrel farming, weapons, ammo, coaching, and rent-a-booster. Manual delivery by Rust veterans. 600+ orders, 4.9★ rating.',
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
