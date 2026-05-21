/**
 * Centralized pricing config for the site-wide sale.
 *
 * Every component that displays a price should resolve through helpers in this
 * file rather than hardcoding numbers. This lets us roll back the sale (or
 * tweak it) from a single source.
 */

export interface SalePrice {
  oldPrice: number;
  newPrice: number;
  unit?: string;
}

export const SALE_ACTIVE = true;

export const SALE_BADGE_LABEL = "LIMITED SALE";

export const SALE_PRICING = {
  arena_breakout: {
    koens_farming: {
      oldPrice: 1.5,
      newPrice: 0.99,
      unit: "per 1M",
    },
    raids_lockdown: {
      oldPrice: 4.5,
      newPrice: 2.5,
    },
    raids_forbidden: {
      oldPrice: 8.99,
      newPrice: 4.99,
    },
    titanium_case: {
      oldPrice: 99.99,
      newPrice: 69.99,
    },
    coaching: {
      oldPrice: 8.5,
      newPrice: 4.99,
      unit: "per hour",
    },
    rent_booster: {
      oldPrice: 8.5,
      newPrice: 4.99,
      unit: "per hour",
    },
  },
} as const;

type ArenaServiceKey = keyof typeof SALE_PRICING.arena_breakout;

const ARENA_SERVICE_ID_MAP: Record<string, ArenaServiceKey> = {
  "koens-farming": "koens_farming",
  "titanium-case": "titanium_case",
  coaching: "coaching",
  "rent-a-booster": "rent_booster",
};

/**
 * Look up sale data for a non-raid Arena Breakout service.
 * Returns null if no sale entry exists for this id.
 */
export const getArenaServiceSale = (serviceId: string): SalePrice | null => {
  if (!SALE_ACTIVE) return null;
  const key = ARENA_SERVICE_ID_MAP[serviceId];
  if (!key) return null;
  return SALE_PRICING.arena_breakout[key];
};

/**
 * Look up sale data for an Arena Breakout raid mode.
 * `modeName` is the human-readable mode (e.g. "Lockdown" or "Forbidden").
 */
export const getArenaRaidSale = (modeName: string): SalePrice | null => {
  if (!SALE_ACTIVE) return null;
  const normalized = modeName.toLowerCase();
  if (normalized === "lockdown") return SALE_PRICING.arena_breakout.raids_lockdown;
  if (normalized === "forbidden") return SALE_PRICING.arena_breakout.raids_forbidden;
  return null;
};

/**
 * Sale ratio for a given Arena Breakout service (used to discount derived
 * totals like speed/express multipliers in the calculator).
 *
 * For raids, ratio depends on the selected mode, so callers must pass it.
 */
export const getArenaServiceSaleRatio = (
  serviceId: string,
  raidMode?: string,
): number => {
  if (!SALE_ACTIVE) return 1;
  if (serviceId === "raids-boost" && raidMode) {
    const sale = getArenaRaidSale(raidMode);
    if (!sale) return 1;
    return sale.newPrice / sale.oldPrice;
  }
  const sale = getArenaServiceSale(serviceId);
  if (!sale) return 1;
  return sale.newPrice / sale.oldPrice;
};

/**
 * Format a USD amount with two decimals (e.g. 4.99 -> "$4.99").
 */
export const formatUsd = (amount: number): string =>
  `$${amount.toFixed(2)}`;
