export const DOTA2_MMR_MIN = 0;
export const DOTA2_MMR_MAX = 8000;
export const DOTA2_MMR_MIN_GAP = 1;
export const DOTA2_MMR_MIN_PRICE = 4.02;
export const DOTA2_MMR_MIN_COMPLETION_MINUTES = 19;

export interface Dota2MmrRank {
  from: number;
  to: number;
  title: string;
  family: "Herald" | "Guardian" | "Crusader" | "Archon" | "Legend" | "Ancient" | "Divine" | "Immortal";
}

interface PricingSegment {
  from: number;
  to: number;
  price: number;
}

interface CompletionSegment {
  from: number;
  to: number;
  minutes: number;
}

export type MmrBehaviorScoreOptionId = "more-9000" | "less-9000" | "less-6000";
export type MmrBoostMethodId = "piloted" | "self-play";
export type MmrAdditionalOptionId =
  | "double-tokens"
  | "matches-under-1200"
  | "specific-keybinds"
  | "live-stream";

interface ModifierOption<T extends string> {
  id: T;
  label: string;
  modifier: number;
  accent?: string;
}

export const dota2MmrRanks: Dota2MmrRank[] = [
  { from: 0, to: 769, title: "Herald 1", family: "Herald" },
  { from: 770, to: 923, title: "Herald 2", family: "Herald" },
  { from: 924, to: 1077, title: "Herald 3", family: "Herald" },
  { from: 1078, to: 1231, title: "Herald 4", family: "Herald" },
  { from: 1232, to: 1385, title: "Herald 5", family: "Herald" },
  { from: 1386, to: 1539, title: "Guardian 1", family: "Guardian" },
  { from: 1540, to: 1693, title: "Guardian 2", family: "Guardian" },
  { from: 1694, to: 1847, title: "Guardian 3", family: "Guardian" },
  { from: 1848, to: 2001, title: "Guardian 4", family: "Guardian" },
  { from: 2002, to: 2155, title: "Guardian 5", family: "Guardian" },
  { from: 2156, to: 2309, title: "Crusader 1", family: "Crusader" },
  { from: 2310, to: 2463, title: "Crusader 2", family: "Crusader" },
  { from: 2464, to: 2617, title: "Crusader 3", family: "Crusader" },
  { from: 2618, to: 2771, title: "Crusader 4", family: "Crusader" },
  { from: 2772, to: 2925, title: "Crusader 5", family: "Crusader" },
  { from: 2926, to: 3079, title: "Archon 1", family: "Archon" },
  { from: 3080, to: 3233, title: "Archon 2", family: "Archon" },
  { from: 3234, to: 3387, title: "Archon 3", family: "Archon" },
  { from: 3388, to: 3541, title: "Archon 4", family: "Archon" },
  { from: 3542, to: 3695, title: "Archon 5", family: "Archon" },
  { from: 3696, to: 3849, title: "Legend 1", family: "Legend" },
  { from: 3850, to: 4003, title: "Legend 2", family: "Legend" },
  { from: 4004, to: 4157, title: "Legend 3", family: "Legend" },
  { from: 4158, to: 4311, title: "Legend 4", family: "Legend" },
  { from: 4312, to: 4465, title: "Legend 5", family: "Legend" },
  { from: 4466, to: 4619, title: "Ancient 1", family: "Ancient" },
  { from: 4620, to: 4773, title: "Ancient 2", family: "Ancient" },
  { from: 4774, to: 4927, title: "Ancient 3", family: "Ancient" },
  { from: 4928, to: 5081, title: "Ancient 4", family: "Ancient" },
  { from: 5082, to: 5235, title: "Ancient 5", family: "Ancient" },
  { from: 5236, to: 5420, title: "Divine 1", family: "Divine" },
  { from: 5421, to: 5605, title: "Divine 2", family: "Divine" },
  { from: 5606, to: 5790, title: "Divine 3", family: "Divine" },
  { from: 5791, to: 5975, title: "Divine 4", family: "Divine" },
  { from: 5976, to: 6159, title: "Divine 5", family: "Divine" },
  { from: 6160, to: 6999, title: "Immortal", family: "Immortal" },
  { from: 7000, to: 8000, title: "Immortal top", family: "Immortal" },
];

export const dota2MmrPricingSegments: PricingSegment[] = [
  { from: 0, to: 100, price: 6.5 },
  { from: 100, to: 500, price: 10.0 },
  { from: 500, to: 999, price: 12.49 },
  { from: 999, to: 1000, price: 4.02 },
  { from: 1000, to: 2000, price: 29.02 },
  { from: 2000, to: 3000, price: 33.02 },
  { from: 3000, to: 4000, price: 43.03 },
  { from: 4000, to: 5000, price: 63.05 },
  { from: 5000, to: 6000, price: 162.49 },
  { from: 6000, to: 7000, price: 203.13 },
  { from: 7000, to: 8000, price: 218.14 },
];

export const dota2MmrCompletionSegments: CompletionSegment[] = [
  { from: 0, to: 100, minutes: 447 },
  { from: 100, to: 500, minutes: 1713 },
  { from: 500, to: 999, minutes: 2160 },
  { from: 999, to: 1000, minutes: 19 },
  { from: 1000, to: 2000, minutes: 4320 },
  { from: 2000, to: 3000, minutes: 4320 },
  { from: 3000, to: 4000, minutes: 4800 },
  { from: 4000, to: 5000, minutes: 5760 },
  { from: 5000, to: 6000, minutes: 10560 },
  { from: 6000, to: 7000, minutes: 7200 },
  { from: 7000, to: 8000, minutes: 11760 },
];

export const mmrBehaviorScoreOptions: ModifierOption<MmrBehaviorScoreOptionId>[] = [
  { id: "more-9000", label: "More 9000", modifier: 0 },
  { id: "less-9000", label: "Less 9000", modifier: 0.15, accent: "+15%" },
  { id: "less-6000", label: "Less 6000", modifier: 0.3, accent: "+30%" },
];

export const mmrBoostMethodOptions: ModifierOption<MmrBoostMethodId>[] = [
  { id: "piloted", label: "Piloted", modifier: 0 },
  { id: "self-play", label: "Self-play", modifier: 0 },
];

export const mmrAdditionalOptions: ModifierOption<MmrAdditionalOptionId>[] = [
  { id: "double-tokens", label: "Use my double tokens", modifier: -0.25, accent: "-25%" },
  { id: "matches-under-1200", label: "Matches played <1200", modifier: 0.3, accent: "+30%" },
  { id: "specific-keybinds", label: "Specific keybinds", modifier: 0.1, accent: "+10%" },
  { id: "live-stream", label: "Live stream", modifier: 0.15, accent: "+15%" },
];

export const clampMmr = (value: number) => Math.min(DOTA2_MMR_MAX, Math.max(DOTA2_MMR_MIN, Math.round(value)));

const roundMoney = (value: number) => Number(value.toFixed(2));

export const normalizeMmrRange = (
  current: number,
  desired: number,
  preserve: "current" | "desired" | "both" = "both",
): [number, number] => {
  let safeCurrent = clampMmr(current);
  let safeDesired = clampMmr(desired);

  safeCurrent = Math.min(safeCurrent, DOTA2_MMR_MAX - DOTA2_MMR_MIN_GAP);
  safeDesired = Math.max(safeDesired, DOTA2_MMR_MIN + DOTA2_MMR_MIN_GAP);

  if (safeDesired - safeCurrent >= DOTA2_MMR_MIN_GAP) {
    return [safeCurrent, safeDesired];
  }

  if (preserve === "current") {
    safeDesired = Math.min(DOTA2_MMR_MAX, safeCurrent + DOTA2_MMR_MIN_GAP);
    safeCurrent = Math.min(safeCurrent, safeDesired - DOTA2_MMR_MIN_GAP);
  } else if (preserve === "desired") {
    safeCurrent = Math.max(DOTA2_MMR_MIN, safeDesired - DOTA2_MMR_MIN_GAP);
    safeDesired = Math.max(safeDesired, safeCurrent + DOTA2_MMR_MIN_GAP);
  } else {
    safeDesired = Math.min(DOTA2_MMR_MAX, Math.max(safeDesired, safeCurrent + DOTA2_MMR_MIN_GAP));
    safeCurrent = Math.max(DOTA2_MMR_MIN, Math.min(safeCurrent, safeDesired - DOTA2_MMR_MIN_GAP));
  }

  return [safeCurrent, safeDesired];
};

export const getRankByMMR = (mmr: number): Dota2MmrRank => {
  const safeMmr = clampMmr(mmr);
  return dota2MmrRanks.find((rank) => safeMmr >= rank.from && safeMmr <= rank.to) ?? dota2MmrRanks[0];
};

export const calculateBasePrice = (currentMMR: number, desiredMMR: number): number => {
  const [safeCurrent, safeDesired] = normalizeMmrRange(currentMMR, desiredMMR);
  let total = 0;

  for (const segment of dota2MmrPricingSegments) {
    const overlapStart = Math.max(safeCurrent, segment.from);
    const overlapEnd = Math.min(safeDesired, segment.to);
    if (overlapEnd <= overlapStart) continue;

    const segmentLength = segment.to - segment.from;
    const overlapLength = overlapEnd - overlapStart;
    total += segment.price * (overlapLength / segmentLength);
  }

  if (safeDesired > safeCurrent && total < DOTA2_MMR_MIN_PRICE) {
    return DOTA2_MMR_MIN_PRICE;
  }

  return roundMoney(total);
};

const formatDurationPart = (value: number, unit: string) => `${value} ${unit}${value === 1 ? "" : "s"}`;

export const formatCompletionTime = (totalMinutes: number): string => {
  const safeMinutes = Math.max(DOTA2_MMR_MIN_COMPLETION_MINUTES, Math.round(totalMinutes));
  const days = Math.floor(safeMinutes / (24 * 60));
  const hours = Math.floor((safeMinutes % (24 * 60)) / 60);
  const minutes = safeMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(formatDurationPart(days, "day"));
  if (hours > 0) parts.push(formatDurationPart(hours, "hour"));
  if (minutes > 0 && days === 0) parts.push(formatDurationPart(minutes, "minute"));

  return parts.length > 0 ? parts.join(" ") : formatDurationPart(DOTA2_MMR_MIN_COMPLETION_MINUTES, "minute");
};

export const calculateCompletionTime = (currentMMR: number, desiredMMR: number): string => {
  const [safeCurrent, safeDesired] = normalizeMmrRange(currentMMR, desiredMMR);
  let totalMinutes = 0;

  for (const segment of dota2MmrCompletionSegments) {
    const overlapStart = Math.max(safeCurrent, segment.from);
    const overlapEnd = Math.min(safeDesired, segment.to);
    if (overlapEnd <= overlapStart) continue;

    const segmentLength = segment.to - segment.from;
    const overlapLength = overlapEnd - overlapStart;
    totalMinutes += segment.minutes * (overlapLength / segmentLength);
  }

  return formatCompletionTime(totalMinutes);
};

export const calculateFinalPrice = (
  basePrice: number,
  behaviorScore: MmrBehaviorScoreOptionId,
  boostMethod: MmrBoostMethodId,
  selectedOptions: Iterable<MmrAdditionalOptionId>,
): number => {
  const behaviorModifier =
    mmrBehaviorScoreOptions.find((option) => option.id === behaviorScore)?.modifier ?? 0;
  const methodModifier = mmrBoostMethodOptions.find((option) => option.id === boostMethod)?.modifier ?? 0;
  const additionalModifier = Array.from(selectedOptions).reduce((sum, optionId) => {
    const option = mmrAdditionalOptions.find((item) => item.id === optionId);
    return sum + (option?.modifier ?? 0);
  }, 0);

  return roundMoney(basePrice * (1 + behaviorModifier + methodModifier + additionalModifier));
};
