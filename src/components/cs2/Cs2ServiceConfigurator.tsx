import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ShieldCheck, Zap, Clock, ShoppingCart, Info, Tag } from "lucide-react";
import { ServiceOption } from "@/data/gameConfigs";
import { SpeedOption, useCart } from "@/contexts/CartContext";
import { OrderSummary } from "@/components/ServiceConfigurator";
import PromoCodeInput from "@/components/PromoCodeInput";
import {
  calculateCs2ServicePrice,
  cs2AdditionalFeatures,
  cs2CoachingMethodOptions,
  cs2DeliverySpeedOptions,
  cs2MethodOptions,
  Cs2Method,
  Cs2PerUnitConfig,
  Cs2TieredPerUnitConfig,
  getFaceitLevel,
  formatUsd,
  getCs2DefaultValues,
  getCs2ServicePricing,
  getCs2ValidationMessage,
} from "@/data/cs2Pricing";

interface Cs2ServiceConfiguratorProps {
  service: ServiceOption;
  gameTitle: string;
  onAddToCart: (order: OrderSummary) => void;
}

const sliderThumbClass = "h-6 w-6 border-[3px] border-primary bg-background shadow-[0_0_16px_rgba(245,197,24,0.35)]";

const modifierLabel = (multiplier: number) => {
  const percent = Math.round((multiplier - 1) * 100);
  return percent === 0 ? "Free" : `+${percent}%`;
};

const formatRating = (value: number) => new Intl.NumberFormat("en-US").format(value);

const getSafeIndex = (index: number, maxIndex: number) => Math.min(Math.max(index, 0), Math.max(maxIndex, 0));

const InfoHint = ({ text }: { text: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        type="button"
        aria-label="More info"
        className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
    </TooltipTrigger>
    <TooltipContent className="max-w-[15rem] text-xs leading-relaxed">{text}</TooltipContent>
  </Tooltip>
);

const Cs2ServiceConfigurator = ({ service, gameTitle, onAddToCart }: Cs2ServiceConfiguratorProps) => {
  const pricing = getCs2ServicePricing(service.id);
  const [values, setValues] = useState(() => getCs2DefaultValues(service.id));
  const [speed, setSpeed] = useState<SpeedOption>("normal");
  const [method, setMethod] = useState<Cs2Method>(service.id === "coaching" ? "live-coaching" : "piloted");
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({});
  const { appliedPromo, setAppliedPromo } = useCart();

  const validationMessage = getCs2ValidationMessage(service.id, values);
  const priceResult = calculateCs2ServicePrice({
    serviceSlug: service.id,
    values,
    method,
    selectedFeatures,
    speed,
    promoDiscount: appliedPromo ? appliedPromo.discount_percent / 100 : 0,
  });
  const methodOptions = service.id === "coaching" ? cs2CoachingMethodOptions : cs2MethodOptions;
  const selectedMethod = methodOptions.find((option) => option.id === method) ?? methodOptions[0];
  const selectedSpeed = cs2DeliverySpeedOptions.find((option) => option.value === speed) ?? cs2DeliverySpeedOptions[0];
  const selectedFeatureList = cs2AdditionalFeatures.filter((feature) => selectedFeatures[feature.id]);
  const hasDiscount = priceResult.promoDiscount > 0;
  const showOriginalPrice = (hasDiscount || priceResult.subtotal > priceResult.basePrice) && !validationMessage;
  const struckPrice = hasDiscount ? priceResult.subtotal : priceResult.basePrice;
  const showAdditionalFeatures = service.id === "coaching" || method === "piloted";

  useEffect(() => {
    if (!showAdditionalFeatures && selectedFeatureList.length > 0) {
      setSelectedFeatures({});
    }
  }, [selectedFeatureList.length, showAdditionalFeatures]);

  const setValue = (key: string, value: number | string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const syncRatingRange = (
    currentVal: number,
    desiredVal: number,
    currentKey: string,
    desiredKey: string,
    rangeMin: number,
    rangeMax: number,
  ) => {
    const minGap = 1;
    const nextCurrent = Math.min(Math.max(currentVal, rangeMin), rangeMax - minGap);
    const nextDesired = Math.min(Math.max(desiredVal, nextCurrent + minGap), rangeMax);

    setValues((prev) => ({
      ...prev,
      [currentKey]: nextCurrent,
      [desiredKey]: nextDesired,
    }));
  };


  const renderSliderShell = ({
    label,
    children,
  }: {
    label: string;
    children: ReactNode;
  }) => (
    <div className="space-y-4">
      <label className="block text-sm font-medium uppercase tracking-[0.14em] text-foreground">
        {label}
      </label>
      {children}
    </div>
  );

  const renderPerUnitSlider = (cfg: Cs2PerUnitConfig, label: string) => {
    const qty = Math.min(Math.max(Number(values[cfg.unitKey] ?? cfg.min), cfg.min), cfg.max);
    const lineTotal = qty * cfg.pricePerUnit;
    const setQty = (next: number) => {
      if (Number.isNaN(next)) return;
      setValue(cfg.unitKey, Math.min(Math.max(Math.round(next), cfg.min), cfg.max));
    };

    return renderSliderShell({
      label,
      children: (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/25 bg-[#0b0b0b] px-4 py-3">
            <div className="flex items-center gap-2">
              <Input
                inputMode="numeric"
                value={qty}
                onChange={(event) => setQty(Number(event.target.value.replace(/[^\d]/g, "")))}
                className="h-11 w-24 rounded-xl border-primary/25 bg-background text-center text-base font-black text-primary focus-visible:ring-primary"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {cfg.unitNoun}{qty === 1 ? "" : "s"}
              </span>
            </div>
            <div className="text-right">
              <div className="text-base font-black text-primary">{formatUsd(lineTotal)}</div>
              <div className="text-[11px] text-muted-foreground">{formatUsd(cfg.pricePerUnit)} / {cfg.unitNoun}</div>
            </div>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-black/25 px-4 py-4 shadow-[inset_0_0_18px_rgba(245,197,24,0.04)]">
            <Slider
              value={[qty]}
              min={cfg.min}
              max={cfg.max}
              step={cfg.step}
              onValueChange={([next]) => setQty(next)}
              className="myboost-dual-slider"
              thumbClassName={sliderThumbClass}
            />
            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span>{cfg.min.toLocaleString()}</span>
              <span>{cfg.max.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ),
    });
  };

  const renderTieredPerUnit = (cfg: Cs2TieredPerUnitConfig) => {
    const tierValue = String(values[cfg.tierKey] ?? cfg.tiers[0].value);
    const activeTier = cfg.tiers.find((t) => t.value === tierValue) ?? cfg.tiers[0];
    const qty = Math.min(Math.max(Number(values[cfg.unitKey] ?? cfg.min), cfg.min), cfg.max);
    const lineTotal = qty * activeTier.pricePerUnit;

    const setQty = (next: number) => {
      if (Number.isNaN(next)) return;
      setValue(cfg.unitKey, Math.min(Math.max(Math.round(next), cfg.min), cfg.max));
    };

    return (
      <div className="space-y-5">
        {renderSliderShell({
          label: cfg.tierLabel,
          children: (
            <div className="grid grid-cols-3 gap-2">
              {cfg.tiers.map((tier) => {
                const active = tier.value === activeTier.value;
                return (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setValue(cfg.tierKey, tier.value)}
                    className={`rounded-lg border px-2 py-3 text-center transition-all ${
                      active
                        ? "border-primary bg-primary/10 shadow-[0_0_12px_hsl(48_100%_50%_/_0.2)]"
                        : "border-border/50 bg-secondary/50 hover:border-primary/30"
                    }`}
                  >
                    <div className={`text-xs font-bold ${active ? "text-primary" : "text-foreground"}`}>{tier.label}</div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">{formatUsd(tier.pricePerUnit)}/{cfg.unitNoun}</div>
                  </button>
                );
              })}
            </div>
          ),
        })}
        {renderSliderShell({
          label: cfg.unitLabel,
          children: (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/25 bg-[#0b0b0b] px-4 py-3">
                <div className="flex items-center gap-2">
                  <Input
                    inputMode="numeric"
                    value={qty}
                    onChange={(event) => setQty(Number(event.target.value.replace(/[^\d]/g, "")))}
                    className="h-11 w-24 rounded-xl border-primary/25 bg-background text-center text-base font-black text-primary focus-visible:ring-primary"
                  />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {cfg.unitNoun}{qty === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-primary">{formatUsd(lineTotal)}</div>
                  <div className="text-[11px] text-muted-foreground">{formatUsd(activeTier.pricePerUnit)} / {cfg.unitNoun}</div>
                </div>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-black/25 px-4 py-4 shadow-[inset_0_0_18px_rgba(245,197,24,0.04)]">
                <Slider
                  value={[qty]}
                  min={cfg.min}
                  max={cfg.max}
                  step={cfg.step}
                  onValueChange={([next]) => setQty(next)}
                  className="myboost-dual-slider"
                  thumbClassName={sliderThumbClass}
                />
                <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{cfg.min}</span>
                  <span>{cfg.max}</span>
                </div>
              </div>
            </div>
          ),
        })}
      </div>
    );
  };

  const renderRankRangeSlider = (range: NonNullable<typeof pricing>["range"]) => {
    if (!range) return null;

    const currentIndex = getSafeIndex(
      range.options.indexOf(String(values[range.currentKey] ?? range.defaultCurrent)),
      range.options.length - 1,
    );
    const desiredIndex = getSafeIndex(
      range.options.indexOf(String(values[range.desiredKey] ?? range.defaultDesired)),
      range.options.length - 1,
    );
    const safeDesiredIndex = Math.max(desiredIndex, Math.min(currentIndex + 1, range.options.length - 1));

    const syncRankRange = (nextCurrentIndex: number, nextDesiredIndex: number) => {
      const maxIndex = range.options.length - 1;
      const nextCurrent = getSafeIndex(Math.min(nextCurrentIndex, maxIndex - 1), maxIndex);
      const nextDesired = getSafeIndex(Math.max(nextDesiredIndex, nextCurrent + 1), maxIndex);

      setValues((current) => ({
        ...current,
        [range.currentKey]: range.options[nextCurrent],
        [range.desiredKey]: range.options[nextDesired],
      }));
    };

    return renderSliderShell({
      label: "Rank Selection",
      children: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {range.currentLabel}
              </label>
              <div className="flex h-11 items-center justify-center rounded-xl border border-primary/25 bg-[#0b0b0b] text-base font-black text-primary">
                {range.options[currentIndex]}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {range.desiredLabel}
              </label>
              <div className="flex h-11 items-center justify-center rounded-xl border border-primary/25 bg-[#0b0b0b] text-base font-black text-primary">
                {range.options[safeDesiredIndex]}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-black/25 px-4 py-4 shadow-[inset_0_0_18px_rgba(245,197,24,0.04)]">
            <Slider
              value={[currentIndex, safeDesiredIndex]}
              min={0}
              max={range.options.length - 1}
              step={1}
              minStepsBetweenThumbs={1}
              onValueChange={(nextValues) => {
                if (nextValues.length < 2) return;
                syncRankRange(nextValues[0], nextValues[1]);
              }}
              className="myboost-dual-slider"
              thumbClassName={sliderThumbClass}
            />
            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span>{range.options[0]}</span>
              <span>{range.options[range.options.length - 1]}</span>
            </div>
          </div>
        </div>
      ),
    });
  };

  const renderMainCalculator = () => {
    if (!pricing) {
      return (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          Pricing is not configured for this CS2 service.
        </div>
      );
    }

    if (pricing.type === "rating_range") {
      const rc = pricing.ratingConfig;
      const currentKey = rc?.currentKey ?? "currentRating";
      const desiredKey = rc?.desiredKey ?? "desiredRating";
      const currentLabel = rc?.currentLabel ?? "Current Rating";
      const desiredLabel = rc?.desiredLabel ?? "Desired Rating";
      const rangeMin = rc?.min ?? 0;
      const rangeMax = rc?.max ?? 25000;
      const rangeStep = rc?.step ?? 1;
      const badgeFn = rc?.formatBadge;

      const currentVal = Number(values[currentKey] ?? pricing.defaultValues[currentKey]);
      const desiredVal = Number(values[desiredKey] ?? pricing.defaultValues[desiredKey]);

      const sync = (c: number, d: number) => syncRatingRange(c, d, currentKey, desiredKey, rangeMin, rangeMax);

      return renderSliderShell({
        label: pricing.label,
        children: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {currentLabel}
                </label>
                <Input
                  inputMode="numeric"
                  value={formatRating(currentVal)}
                  onChange={(event) => {
                    const parsed = Number(event.target.value.replace(/[^\d]/g, ""));
                    if (!Number.isNaN(parsed)) sync(parsed, desiredVal);
                  }}
                  className="h-11 rounded-xl border-primary/25 bg-[#0b0b0b] text-center text-base font-black text-primary focus-visible:ring-primary"
                />
                {badgeFn && (
                  <div className="mt-1 text-center text-[11px] font-bold text-primary/70">
                    Level {badgeFn(currentVal)}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {desiredLabel}
                </label>
                <Input
                  inputMode="numeric"
                  value={formatRating(desiredVal)}
                  onChange={(event) => {
                    const parsed = Number(event.target.value.replace(/[^\d]/g, ""));
                    if (!Number.isNaN(parsed)) sync(currentVal, parsed);
                  }}
                  className="h-11 rounded-xl border-primary/25 bg-[#0b0b0b] text-center text-base font-black text-primary focus-visible:ring-primary"
                />
                {badgeFn && (
                  <div className="mt-1 text-center text-[11px] font-bold text-primary/70">
                    Level {badgeFn(desiredVal)}
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-black/25 px-4 py-4 shadow-[inset_0_0_18px_rgba(245,197,24,0.04)]">
              <Slider
                value={[currentVal, desiredVal]}
                min={rangeMin}
                max={rangeMax}
                step={rangeStep}
                minStepsBetweenThumbs={1}
                onValueChange={(nextValues) => {
                  if (nextValues.length < 2) return;
                  sync(nextValues[0], nextValues[1]);
                }}
                className="myboost-dual-slider"
                thumbClassName={sliderThumbClass}
              />
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span>{formatRating(rangeMin)}</span>
                <span>{formatRating(rangeMax)}</span>
              </div>
            </div>
          </div>
        ),
      });
    }

    if (pricing.range) {
      return renderRankRangeSlider(pricing.range);
    }


    if (pricing.type === "profile_rank_range") {
      const currentRank = Number(values.currentProfileRank ?? 1);
      const desiredRank = Number(values.desiredProfileRank ?? 40);

      return renderSliderShell({
        label: "Profile Rank",
        children: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Your Rank
                </label>
                <Input
                  inputMode="numeric"
                  value={currentRank}
                  onChange={(event) => {
                    const parsed = Number(event.target.value.replace(/[^\d]/g, ""));
                    if (!Number.isNaN(parsed)) syncRatingRange(parsed, desiredRank, "currentProfileRank", "desiredProfileRank", 1, 40);
                  }}
                  className="h-11 rounded-xl border-primary/25 bg-[#0b0b0b] text-center text-base font-black text-primary focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Desired Rank
                </label>
                <Input
                  inputMode="numeric"
                  value={desiredRank}
                  onChange={(event) => {
                    const parsed = Number(event.target.value.replace(/[^\d]/g, ""));
                    if (!Number.isNaN(parsed)) syncRatingRange(currentRank, parsed, "currentProfileRank", "desiredProfileRank", 1, 40);
                  }}
                  className="h-11 rounded-xl border-primary/25 bg-[#0b0b0b] text-center text-base font-black text-primary focus-visible:ring-primary"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-black/25 px-4 py-4 shadow-[inset_0_0_18px_rgba(245,197,24,0.04)]">
              <Slider
                value={[currentRank, desiredRank]}
                min={1}
                max={40}
                step={1}
                minStepsBetweenThumbs={1}
                onValueChange={(nextValues) => {
                  if (nextValues.length < 2) return;
                  syncRatingRange(nextValues[0], nextValues[1], "currentProfileRank", "desiredProfileRank", 1, 40);
                }}
                className="myboost-dual-slider"
                thumbClassName={sliderThumbClass}
              />
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span>1</span>
                <span>40</span>
              </div>
            </div>
          </div>
        ),
      });
    }
    if (pricing.perUnit) {
      return renderPerUnitSlider(pricing.perUnit, pricing.perUnit.unitLabel);
    }

    if (pricing.tieredPerUnit) {
      return renderTieredPerUnit(pricing.tieredPerUnit);
    }

    if (pricing.coaching) {
      const { coachKey, hoursKey, coaches, min, max, step } = pricing.coaching;
      const activeCoachName = String(values[coachKey] ?? coaches[0].name);
      const activeCoach = coaches.find((option) => option.name === activeCoachName) ?? coaches[0];
      const hours = Math.min(Math.max(Number(values[hoursKey] ?? min), min), max);
      const setHours = (next: number) => {
        if (Number.isNaN(next)) return;
        setValue(hoursKey, Math.min(Math.max(Math.round(next), min), max));
      };

      return renderSliderShell({
        label: "Coaching Setup",
        children: (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-2">
              {coaches.map((option) => {
                const active = option.name === activeCoach.name;
                return (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => setValue(coachKey, option.name)}
                    className={`rounded-lg border px-2 py-3 text-center transition-all ${
                      active
                        ? "border-primary bg-primary/10 shadow-[0_0_12px_hsl(48_100%_50%_/_0.2)]"
                        : "border-border/50 bg-secondary/50 hover:border-primary/30"
                    }`}
                  >
                    <div className={`text-xs font-bold ${active ? "text-primary" : "text-foreground"}`}>{option.name}</div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">{formatUsd(option.pricePerHour)}/hr</div>
                  </button>
                );
              })}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/25 bg-[#0b0b0b] px-4 py-3">
                <div className="flex items-center gap-2">
                  <Input
                    inputMode="numeric"
                    value={hours}
                    onChange={(event) => setHours(Number(event.target.value.replace(/[^\d]/g, "")))}
                    className="h-11 w-24 rounded-xl border-primary/25 bg-background text-center text-base font-black text-primary focus-visible:ring-primary"
                  />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    hour{hours === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-primary">{formatUsd(hours * activeCoach.pricePerHour)}</div>
                  <div className="text-[11px] text-muted-foreground">{formatUsd(activeCoach.pricePerHour)} / hour</div>
                </div>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-black/25 px-4 py-4 shadow-[inset_0_0_18px_rgba(245,197,24,0.04)]">
                <Slider
                  value={[hours]}
                  min={min}
                  max={max}
                  step={step}
                  onValueChange={([next]) => setHours(next)}
                  className="myboost-dual-slider"
                  thumbClassName={sliderThumbClass}
                />
                <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
              </div>
            </div>
          </div>
        ),
      });
    }

    if (pricing.globalElite) {
      const ranks = Object.keys(pricing.globalElite.prices);
      const currentKey = pricing.globalElite.currentKey;
      const currentRank = String(values[currentKey] ?? ranks[0]);
      const rankIndex = getSafeIndex(ranks.indexOf(currentRank), ranks.length - 1);

      return renderSliderShell({
        label: "Global Elite Boost",
        children: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Current Rank
                </label>
                <div className="flex h-11 items-center justify-center rounded-xl border border-primary/25 bg-[#0b0b0b] text-base font-black text-primary">
                  {ranks[rankIndex]}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Desired Rank
                </label>
                <div className="flex h-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-base font-black text-primary">
                  {pricing.globalElite.desiredLabel}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-black/25 px-4 py-4 shadow-[inset_0_0_18px_rgba(245,197,24,0.04)]">
              <Slider
                value={[rankIndex]}
                min={0}
                max={ranks.length - 1}
                step={1}
                onValueChange={([nextIndex]) => setValue(currentKey, ranks[getSafeIndex(nextIndex, ranks.length - 1)])}
                className="myboost-dual-slider"
                thumbClassName={sliderThumbClass}
              />
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span>{ranks[0]}</span>
                <span>{ranks[ranks.length - 1]}</span>
              </div>
            </div>
          </div>
        ),
      });
    }

    return null;
  };

  const buildOrderOptions = () => {
    const options: Record<string, string> = {};

    if (pricing?.type === "rating_range") {
      const rc = pricing.ratingConfig;
      const ck = rc?.currentKey ?? "currentRating";
      const dk = rc?.desiredKey ?? "desiredRating";
      const cl = rc?.currentLabel ?? "Current Rating";
      const dl = rc?.desiredLabel ?? "Desired Rating";
      const cv = Number(values[ck] ?? 0);
      const dv = Number(values[dk] ?? 0);
      options[cl] = cv.toLocaleString() + (rc?.formatBadge ? ` (Level ${rc.formatBadge(cv)})` : "");
      options[dl] = dv.toLocaleString() + (rc?.formatBadge ? ` (Level ${rc.formatBadge(dv)})` : "");
    } else if (pricing?.range) {
      options[pricing.range.currentLabel] = String(values[pricing.range.currentKey]);
      options[pricing.range.desiredLabel] = String(values[pricing.range.desiredKey]);
    } else if (pricing?.type === "profile_rank_range") {
      options["Your Rank"] = String(values.currentProfileRank);
      options["Desired Rank"] = String(values.desiredProfileRank);
    } else if (pricing?.perUnit) {
      const qty = Number(values[pricing.perUnit.unitKey] ?? pricing.perUnit.min);
      options[pricing.perUnit.unitLabel] = `${qty.toLocaleString()} ${pricing.perUnit.unitNoun}${qty === 1 ? "" : "s"}`;
    } else if (pricing?.tieredPerUnit) {
      const tu = pricing.tieredPerUnit;
      const tierValue = String(values[tu.tierKey] ?? tu.tiers[0].value);
      const tier = tu.tiers.find((t) => t.value === tierValue) ?? tu.tiers[0];
      options[tu.tierLabel] = tier.label;
      const qty = Number(values[tu.unitKey] ?? tu.min);
      options[tu.unitLabel] = `${qty.toLocaleString()} ${tu.unitNoun}${qty === 1 ? "" : "s"}`;
    } else if (pricing?.coaching) {
      options["Coach"] = String(values[pricing.coaching.coachKey]);
      const hours = Number(values[pricing.coaching.hoursKey] ?? pricing.coaching.min);
      options["Hours"] = `${hours} hour${hours === 1 ? "" : "s"}`;
    } else if (pricing?.globalElite) {
      options["Current Rank"] = String(values[pricing.globalElite.currentKey]);
      options["Desired Rank"] = pricing.globalElite.desiredLabel;
    }

    options["Service Method"] = selectedMethod.label;
    selectedFeatureList.forEach((feature) => {
      options[feature.label] = modifierLabel(feature.multiplier);
    });
    options["Delivery Speed"] = `${selectedSpeed.label} (${modifierLabel(selectedSpeed.multiplier)})`;

    if (appliedPromo) {
      options["Promo Code"] = `${appliedPromo.code} (-${appliedPromo.discount_percent}%)`;
    }

    return options;
  };

  const handleAddToCart = () => {
    if (validationMessage) return;

    const featureMap: Record<string, boolean> = {};
    cs2AdditionalFeatures.forEach((feature) => {
      featureMap[feature.id] = Boolean(selectedFeatures[feature.id]);
    });

    const modifiers: Record<string, number> = {
      boostMethodModifier: selectedMethod.multiplier - 1,
      deliverySpeedModifier: selectedSpeed.multiplier - 1,
      promoDiscount: priceResult.promoDiscount,
    };
    cs2AdditionalFeatures.forEach((feature) => {
      modifiers[`${feature.id}Modifier`] = selectedFeatures[feature.id] ? feature.multiplier - 1 : 0;
    });

    onAddToCart({
      game: gameTitle,
      gameSlug: "cs2",
      service: service.name,
      options: buildOrderOptions(),
      currency: "USD",
      boostMethod: selectedMethod.label,
      additionalFeatures: featureMap,
      modifiers,
      speed,
      basePrice: priceResult.basePrice,
      price: priceResult.finalPrice,
      oldPrice: hasDiscount ? priceResult.subtotal : undefined,
      estimatedTime: service.estimatedTime || "TBD",
    });
  };

  return (
    <div className="space-y-6">
      {renderMainCalculator()}

      {validationMessage ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {validationMessage}
        </div>
      ) : null}

      <div>
        <label className="mb-2 flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.14em] text-foreground">
          Service Method
          <InfoHint text="How the boost is completed. Piloted is fastest; Self-play and Duo keep you in the game for a higher price." />
        </label>
        <div className={`grid gap-2 ${methodOptions.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {methodOptions.map((opt) => {
            const active = method === opt.id;
            const button = (
              <button
                type="button"
                onClick={() => {
                  setMethod(opt.id as Cs2Method);
                  if (service.id !== "coaching" && opt.id !== "piloted") setSelectedFeatures({});
                }}
                className={`h-full w-full rounded-lg border px-3 py-3 text-left transition-all ${
                  active
                    ? "border-primary bg-primary text-black shadow-[0_0_12px_hsl(48_100%_50%_/_0.25)]"
                    : "border-primary/35 bg-secondary/50 text-white hover:border-primary"
                }`}
              >
                <div className="text-sm font-bold uppercase tracking-wide">{opt.label}</div>
                <div className={`mt-1 text-[11px] uppercase tracking-[0.16em] ${active ? "text-black/80" : "text-muted-foreground"}`}>
                  {modifierLabel(opt.multiplier)}
                </div>
              </button>
            );
            return opt.description ? (
              <Tooltip key={opt.id}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent className="max-w-[15rem] text-xs leading-relaxed">{opt.description}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={opt.id}>{button}</div>
            );
          })}
        </div>
      </div>

      {showAdditionalFeatures ? (
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.14em] text-foreground">
            Additional Features
            <InfoHint text="Optional extras. Each one adds its percentage on top of the base price." />
          </label>
          <div className="scrollbar-hidden max-h-64 space-y-2 overflow-y-auto pr-0">
            {cs2AdditionalFeatures.map((feature) => (
              <label
                key={feature.id}
                htmlFor={`cs2-${feature.id}`}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border/50 bg-secondary/30 px-4 py-3 transition-all hover:border-primary/30"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`cs2-${feature.id}`}
                    checked={Boolean(selectedFeatures[feature.id])}
                    onCheckedChange={(checked) =>
                      setSelectedFeatures((current) => ({ ...current, [feature.id]: checked === true }))
                    }
                    className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <span className="text-sm font-medium text-foreground">{feature.label}</span>
                  {feature.description ? <InfoHint text={feature.description} /> : null}
                </div>
                <span className="text-sm font-bold text-primary">{modifierLabel(feature.multiplier)}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
          Delivery Speed
          <InfoHint text="Faster tiers prioritise your order in the queue for an extra charge." />
        </label>
        <div className="grid grid-cols-3 gap-2">
          {cs2DeliverySpeedOptions.map((opt) => {
            const button = (
              <button
                type="button"
                onClick={() => setSpeed(opt.value)}
                className={`h-full w-full rounded-lg border px-2 py-3 text-center transition-all ${
                  speed === opt.value
                    ? "border-primary bg-primary/10 shadow-[0_0_12px_hsl(48_100%_50%_/_0.2)]"
                    : "border-border/50 bg-secondary/50 hover:border-primary/30"
                }`}
              >
                <span className={`text-xs font-semibold ${speed === opt.value ? "text-primary" : "text-foreground"}`}>
                  {opt.label}
                </span>
                {opt.multiplier > 1 && (
                  <span className="mt-0.5 block text-[10px] text-muted-foreground">
                    {modifierLabel(opt.multiplier)}
                  </span>
                )}
              </button>
            );
            return opt.description ? (
              <Tooltip key={opt.value}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent className="max-w-[15rem] text-xs leading-relaxed">{opt.description}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={opt.value}>{button}</div>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
          Promo Code
          <InfoHint text="Have a promo or loyalty code? Apply it here — it carries over to your cart, so you only enter it once per order." />
        </label>
        <PromoCodeInput
          appliedCode={appliedPromo}
          onApply={setAppliedPromo}
          onRemove={() => setAppliedPromo(null)}
          orderTotal={priceResult.subtotal}
        />
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 transition-all duration-200 ease-in-out">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Price</p>
            <p className="mt-1 text-3xl font-black text-primary drop-shadow-[0_0_10px_hsl(48_100%_50%_/_0.45)] transition-all duration-200 ease-in-out">
              {validationMessage ? "$0.00" : priceResult.formattedFinalPrice}
            </p>
            {showOriginalPrice && struckPrice !== null ? (
              <p className="text-xs text-muted-foreground line-through">{formatUsd(struckPrice)}</p>
            ) : null}
            {!validationMessage && hasDiscount && appliedPromo ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <Tag className="h-3 w-3" /> {appliedPromo.code} -{appliedPromo.discount_percent}%
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  You save {formatUsd(priceResult.subtotal - priceResult.finalPrice)}
                </span>
              </div>
            ) : null}
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{service.estimatedTime}</span>
            </div>
            <div className="mt-1 flex items-center justify-end gap-1.5 text-xs text-primary">
              <Zap className="h-3.5 w-3.5" />
              <span>15 min start</span>
            </div>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={Boolean(validationMessage)}
          size="lg"
          className="btn-yellow mt-4 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box-intense disabled:pointer-events-none disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secure</span>
        <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" /> Fast</span>
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary" /> 24/7 Support</span>
      </div>
    </div>
  );
};

export default Cs2ServiceConfigurator;
