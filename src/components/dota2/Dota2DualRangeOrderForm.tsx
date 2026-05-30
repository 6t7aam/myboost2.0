import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import Dota2BoostMethodAndOptions from "./Dota2BoostMethodAndOptions";
import { useCountUp } from "@/hooks/useCountUp";
import { useCart, type SpeedOption } from "@/contexts/CartContext";
import PromoCodeInput from "@/components/PromoCodeInput";
import {
  applyBoostOptionsPrice,
  dota2ServicePricing,
  type BoostMethod,
} from "@/data/dota2ServicePricing";

type Speed = "standard" | "express" | "super-express";

const SPEED_OPTIONS: { id: Speed; label: string; multiplier: number; cart: SpeedOption; badge?: string }[] = [
  { id: "standard", label: "Standard", multiplier: 1, cart: "normal" },
  { id: "express", label: "Express +20%", multiplier: 1.2, cart: "express", badge: "+20%" },
  { id: "super-express", label: "Super Express +30%", multiplier: 1.3, cart: "super-express", badge: "+30%" },
];

const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const snap = (value: number, step: number) => Math.round(value / step) * step;

const parseNumericInput = (raw: string) => {
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

interface Dota2DualRangeOrderFormProps {
  serviceId: "mmr-boost" | "behavior-score-boost";
  serviceName: string;
  orderTitle: string;
  chooserLabel: string;
  currentLabel: string;
  desiredLabel: string;
  unitLabel: string;
  min: number;
  max: number;
  step: number;
  defaultCurrent: number;
  defaultDesired: number;
  ctaLabel?: string;
  currentHint?: (value: number) => string;
  desiredHint?: (value: number) => string;
  calculateBasePrice: (current: number, desired: number) => number;
  differenceSummary: (difference: number) => string;
  selectionSummary: (current: number, desired: number) => string;
  rateDescription: string;
  estimatedTimeFor: (difference: number) => string;
}

const Dota2DualRangeOrderForm = ({
  serviceId,
  serviceName,
  orderTitle,
  chooserLabel,
  currentLabel,
  desiredLabel,
  unitLabel,
  min,
  max,
  step,
  defaultCurrent,
  defaultDesired,
  ctaLabel = "Order Now",
  currentHint,
  desiredHint,
  calculateBasePrice,
  differenceSummary,
  selectionSummary,
  rateDescription,
  estimatedTimeFor,
}: Dota2DualRangeOrderFormProps) => {
  const pricing = dota2ServicePricing[serviceId];
  const [range, setRange] = useState<[number, number]>([defaultCurrent, defaultDesired]);
  const [speed, setSpeed] = useState<Speed>("standard");
  const [boostMethod, setBoostMethod] = useState<BoostMethod>("piloted");
  const [checkedOptions, setCheckedOptions] = useState<Set<string>>(new Set());
  const { addItem, appliedPromo, setAppliedPromo } = useCart();

  const [currentValue, desiredValue] = range;
  const difference = Math.max(0, desiredValue - currentValue);
  const speedConfig = SPEED_OPTIONS.find((option) => option.id === speed) ?? SPEED_OPTIONS[0];
  const basePrice = calculateBasePrice(currentValue, desiredValue);
  const priceAfterSpeed = basePrice * speedConfig.multiplier;
  const totalPrice = applyBoostOptionsPrice({
    priceAfterSpeed,
    boostMethod,
    selfPlayMultiplier: pricing.selfPlayMultiplier,
    additionalOptions: pricing.additionalOptions,
    checkedOptionIds: checkedOptions,
  });

  const animatedPrice = useCountUp(`$${totalPrice.toFixed(2)}`, 220);

  const setCurrent = (next: number) => {
    const safeCurrent = clamp(snap(next, step), min, desiredValue - step);
    setRange([safeCurrent, desiredValue]);
  };

  const setDesired = (next: number) => {
    const safeDesired = clamp(snap(next, step), currentValue + step, max);
    setRange([currentValue, safeDesired]);
  };

  const handleRangeChange = (values: number[]) => {
    if (values.length < 2) return;
    setRange([values[0], values[1]]);
  };

  const handleBoostMethodChange = (method: BoostMethod) => {
    setBoostMethod(method);
    if (method === "self-play") {
      setCheckedOptions(new Set());
    }
  };

  const toggleOption = (id: string) => {
    setCheckedOptions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const breakdown = useMemo(() => {
    const lines: { label: string; amount: number }[] = [];
    let runningPrice = basePrice;

    if (speedConfig.multiplier > 1) {
      const nextPrice = basePrice * speedConfig.multiplier;
      lines.push({ label: speed === "express" ? "Express" : "Super Express", amount: nextPrice - runningPrice });
      runningPrice = nextPrice;
    }

    if (boostMethod === "self-play" && pricing.selfPlayMultiplier > 1) {
      const nextPrice = runningPrice * pricing.selfPlayMultiplier;
      lines.push({
        label: `Self-play +${Math.round((pricing.selfPlayMultiplier - 1) * 100)}%`,
        amount: nextPrice - runningPrice,
      });
      runningPrice = nextPrice;
    }

    if (boostMethod === "piloted") {
      for (const option of pricing.additionalOptions) {
        if (!checkedOptions.has(option.id) || option.percent <= 0) continue;
        const nextPrice = runningPrice * (1 + option.percent / 100);
        lines.push({ label: option.label, amount: nextPrice - runningPrice });
        runningPrice = nextPrice;
      }
    }

    return lines;
  }, [basePrice, boostMethod, checkedOptions, pricing.additionalOptions, pricing.selfPlayMultiplier, speed, speedConfig.multiplier]);

  const activeBadges = useMemo(() => {
    const badges: string[] = [];
    if (speedConfig.badge) {
      badges.push(`${speedConfig.badge} ${speed === "express" ? "Express" : "Super Express"}`);
    }
    if (boostMethod === "self-play") {
      const pct = Math.round((pricing.selfPlayMultiplier - 1) * 100);
      badges.push(pct > 0 ? `Self-play +${pct}%` : "Self-play");
    }
    if (boostMethod === "piloted") {
      for (const option of pricing.additionalOptions) {
        if (!checkedOptions.has(option.id)) continue;
        badges.push(option.percent > 0 ? `${option.label} +${option.percent}%` : option.label);
      }
    }
    return badges;
  }, [boostMethod, checkedOptions, pricing.additionalOptions, pricing.selfPlayMultiplier, speed, speedConfig.badge]);

  return (
    <>
      <h3 className="text-xl font-black uppercase text-foreground">{orderTitle}</h3>

      <div className="mt-6 space-y-5">
        <div>
          <label className="text-xs font-bold uppercase text-foreground">{chooserLabel}</label>

          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-start gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                {currentLabel}
              </label>
              <Input
                inputMode="numeric"
                value={formatNumber(currentValue)}
                onChange={(event) => setCurrent(parseNumericInput(event.target.value))}
                className="mt-2 h-12 border-primary/30 bg-[#111] text-center text-lg font-black text-primary focus-visible:ring-primary"
                aria-label={currentLabel}
              />
              {currentHint && (
                <div className="mt-1 text-center text-[11px] font-semibold uppercase text-muted-foreground">
                  {currentHint(currentValue)}
                </div>
              )}
            </div>

            <div className="pt-10 text-xl font-black text-primary" aria-hidden>
              -&gt;
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                {desiredLabel}
              </label>
              <Input
                inputMode="numeric"
                value={formatNumber(desiredValue)}
                onChange={(event) => setDesired(parseNumericInput(event.target.value))}
                className="mt-2 h-12 border-primary/30 bg-[#111] text-center text-lg font-black text-primary focus-visible:ring-primary"
                aria-label={desiredLabel}
              />
              {desiredHint && (
                <div className="mt-1 text-center text-[11px] font-semibold uppercase text-muted-foreground">
                  {desiredHint(desiredValue)}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 px-1">
            <Slider
              value={range}
              min={min}
              max={max}
              step={step}
              minStepsBetweenThumbs={1}
              onValueChange={handleRangeChange}
              className="myboost-dual-slider"
              thumbClassName="h-6 w-6 border-[3px] shadow-[0_0_14px_rgba(255,215,0,0.45)]"
            />
            <div className="mt-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span>{formatNumber(min)} {unitLabel}</span>
              <span>{formatNumber(max)} {unitLabel}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-foreground">Delivery Speed</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {SPEED_OPTIONS.map((option) => {
              const active = speed === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSpeed(option.id)}
                  className={`rounded-lg border px-2 py-2.5 text-[11px] font-bold uppercase transition-colors ${
                    active
                      ? "border-[#FFD700] bg-[#FFD700] text-black"
                      : "border-[rgba(255,215,0,0.3)] bg-[#111] text-white hover:border-[rgba(255,215,0,0.8)]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <Dota2BoostMethodAndOptions
          selfPlayMultiplier={pricing.selfPlayMultiplier}
          additionalOptions={pricing.additionalOptions}
          boostMethod={boostMethod}
          onBoostMethodChange={handleBoostMethodChange}
          checkedOptionIds={checkedOptions}
          onToggleOption={toggleOption}
        />

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-foreground">Promo Code</label>
          <PromoCodeInput
            appliedCode={appliedPromo}
            onApply={setAppliedPromo}
            onRemove={() => setAppliedPromo(null)}
            orderTotal={totalPrice}
          />
        </div>

        <div className="rounded-xl border-2 border-primary/30 bg-secondary/30 p-5 text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {differenceSummary(difference)}
          </div>
          <div className="mt-1 text-3xl font-black text-primary transition-all duration-200 ease">
            {animatedPrice}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {selectionSummary(currentValue, desiredValue)} | {speedConfig.label}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">{rateDescription}</div>

          {activeBadges.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {activeBadges.map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  className="border-primary/30 bg-primary/10 text-[10px] font-bold uppercase tracking-wide text-primary"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-3 text-[11px] text-muted-foreground">
            {`$${basePrice.toFixed(2)} base`}
            {breakdown.length > 0 ? ` + ${breakdown.map((line) => `$${line.amount.toFixed(2)} ${line.label.toLowerCase()}`).join(" + ")}` : ""}
            {` = $${totalPrice.toFixed(2)}`}
          </div>
        </div>

        <Button
          size="lg"
          className="w-full gap-2 py-5 text-base font-bold uppercase glow-box"
          onClick={() => {
            addItem({
              id: "",
              game: "Dota 2",
              gameSlug: "dota-2",
              service: serviceName,
              options: {
                current: String(currentValue),
                desired: String(desiredValue),
                difference: String(difference),
                speed,
                boostMethod,
                extras: Array.from(checkedOptions).join(", "),
              },
              speed: speedConfig.cart,
              basePrice,
              price: totalPrice,
              estimatedTime: estimatedTimeFor(difference),
            });
            toast.success(`${serviceName} added to cart!`);
          }}
        >
          {ctaLabel} <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default Dota2DualRangeOrderForm;
