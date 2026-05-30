import { useMemo, useState } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import { useCart } from "@/contexts/CartContext";
import PromoCodeInput from "@/components/PromoCodeInput";
import { Dota2PaymentRow } from "./Dota2ServiceSections";
import {
  DOTA2_MMR_MAX,
  DOTA2_MMR_MIN,
  calculateBasePrice,
  calculateCompletionTime,
  calculateFinalPrice,
  getRankByMMR,
  mmrAdditionalOptions,
  mmrBehaviorScoreOptions,
  mmrBoostMethodOptions,
  normalizeMmrRange,
  type MmrAdditionalOptionId,
  type MmrBehaviorScoreOptionId,
  type MmrBoostMethodId,
} from "@/data/dota2MmrBoostCalculator";

const formatMmr = (value: number) => new Intl.NumberFormat("en-US").format(value);

const parseMmrInput = (value: string) => {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : null;
};

const sectionClassName = "space-y-4 border-t border-primary/15 pt-5 first:border-t-0 first:pt-0";

const optionButtonClass = (active: boolean) =>
  cn(
    "rounded-xl border px-4 py-3 text-left transition-all duration-150",
    active
      ? "border-primary bg-primary/15 text-primary shadow-[0_0_18px_hsl(48_100%_50%_/_0.14)]"
      : "border-border/70 bg-secondary/35 text-foreground/80 hover:border-primary/40 hover:text-primary",
  );

const Dota2MmrBoostCalculator = () => {
  const { addItem, appliedPromo, setAppliedPromo } = useCart();
  const [currentMMR, setCurrentMMR] = useState(0);
  const [desiredMMR, setDesiredMMR] = useState(8000);
  const [currentInput, setCurrentInput] = useState("0");
  const [desiredInput, setDesiredInput] = useState("8,000");
  const [behaviorScore, setBehaviorScore] = useState<MmrBehaviorScoreOptionId>("more-9000");
  const [boostMethod, setBoostMethod] = useState<MmrBoostMethodId>("piloted");
  const [selectedOptions, setSelectedOptions] = useState<Set<MmrAdditionalOptionId>>(new Set());

  const syncRange = (nextCurrent: number, nextDesired: number) => {
    setCurrentMMR(nextCurrent);
    setDesiredMMR(nextDesired);
    setCurrentInput(formatMmr(nextCurrent));
    setDesiredInput(formatMmr(nextDesired));
  };

  const updateCurrentValue = (rawValue: number) => {
    const [nextCurrent, nextDesired] = normalizeMmrRange(rawValue, desiredMMR, "current");
    syncRange(nextCurrent, nextDesired);
  };

  const updateDesiredValue = (rawValue: number) => {
    const [nextCurrent, nextDesired] = normalizeMmrRange(currentMMR, rawValue, "desired");
    syncRange(nextCurrent, nextDesired);
  };

  const currentRank = useMemo(() => getRankByMMR(currentMMR), [currentMMR]);
  const desiredRank = useMemo(() => getRankByMMR(desiredMMR), [desiredMMR]);
  const basePrice = useMemo(() => calculateBasePrice(currentMMR, desiredMMR), [currentMMR, desiredMMR]);
  const completionTime = useMemo(
    () => calculateCompletionTime(currentMMR, desiredMMR),
    [currentMMR, desiredMMR],
  );
  const finalPrice = useMemo(
    () => calculateFinalPrice(basePrice, behaviorScore, boostMethod, selectedOptions),
    [basePrice, behaviorScore, boostMethod, selectedOptions],
  );
  const animatedPrice = useCountUp(`$${finalPrice.toFixed(2)}`, 220);

  const selectedBehavior = useMemo(
    () => mmrBehaviorScoreOptions.find((option) => option.id === behaviorScore) ?? mmrBehaviorScoreOptions[0],
    [behaviorScore],
  );
  const selectedMethod = useMemo(
    () => mmrBoostMethodOptions.find((option) => option.id === boostMethod) ?? mmrBoostMethodOptions[0],
    [boostMethod],
  );
  const selectedOptionDetails = useMemo(
    () => mmrAdditionalOptions.filter((option) => selectedOptions.has(option.id)),
    [selectedOptions],
  );

  const activeBadges = useMemo(() => {
    const badges: string[] = [];
    if (selectedBehavior.modifier > 0 && selectedBehavior.accent) {
      badges.push(`${selectedBehavior.label} ${selectedBehavior.accent}`);
    }
    if (selectedMethod.modifier > 0) {
      badges.push(`${selectedMethod.label} +${Math.round(selectedMethod.modifier * 100)}%`);
    } else if (boostMethod === "self-play") {
      badges.push("Self-play");
    }
    for (const option of selectedOptionDetails) {
      badges.push(option.accent ? `${option.label} ${option.accent}` : option.label);
    }
    return badges;
  }, [boostMethod, selectedBehavior, selectedMethod, selectedOptionDetails]);

  const pricingBreakdown = useMemo(() => {
    const parts = [`$${basePrice.toFixed(2)} base`];
    if (selectedBehavior.modifier !== 0) {
      const prefix = selectedBehavior.modifier > 0 ? "+" : "";
      parts.push(`${prefix}${Math.round(selectedBehavior.modifier * 100)}% behavior score`);
    }
    if (selectedMethod.modifier !== 0) {
      const prefix = selectedMethod.modifier > 0 ? "+" : "";
      parts.push(`${prefix}${Math.round(selectedMethod.modifier * 100)}% ${selectedMethod.label.toLowerCase()}`);
    }
    for (const option of selectedOptionDetails) {
      const prefix = option.modifier > 0 ? "+" : "";
      parts.push(`${prefix}${Math.round(option.modifier * 100)}% ${option.label.toLowerCase()}`);
    }
    return `${parts.join(" | ")} = $${finalPrice.toFixed(2)}`;
  }, [basePrice, finalPrice, selectedBehavior, selectedMethod, selectedOptionDetails]);

  const orderPayload = useMemo(
    () => ({
      service: "Dota 2 MMR Service",
      currency: "USD",
      currentMMR,
      desiredMMR,
      currentRank: currentRank.title,
      desiredRank: desiredRank.title,
      behaviorScore: selectedBehavior.label,
      boostMethod: selectedMethod.label,
      additionalOptions: selectedOptionDetails.map((option) => option.label),
      basePrice,
      finalPrice,
      completionTime,
    }),
    [
      basePrice,
      completionTime,
      currentMMR,
      currentRank.title,
      desiredMMR,
      desiredRank.title,
      finalPrice,
      selectedBehavior.label,
      selectedMethod.label,
      selectedOptionDetails,
    ],
  );

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">Order MMR Service</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Dynamic segmented pricing, instant rank updates, and live delivery estimates.
        </p>
      </div>

      <section className={sectionClassName}>
        <div>
          <div className="text-sm font-bold text-foreground">Choose your current and desired MMR</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Current MMR
              </label>
              <Input
                inputMode="numeric"
                aria-label="Current MMR"
                value={currentInput}
                onChange={(event) => {
                  const parsed = parseMmrInput(event.target.value);
                  if (parsed === null) {
                    setCurrentInput("");
                    return;
                  }
                  updateCurrentValue(parsed);
                }}
                onBlur={() => {
                  const parsed = parseMmrInput(currentInput);
                  if (parsed === null) {
                    setCurrentInput(formatMmr(currentMMR));
                    return;
                  }
                  updateCurrentValue(parsed);
                }}
                className="mt-2 h-12 rounded-xl border-primary/25 bg-[#0b0b0b] text-center text-xl font-black text-primary focus-visible:ring-primary"
              />
            </div>

            <div className="hidden text-center text-2xl font-black text-primary sm:block" aria-hidden>
              {"->"}
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Desired MMR
              </label>
              <Input
                inputMode="numeric"
                aria-label="Desired MMR"
                value={desiredInput}
                onChange={(event) => {
                  const parsed = parseMmrInput(event.target.value);
                  if (parsed === null) {
                    setDesiredInput("");
                    return;
                  }
                  updateDesiredValue(parsed);
                }}
                onBlur={() => {
                  const parsed = parseMmrInput(desiredInput);
                  if (parsed === null) {
                    setDesiredInput(formatMmr(desiredMMR));
                    return;
                  }
                  updateDesiredValue(parsed);
                }}
                className="mt-2 h-12 rounded-xl border-primary/25 bg-[#0b0b0b] text-center text-xl font-black text-primary focus-visible:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-black/25 px-4 py-4">
          <Slider
            value={[currentMMR, desiredMMR]}
            min={DOTA2_MMR_MIN}
            max={DOTA2_MMR_MAX}
            step={1}
            minStepsBetweenThumbs={1}
            onValueChange={(values) => {
              if (values.length < 2) return;
              const [nextCurrent, nextDesired] = normalizeMmrRange(values[0], values[1], "both");
              syncRange(nextCurrent, nextDesired);
            }}
            className="myboost-dual-slider"
            thumbClassName="h-6 w-6 border-[3px] border-primary bg-background shadow-[0_0_16px_rgba(245,197,24,0.35)]"
          />
          <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span>0</span>
            <span>8,000</span>
          </div>
        </div>

      </section>

      <section className={sectionClassName}>
        <div className="text-sm font-bold text-foreground">Behavior score</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {mmrBehaviorScoreOptions.map((option) => {
            const active = behaviorScore === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setBehaviorScore(option.id)}
                className={optionButtonClass(active)}
              >
                <div className="text-sm font-semibold">{option.label}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {option.accent ?? "Standard rate"}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className={sectionClassName}>
        <div className="text-sm font-bold text-foreground">Service method</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {mmrBoostMethodOptions.map((option) => {
            const active = boostMethod === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setBoostMethod(option.id)}
                className={optionButtonClass(active)}
              >
                <div className="text-sm font-semibold">{option.label}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {option.modifier > 0 ? `+${Math.round(option.modifier * 100)}%` : "No extra charge"}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className={sectionClassName}>
        <div className="text-sm font-bold text-foreground">Additional options</div>
        <div className="mt-3 space-y-2">
          {mmrAdditionalOptions.map((option) => {
            const checked = selectedOptions.has(option.id);
            return (
              <label
                key={option.id}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-all duration-150",
                  checked
                    ? "border-primary/45 bg-primary/10"
                    : "border-border/70 bg-secondary/35 hover:border-primary/30",
                )}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(next) => {
                      const isChecked = Boolean(next);
                      setSelectedOptions((prev) => {
                        const updated = new Set(prev);
                        if (isChecked) updated.add(option.id);
                        else updated.delete(option.id);
                        return updated;
                      });
                    }}
                    className="h-5 w-5 rounded-md border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:text-black"
                  />
                  <span className="text-sm font-medium text-foreground">{option.label}</span>
                </div>
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-[0.14em]",
                    option.modifier < 0 ? "text-emerald-400" : "text-primary",
                  )}
                >
                  {option.accent}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      <section className={sectionClassName}>
        <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-black/40 to-black/50 p-5 shadow-[0_0_24px_rgba(245,197,24,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {`${formatMmr(currentMMR)} -> ${formatMmr(desiredMMR)} MMR`}
              </div>
              <div className="mt-2 text-4xl font-black text-primary transition-all duration-200 ease">
                {animatedPrice}
              </div>
            </div>
            <Badge className="border-primary/35 bg-primary/14 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              Cashback from 1%
            </Badge>
          </div>

          <div className="mt-3 text-sm text-muted-foreground">
            {currentRank.title} {"->"} {desiredRank.title}
          </div>

          {activeBadges.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {activeBadges.map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  className="border-primary/25 bg-black/25 text-[10px] font-bold uppercase tracking-[0.14em] text-primary"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-4 grid gap-2 rounded-xl border border-primary/10 bg-black/20 p-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-between gap-4">
              <span>Average start time</span>
              <span className="font-semibold text-foreground">15 minutes</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Order completion</span>
              <span className="font-semibold text-foreground">{completionTime}</span>
            </div>
          </div>

          <div className="mt-4 text-xs leading-relaxed text-muted-foreground">{pricingBreakdown}</div>
        </div>
      </section>

      <section className={sectionClassName}>
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-foreground">Promo Code</label>
          <PromoCodeInput
            appliedCode={appliedPromo}
            onApply={setAppliedPromo}
            onRemove={() => setAppliedPromo(null)}
            orderTotal={finalPrice}
          />
        </div>

        <Button
          size="lg"
          className="mt-4 w-full rounded-xl py-6 text-base font-bold uppercase shadow-[0_0_26px_rgba(245,197,24,0.18)]"
          onClick={() => {
            addItem({
              id: "",
              game: "Dota 2",
              gameSlug: "dota-2",
              service: orderPayload.service,
              options: {
                currency: "USD",
                currentMMR: String(orderPayload.currentMMR),
                desiredMMR: String(orderPayload.desiredMMR),
                currentRank: orderPayload.currentRank,
                desiredRank: orderPayload.desiredRank,
                behaviorScore: orderPayload.behaviorScore,
                boostMethod: orderPayload.boostMethod,
                additionalOptions: orderPayload.additionalOptions.join(", ") || "None",
                basePrice: orderPayload.basePrice.toFixed(2),
                finalPrice: orderPayload.finalPrice.toFixed(2),
                completionTime: orderPayload.completionTime,
              },
              currency: "USD",
              speed: "normal",
              basePrice: orderPayload.basePrice,
              price: orderPayload.finalPrice,
              estimatedTime: orderPayload.completionTime,
            });
            toast.success("Dota 2 MMR Service added to cart!");
          }}
        >
          <ShoppingCart className="h-5 w-5" />
          Add to cart
          <ArrowRight className="h-5 w-5" />
        </Button>

        <Dota2PaymentRow />
      </section>
    </div>
  );
};

export default Dota2MmrBoostCalculator;
