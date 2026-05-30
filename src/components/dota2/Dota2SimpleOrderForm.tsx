/**
 * Single-slider order form shared by Calibration / Behavior Score / Win Rate
 * / Battle Cup. Each service supplies its own slider config, pricing config,
 * cart payload, optional extras (rendered above the slider).
 *
 * The MMR Boost page has its own custom form (dual-slider tiered pricing) and
 * does NOT use this component.
 */

import { ReactNode, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dota2BoostMethodAndOptions from "./Dota2BoostMethodAndOptions";
import {
  applyBoostOptionsPrice,
  dota2ServicePricing,
  type BoostMethod,
} from "@/data/dota2ServicePricing";
import { useCart, SpeedOption } from "@/contexts/CartContext";
import PromoCodeInput from "@/components/PromoCodeInput";
import { toast } from "sonner";

const rangeFill = (value: number, min: number, max: number) => {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${pct}%, #1a1a1a ${pct}%, #1a1a1a 100%)`,
  };
};

type Speed = "standard" | "express" | "super-express";
const SPEED_OPTIONS: { id: Speed; label: string; multiplier: number; cart: SpeedOption }[] = [
  { id: "standard", label: "Standard", multiplier: 1, cart: "normal" },
  { id: "express", label: "Express +20%", multiplier: 1.2, cart: "express" },
  { id: "super-express", label: "Super Express +30%", multiplier: 1.3, cart: "super-express" },
];

export interface Dota2SimpleOrderFormProps {
  serviceId: string;
  /** Cart label, e.g. "Calibration Boost". */
  serviceName: string;
  /** Order card title, e.g. "Order Calibration". */
  orderTitle: string;
  ctaLabel?: string;

  sliderLabel: string;
  unitSingular: string;
  unitPlural: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  pricePerUnit: number;

  /** Estimated time text for cart payload. */
  estimatedTimeFor: (quantity: number) => string;

  /** Optional extras rendered above the slider (e.g. rank, tier, role, region). */
  extrasAbove?: ReactNode;
  /**
   * Flat-dollar add-on applied after method multiplier, before % options.
   * Receives current quantity. Returns 0 if no adder.
   */
  flatAdder?: (quantity: number) => number;
  /** Extra fields merged into cart payload `options`. */
  extraCartFields?: Record<string, unknown>;
}

const Dota2SimpleOrderForm = ({
  serviceId,
  serviceName,
  orderTitle,
  ctaLabel = "Order Now",
  sliderLabel,
  unitSingular,
  unitPlural,
  min,
  max,
  step,
  defaultValue,
  pricePerUnit,
  estimatedTimeFor,
  extrasAbove,
  flatAdder,
  extraCartFields,
}: Dota2SimpleOrderFormProps) => {
  const PRICING = dota2ServicePricing[serviceId];
  const [quantity, setQuantity] = useState(defaultValue);
  const [speed, setSpeed] = useState<Speed>("standard");
  const [boostMethod, setBoostMethod] = useState<BoostMethod>("piloted");
  const [checkedOptions, setCheckedOptions] = useState<Set<string>>(new Set());
  const { addItem, appliedPromo, setAppliedPromo } = useCart();

  const speedMultiplier = SPEED_OPTIONS.find((s) => s.id === speed)!.multiplier;
  const basePrice = quantity * pricePerUnit;
  const priceAfterSpeed = basePrice * speedMultiplier;
  const flatExtra = flatAdder ? flatAdder(quantity) : 0;
  const totalPrice = applyBoostOptionsPrice({
    priceAfterSpeed,
    boostMethod,
    selfPlayMultiplier: PRICING?.selfPlayMultiplier ?? 1,
    additionalOptions: PRICING?.additionalOptions ?? [],
    checkedOptionIds: checkedOptions,
    flatAdder: flatExtra,
  });

  const handleBoostMethodChange = (m: BoostMethod) => {
    setBoostMethod(m);
    if (m === "self-play") setCheckedOptions(new Set());
  };

  const toggleOption = (id: string) => {
    setCheckedOptions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const unit = quantity === 1 ? unitSingular : unitPlural;

  return (
    <>
      <h3 className="text-xl font-black uppercase text-foreground">
        {orderTitle}
      </h3>

      <div className="mt-6 space-y-5">
        {extrasAbove}

        <div>
          <div className="flex items-baseline justify-between">
            <label className="text-xs font-bold uppercase text-foreground">{sliderLabel}</label>
            <span className="text-base font-black text-primary">
              {quantity} {unit}
            </span>
          </div>
          <input
            type="range"
            className="myboost-range mt-2"
            min={min}
            max={max}
            step={step}
            value={quantity}
            style={rangeFill(quantity, min, max)}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-foreground">Delivery Speed</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {SPEED_OPTIONS.map((opt) => {
              const active = speed === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSpeed(opt.id)}
                  className={`rounded-lg border py-2.5 px-2 text-[11px] font-bold uppercase transition-colors ${
                    active
                      ? "bg-[#FFD700] text-black border-[#FFD700]"
                      : "bg-[#111] text-white border-[rgba(255,215,0,0.3)] hover:border-[rgba(255,215,0,0.8)]"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {!PRICING?.hideBoostMethod && PRICING && (
          <Dota2BoostMethodAndOptions
            selfPlayMultiplier={PRICING.selfPlayMultiplier}
            additionalOptions={PRICING.additionalOptions}
            boostMethod={boostMethod}
            onBoostMethodChange={handleBoostMethodChange}
            checkedOptionIds={checkedOptions}
            onToggleOption={toggleOption}
          />
        )}

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
          <div className="text-3xl font-black text-primary">${totalPrice.toFixed(2)}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {quantity} {unit} × ${pricePerUnit.toFixed(2)} · {SPEED_OPTIONS.find((s) => s.id === speed)!.label}
          </div>
        </div>

        <Button
          size="lg"
          className="w-full gap-2 glow-box font-bold uppercase text-base py-5"
          onClick={() => {
            addItem({
              id: "",
              game: "Dota 2",
              gameSlug: "dota-2",
              service: serviceName,
              options: {
                quantity,
                speed,
                boostMethod,
                extras: Array.from(checkedOptions),
                ...(extraCartFields ?? {}),
              },
              speed: SPEED_OPTIONS.find((s) => s.id === speed)!.cart,
              basePrice,
              price: totalPrice,
              estimatedTime: estimatedTimeFor(quantity),
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

export default Dota2SimpleOrderForm;
