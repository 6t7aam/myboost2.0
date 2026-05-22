export type RustCategoryId =
  | "base-building"
  | "raiding"
  | "resources"
  | "components"
  | "electronics"
  | "key-cards"
  | "oil-barrel"
  | "weapons"
  | "ammo"
  | "coaching"
  | "rent-a-booster";

export type RustCalculatorType = "fixed" | "hourly" | "quantity" | "selector";

/**
 * A pickable option inside a `selector` calculator. Selecting a variant drives
 * the entire calculator: price, slider range, bundle math, and receive text.
 */
export interface RustVariant {
  id: string;
  title: string;
  /** Optional short blurb shown under the variant button. */
  blurb?: string;
  /** Price per "unit" (one pack or one item). */
  price: number;
  /** How many real game items per priced unit. Defaults to 1. */
  packSize?: number;
  packUnitLabel?: string;
  qtyMin?: number;
  qtyMax?: number;
  qtyStep?: number;
  qtyDefault?: number;
  qtyUnit?: string;
}

export interface RustService {
  id: string;
  slug: string;
  category: RustCategoryId;
  title: string;
  description: string;
  /** Exactly three short selling points shown on the card. */
  bullets: [string, string, string];
  /** Base price shown on the card. Use the cheapest variant for `selector` services. */
  price: number;
  /** Used by `hourly` (and as fallback label on cards). */
  unit?: string;
  badge?: string;
  image: string;
  delivery: string;
  rating: string;
  calculatorType: RustCalculatorType;

  /** For `quantity` calculators only. */
  packSize?: number;
  packUnitLabel?: string;
  qtyMin?: number;
  qtyMax?: number;
  qtyStep?: number;
  qtyDefault?: number;
  qtyUnit?: string;

  /** Variant list — required when `calculatorType === "selector"`. */
  variants?: RustVariant[];
}

export interface RustCategory {
  id: RustCategoryId;
  title: string;
  shortTitle: string;
  description: string;
}

export const RUST_CATEGORIES: RustCategory[] = [
  {
    id: "base-building",
    title: "Base Building",
    shortTitle: "Base Building",
    description:
      "Premium Rust base building — secure layouts, raid-resistant designs, and clean wipe-start progression.",
  },
  {
    id: "raiding",
    title: "Raid Sessions",
    shortTitle: "Raid Sessions",
    description:
      "Full Rust raid sessions — base raids, monument runs, and hourly PvP assistance fulfilled by veteran PROs.",
  },
  {
    id: "resources",
    title: "Resource Delivery",
    shortTitle: "Resources",
    description:
      "Pick your resource and order in bundles — stone, wood, metal fragments, sulfur, HQM, scrap, and cloth.",
  },
  {
    id: "components",
    title: "Components Delivery",
    shortTitle: "Components",
    description:
      "All Rust components in one calculator — metal springs, rifle bodies, road signs, rope, sewing kits, sheet metal.",
  },
  {
    id: "electronics",
    title: "Electronics Supply",
    shortTitle: "Electronics",
    description:
      "All Rust electronics in one calculator — generators, solar panels, batteries, computer stations, traps, and switches.",
  },
  {
    id: "key-cards",
    title: "Key Cards Delivery",
    shortTitle: "Key Cards",
    description:
      "Pick green, blue, or red Rust keycards from one calculator — manual delivery, same-day completion.",
  },
  {
    id: "oil-barrel",
    title: "Oil Barrel Delivery",
    shortTitle: "Oil Barrel",
    description:
      "Rust oil barrel delivery for crude oil, low grade fuel, and side scrap — the most affordable in the catalog.",
  },
  {
    id: "weapons",
    title: "Weapons Delivery",
    shortTitle: "Weapons",
    description:
      "Combat-ready Rust weapons crafted by verified PRO players and delivered straight to your stash.",
  },
  {
    id: "ammo",
    title: "Ammo Supply",
    shortTitle: "Ammo",
    description:
      "Bulk Rust ammo for raid sessions, PvP, and roam loadouts. Bullets and explosives prep covered for every caliber.",
  },
  {
    id: "coaching",
    title: "Coaching",
    shortTitle: "Coaching",
    description:
      "1-on-1 Rust coaching with PRO players — base design, raid mechanics, PvP, and game sense.",
  },
  {
    id: "rent-a-booster",
    title: "Hire A PRO",
    shortTitle: "Hire A PRO",
    description:
      "Hire a verified Rust PRO by the hour for any task — resource delivery, building, scouting, roaming, or raids.",
  },
];

export const RUST_STATS = {
  orders: "600+",
  rating: "4.9",
  speed: "1-24 hrs",
} as const;

export const RUST_GAME_TITLE = "Rust";
export const RUST_GAME_SLUG = "rust";
export const RUST_HERO_IMAGE =
  "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/252490/ss_c27e1201e68812e48a12ca6e44b60a3e3f3d7.1920x1080.jpg";

export const rustPlaceholderImage = (name: string, w = 400, h = 300) =>
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" +
  w +
  "' height='" +
  h +
  "'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23161616'/%3E%3Cstop offset='100%25' stop-color='%230a0a0a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='" +
  w +
  "' height='" +
  h +
  "' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-weight='900' font-size='22' fill='%23ffd700' letter-spacing='2'%3E" +
  encodeURIComponent(name.toUpperCase()) +
  "%3C/text%3E%3C/svg%3E";

// ---------------------------------------------------------------------------
//   Variant lists
// ---------------------------------------------------------------------------

const COMPONENT_VARIANTS: RustVariant[] = [
  {
    id: "metal-spring",
    title: "Metal Spring",
    blurb: "10 per pack",
    price: 5.85,
    packSize: 10,
    packUnitLabel: "metal springs",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "rifle-body",
    title: "Rifle Body",
    blurb: "3 per pack",
    price: 5.85,
    packSize: 3,
    packUnitLabel: "rifle bodies",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "road-signs",
    title: "Road Signs",
    blurb: "20 per pack",
    price: 5.85,
    packSize: 20,
    packUnitLabel: "road signs",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "rope",
    title: "Rope",
    blurb: "50 per pack",
    price: 5.85,
    packSize: 50,
    packUnitLabel: "ropes",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "sewing-kit",
    title: "Sewing Kit",
    blurb: "20 per pack",
    price: 5.85,
    packSize: 20,
    packUnitLabel: "sewing kits",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "sheet-metal",
    title: "Sheet Metal",
    blurb: "10 per pack",
    price: 5.85,
    packSize: 10,
    packUnitLabel: "sheet metals",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
];

const ELECTRONICS_VARIANT_BASE = (id: string, title: string, max = 20, label?: string): RustVariant => ({
  id,
  title,
  blurb: "1 item",
  price: 3.99,
  packSize: 1,
  packUnitLabel: label ?? title.toLowerCase(),
  qtyMin: 1,
  qtyMax: max,
  qtyStep: 1,
  qtyDefault: 1,
  qtyUnit: "item",
});

const ELECTRONICS_VARIANTS: RustVariant[] = [
  ELECTRONICS_VARIANT_BASE("wind-turbine", "Wind Turbine"),
  ELECTRONICS_VARIANT_BASE("small-generator", "Small Generator"),
  ELECTRONICS_VARIANT_BASE("large-solar-panel", "Large Solar Panel"),
  ELECTRONICS_VARIANT_BASE("lr-battery", "LR Battery"),
  ELECTRONICS_VARIANT_BASE("mr-battery", "MR Battery"),
  ELECTRONICS_VARIANT_BASE("computer-station", "Computer Station", 10),
  ELECTRONICS_VARIANT_BASE("guntrap", "Guntrap"),
  ELECTRONICS_VARIANT_BASE("switch", "Switch", 30),
  ELECTRONICS_VARIANT_BASE("sprinkler", "Sprinkler"),
];

const KEY_CARD_VARIANTS: RustVariant[] = [
  {
    id: "green",
    title: "Green Card",
    blurb: "Low-tier monuments",
    price: 9.99,
    packSize: 1,
    packUnitLabel: "green keycard",
    qtyMin: 1,
    qtyMax: 15,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "card",
  },
  {
    id: "blue",
    title: "Blue Card",
    blurb: "Mid-tier monuments",
    price: 15.99,
    packSize: 1,
    packUnitLabel: "blue keycard",
    qtyMin: 1,
    qtyMax: 15,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "card",
  },
  {
    id: "red",
    title: "Red Card",
    blurb: "High-tier monuments",
    price: 24.99,
    packSize: 1,
    packUnitLabel: "red keycard",
    qtyMin: 1,
    qtyMax: 10,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "card",
  },
];

const RESOURCE_FARM_VARIANTS: RustVariant[] = [
  {
    id: "stone",
    title: "Stone",
    blurb: "1,000 per bundle",
    price: 2.49,
    packSize: 1000,
    packUnitLabel: "stone",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "bundle",
  },
  {
    id: "wood",
    title: "Wood",
    blurb: "5,000 per bundle",
    price: 2.49,
    packSize: 5000,
    packUnitLabel: "wood",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "bundle",
  },
  {
    id: "metal-fragments",
    title: "Metal Fragments",
    blurb: "1,000 per bundle",
    price: 3.49,
    packSize: 1000,
    packUnitLabel: "metal fragments",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "bundle",
  },
  {
    id: "sulfur",
    title: "Sulfur",
    blurb: "1,000 per bundle",
    price: 5.99,
    packSize: 1000,
    packUnitLabel: "sulfur",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "bundle",
  },
  {
    id: "high-quality-metal",
    title: "High Quality Metal",
    blurb: "100 per bundle",
    price: 4.99,
    packSize: 100,
    packUnitLabel: "high quality metal",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "bundle",
  },
  {
    id: "scrap",
    title: "Scrap",
    blurb: "500 per bundle",
    price: 3.99,
    packSize: 500,
    packUnitLabel: "scrap",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "bundle",
  },
  {
    id: "cloth",
    title: "Cloth",
    blurb: "500 per bundle",
    price: 2.29,
    packSize: 500,
    packUnitLabel: "cloth",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "bundle",
  },
];

const cheapestVariantPrice = (variants: RustVariant[]) =>
  variants.reduce((min, v) => (v.price < min ? v.price : min), variants[0].price);

// ---------------------------------------------------------------------------
//   Services
// ---------------------------------------------------------------------------

export const rustServices: RustService[] = [
  // --- 1. Base Building ---------------------------------------------------
  {
    id: "advanced-base",
    slug: "advanced-base",
    category: "base-building",
    title: "Advanced Base",
    description:
      "Premium Rust advanced base design and build for maximum raid cost and stronger defense.",
    bullets: ["Advanced defensive layout", "High raid cost design", "Manual build only"],
    price: 22.49,
    badge: "POPULAR",
    image: "/images/rust/advanced-base.webp",
    delivery: "4-8 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "bunker-base",
    slug: "bunker-base",
    category: "base-building",
    title: "Bunker Base",
    description:
      "Secure bunker base construction for Rust with smart layout, protected loot rooms, and strong raid resistance.",
    bullets: ["Bunker entry system", "Protected loot rooms", "High raid resistance"],
    price: 24.99,
    badge: "BEST VALUE",
    image: "/images/rust/bunker-base.webp",
    delivery: "4-10 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "starter-base",
    slug: "starter-base",
    category: "base-building",
    title: "Starter Base",
    description:
      "Fast starter base setup for a clean early wipe start with essential protection and smart progression.",
    bullets: ["Early-wipe ready", "1-3 hour delivery", "Smart placement"],
    price: 9.99,
    badge: "FAST DELIVERY",
    image: "/images/rust/starter-base.webp",
    delivery: "1-3 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "hourly-driving",
    slug: "hourly-driving",
    category: "base-building",
    title: "Hourly PRO Session",
    description:
      "Hire a Rust PRO by the hour for building, resource delivery, progression, and roaming with any task allowed.",
    bullets: ["Any task allowed", "Pay per hour", "Instant PRO start"],
    price: 7.99,
    unit: "hour",
    badge: "FLEXIBLE",
    image: "/images/rust/hourly-driving.webp",
    delivery: "Instant start",
    rating: "4.9",
    calculatorType: "hourly",
  },
  {
    id: "workbench-boost",
    slug: "workbench-boost",
    category: "base-building",
    title: "Workbench Boost",
    description:
      "Fast Rust workbench progression service — unlock higher-tier crafting without the scrap grind.",
    bullets: ["Up to Tier 3", "Crafting unlocked", "Same-day delivery"],
    price: 5.99,
    badge: "FAST DELIVERY",
    image: "/images/rust/workbench-boost.webp",
    delivery: "1-4 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },

  // --- 2. Raiding ---------------------------------------------------------
  {
    id: "base-raiding-boost",
    slug: "base-raiding-boost",
    category: "raiding",
    title: "Base Raid Session",
    description:
      "Premium Rust base raid session — secure enemy bases and deliver the loot back to your stash safely.",
    bullets: ["Enemy base cleared", "Loot delivered to you", "Veteran PRO raiders"],
    price: 59.99,
    badge: "POPULAR",
    image: "/images/rust/base-raiding-boost.webp",
    delivery: "4-12 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "cargo-ship-raid",
    slug: "cargo-ship-raid",
    category: "raiding",
    title: "Cargo Ship Raid",
    description:
      "Rust Cargo Ship raid session with PRO support for loot, crates, PvP pressure, and extraction.",
    bullets: ["Full cargo cleared", "Locked crate handled", "1-3 hr completion"],
    price: 14.99,
    badge: "HOT",
    image: "/images/rust/cargo-ship-raid-boost.webp",
    delivery: "1-3 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "oil-rig-raid",
    slug: "oil-rig-raid",
    category: "raiding",
    title: "Oil Rig Raid",
    description:
      "Rust Oil Rig raid session for high-value loot, locked crates, PvP control, and secure completion.",
    bullets: ["Locked crate looted", "Scientists handled", "PvP control"],
    price: 34.99,
    badge: "BEST VALUE",
    image: "/images/rust/oil-rig-raid-boost.webp",
    delivery: "2-4 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "base-security",
    slug: "base-security",
    category: "raiding",
    title: "Base Security",
    description:
      "Improve your Rust base security with better doors, traps, storage protection, and safer layouts.",
    bullets: ["Hardened doors", "Trap layouts", "Reduced loot loss"],
    price: 4.99,
    badge: "SAFE",
    image: "/images/rust/base-security-boost.webp",
    delivery: "1-3 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "hourly-pvp-assistance",
    slug: "hourly-pvp-assistance",
    category: "raiding",
    title: "Hourly PvP Assistance",
    description:
      "Hourly Rust PvP assistance for roams, online raid defense, base hits, and raid prep scouting.",
    bullets: ["Roam + raid support", "Any task allowed", "Pay per hour"],
    price: 7.99,
    unit: "hour",
    badge: "FLEXIBLE",
    image: "/images/rust/raiding-hourly-driving.webp",
    delivery: "Instant start",
    rating: "4.9",
    calculatorType: "hourly",
  },

  // --- 3. Resources -------------------------------------------------------
  {
    id: "resource-farm",
    slug: "resource-farm",
    category: "resources",
    title: "Resource Delivery",
    description:
      "Pick stone, wood, metal fragments, sulfur, HQM, scrap or cloth — order any resource type from one calculator.",
    bullets: ["7 resource types", "Manual delivery only", "Delivered to your base"],
    price: cheapestVariantPrice(RESOURCE_FARM_VARIANTS),
    badge: "POPULAR",
    image: "/images/rust/resources.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "selector",
    variants: RESOURCE_FARM_VARIANTS,
  },
  {
    id: "tea-farm",
    slug: "tea-farm",
    category: "resources",
    title: "Tea Farm",
    description:
      "Complete Rust tea farm setup and resource delivery for efficient long-wipe production.",
    bullets: ["Full tea + fabric setup", "All resources included", "Long-wipe income"],
    price: 29.99,
    badge: "BEST VALUE",
    image: "/images/rust/tea-farm.webp",
    delivery: "4-8 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },

  // --- 4. Components ------------------------------------------------------
  {
    id: "components",
    slug: "components",
    category: "components",
    title: "Components Delivery",
    description:
      "Pick metal spring, rifle body, road signs, rope, sewing kit, or sheet metal — all 6 components in one calculator.",
    bullets: ["6 component types", "Manual delivery only", "Same-day completion"],
    price: cheapestVariantPrice(COMPONENT_VARIANTS),
    badge: "POPULAR",
    image: "/images/rust/components.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "selector",
    variants: COMPONENT_VARIANTS,
  },

  // --- 5. Electronics -----------------------------------------------------
  {
    id: "electronics",
    slug: "electronics",
    category: "electronics",
    title: "Electronics Supply",
    description:
      "Pick wind turbines, generators, solar panels, batteries, computer stations, guntraps, switches, or sprinklers — all in one calculator.",
    bullets: ["9 electronics types", "Pre-crafted delivery", "Manual crafting only"],
    price: cheapestVariantPrice(ELECTRONICS_VARIANTS),
    badge: "HOT",
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "selector",
    variants: ELECTRONICS_VARIANTS,
  },

  // --- 6. Key Cards -------------------------------------------------------
  {
    id: "key-cards",
    slug: "key-cards",
    category: "key-cards",
    title: "Key Cards Delivery",
    description:
      "Pick green, blue, or red Rust keycards — all monument access tiers in one calculator with dynamic pricing.",
    bullets: ["Green / blue / red", "Monument access", "Same-day delivery"],
    price: cheapestVariantPrice(KEY_CARD_VARIANTS),
    badge: "POPULAR",
    image: "/images/rust/key-cards-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "selector",
    variants: KEY_CARD_VARIANTS,
  },

  // --- 7. Oil Barrel ------------------------------------------------------
  {
    id: "oil-barrel",
    slug: "oil-barrel",
    category: "oil-barrel",
    title: "Oil Barrel Delivery",
    description:
      "Crude oil and low grade fuel delivered from roadside barrel routes — the most affordable in the Rust catalog.",
    bullets: ["5 oil barrels per pack", "Crude + low grade", "Manual road delivery"],
    price: 1.09,
    badge: "POPULAR",
    image: "/images/rust/oil-barrel-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 5,
    packUnitLabel: "oil barrels",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },

  // --- 8. Weapons ---------------------------------------------------------
  {
    id: "weapons-farm",
    slug: "weapons-farm",
    category: "weapons",
    title: "Weapons Delivery",
    description:
      "Combat-ready Rust weapons crafted and delivered to your base — any weapon, any loadout.",
    bullets: ["Any weapon", "Combat-ready gear", "Manual delivery"],
    price: 7.99,
    badge: "POPULAR",
    image: "/images/rust/weapons.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "weapon",
    qtyMin: 1,
    qtyMax: 15,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "weapon",
  },

  // --- 9. Ammo -----------------------------------------------------------
  {
    id: "ammo",
    slug: "ammo",
    category: "ammo",
    title: "Ammo Supply",
    description:
      "Bulk Rust ammo crafted for every caliber — bullets, explosives prep, and raid supplies.",
    bullets: ["All calibers", "Raid supply prep", "Manual crafting"],
    price: 3.99,
    badge: "FAST DELIVERY",
    image: "/images/rust/ammo.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 200,
    packUnitLabel: "rounds",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },

  // --- 10. Coaching -------------------------------------------------------
  {
    id: "coaching",
    slug: "coaching",
    category: "coaching",
    title: "Coaching",
    description:
      "1-on-1 Rust coaching with PRO players — base design, raid mechanics, PvP, and wipe planning.",
    bullets: ["1-on-1 voice session", "PRO coach", "Custom learning plan"],
    price: 14.99,
    unit: "hour",
    badge: "SAFE",
    image: "/images/rust/hourly-driving.webp",
    delivery: "Instant start",
    rating: "4.9",
    calculatorType: "hourly",
  },

  // --- 11. Rent A Booster -------------------------------------------------
  {
    id: "rent-a-booster",
    slug: "rent-a-booster",
    category: "rent-a-booster",
    title: "Hire A PRO",
    description:
      "Hire a verified Rust PRO by the hour for any task — resource delivery, building, scouting, roaming, or raids.",
    bullets: ["Any task allowed", "Pay per hour", "Veteran Rust PROs"],
    price: 7.99,
    unit: "hour",
    badge: "FLEXIBLE",
    image: "/images/rust/resources-hourly-driving.webp",
    delivery: "Instant start",
    rating: "4.9",
    calculatorType: "hourly",
  },
];

export const getRustServiceBySlug = (slug: string): RustService | undefined =>
  rustServices.find((s) => s.slug === slug);

export const getRustServicesByCategory = (
  categoryId: RustCategoryId,
): RustService[] => rustServices.filter((s) => s.category === categoryId);

export const getRustCategory = (id: RustCategoryId): RustCategory | undefined =>
  RUST_CATEGORIES.find((c) => c.id === id);
