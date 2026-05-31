import { useEffect, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Clock,
  Coins,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Zap,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RustService, RustVariant } from "@/data/rustServices";
import { SpeedOption, useCart } from "@/contexts/CartContext";
import PromoCodeInput from "@/components/PromoCodeInput";
import { SALE_ACTIVE, GLOBAL_SALE_RATIO, SALE_BADGE_LABEL } from "@/config/pricing";

interface SpeedDef {
  value: SpeedOption;
  label: string;
  modifier: number;
  description: string;
}

const SPEEDS: SpeedDef[] = [
  {
    value: "normal",
    label: "Standard",
    modifier: 0,
    description: "Normal queue. Order starts within 15 minutes of payment.",
  },
  {
    value: "express",
    label: "Express",
    modifier: 0.2,
    description: "Priority queueing for a faster scheduling slot.",
  },
  {
    value: "super-express",
    label: "Super Express",
    modifier: 0.3,
    description: "Top of the queue — your order is picked up immediately.",
  },
];

const CASHBACK_RATE = 0.05;

export interface RustOrderPayload {
  game: "Rust";
  gameSlug: "rust";
  serviceId: string;
  serviceName: string;
  category: string;
  calculatorType: RustService["calculatorType"];
  variantId?: string;
  variantTitle?: string;
  quantity?: number;
  hours?: number;
  unit?: string;
  basePrice: number;
  finalPrice: number;
  currency: "USD";
  boostMethod: "Piloted";
  additionalFeatures: { liveStream: boolean };
  deliverySpeed: SpeedOption;
  modifiers: {
    boostMethodModifier: number;
    liveStreamModifier: number;
    deliveryModifier: number;
  };
  estimatedTime: string;
  options: Record<string, string>;
}

interface RustServiceConfiguratorProps {
  service: RustService;
  onAddToCart: (order: RustOrderPayload) => void;
}

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const formatInt = (n: number) => n.toLocaleString("en-US");

/** Pull the active quantity-config from either the variant or the parent service. */
const useQtyConfig = (service: RustService, variant: RustVariant | null) => {
  return useMemo(() => {
    const src = variant ?? service;
    const qtyMin = src.qtyMin ?? 1;
    const qtyMax = src.qtyMax ?? 50;
    const qtyStep = src.qtyStep ?? 1;
    const qtyDefault = src.qtyDefault ?? qtyMin;
    const packSize = src.packSize ?? 1;
    const packUnitLabel = src.packUnitLabel ?? src.qtyUnit ?? "items";
    const qtyUnit = src.qtyUnit ?? "item";
    const price = variant?.price ?? service.price;
    return { qtyMin, qtyMax, qtyStep, qtyDefault, packSize, packUnitLabel, qtyUnit, price };
  }, [service, variant]);
};

const RustServiceConfigurator = ({
  service,
  onAddToCart,
}: RustServiceConfiguratorProps) => {
  const { appliedPromo, setAppliedPromo } = useCart();
  const isHourly = service.calculatorType === "hourly";
  const isQuantity = service.calculatorType === "quantity";
  const isFixed = service.calculatorType === "fixed";
  const isSelector = service.calculatorType === "selector";
  const variants = service.variants ?? [];

  // Variant selection (selector calculators only)
  const [variantId, setVariantId] = useState<string>(variants[0]?.id ?? "");
  const variant = useMemo<RustVariant | null>(
    () => (isSelector ? variants.find((v) => v.id === variantId) ?? null : null),
    [isSelector, variants, variantId],
  );

  const qtyCfg = useQtyConfig(service, variant);

  // Local UI state
  const [hours, setHours] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(qtyCfg.qtyDefault);
  const [speed, setSpeed] = useState<SpeedOption>("normal");

  // When variant changes, reset quantity to the variant's default and clamp.
  useEffect(() => {
    if (!isSelector) return;
    setQuantity(qtyCfg.qtyDefault);
  }, [isSelector, variantId, qtyCfg.qtyDefault]);

  // Keep quantity inside variant bounds whenever variant bounds shift.
  useEffect(() => {
    setQuantity((q) => clamp(q, qtyCfg.qtyMin, qtyCfg.qtyMax));
  }, [qtyCfg.qtyMin, qtyCfg.qtyMax]);

  const basePrice = useMemo(() => {
    if (isHourly) return service.price * hours;
    if (isQuantity) return service.price * quantity;
    if (isSelector) return qtyCfg.price * quantity;
    return service.price;
  }, [isHourly, isQuantity, isSelector, service.price, hours, quantity, qtyCfg.price]);

  const deliveryModifier = SPEEDS.find((s) => s.value === speed)?.modifier ?? 0;
  const totalModifier = 1 + deliveryModifier;
  const priceBeforeSale = basePrice * totalModifier;
  const finalPrice = SALE_ACTIVE ? priceBeforeSale * GLOBAL_SALE_RATIO : priceBeforeSale;
  const cashback = finalPrice * CASHBACK_RATE;

  const handleQtyInput = (raw: string) => {
    const n = parseInt(raw, 10);
    setQuantity(
      Number.isFinite(n) ? clamp(n, qtyCfg.qtyMin, qtyCfg.qtyMax) : qtyCfg.qtyMin,
    );
  };

  const handleHoursInput = (raw: string) => {
    const n = parseInt(raw, 10);
    setHours(Number.isFinite(n) ? clamp(n, 1, 24) : 1);
  };

  const totalItems = qtyCfg.packSize * quantity;
  const itemLabel = qtyCfg.packUnitLabel;
  const showsPack = (isQuantity || isSelector) && qtyCfg.packSize > 1;

  const handleAdd = () => {
    const options: Record<string, string> = {};

    if (isSelector && variant) {
      options[service.title] = variant.title;
    }

    if (isHourly) {
      options["Hours"] = `${hours}`;
    } else if (isQuantity || isSelector) {
      if (qtyCfg.packSize > 1) {
        options["Quantity"] = `${quantity} × pack of ${qtyCfg.packSize} = ${formatInt(totalItems)} ${itemLabel}`;
      } else {
        options["Quantity"] = `${quantity} ${itemLabel}`;
      }
    }

    options["Delivery"] =
      speed === "normal" ? "Standard" : SPEEDS.find((s) => s.value === speed)?.label ?? speed;

    const displayName =
      isSelector && variant ? `${service.title} — ${variant.title}` : service.title;

    onAddToCart({
      game: "Rust",
      gameSlug: "rust",
      serviceId: service.id,
      serviceName: displayName,
      category: service.category,
      calculatorType: service.calculatorType,
      variantId: variant?.id,
      variantTitle: variant?.title,
      quantity: isQuantity || isSelector ? quantity : undefined,
      hours: isHourly ? hours : undefined,
      unit: isHourly
        ? service.unit
        : isQuantity || isSelector
          ? qtyCfg.qtyUnit
          : undefined,
      basePrice,
      finalPrice,
      currency: "USD",
      boostMethod: "Piloted",
      additionalFeatures: { liveStream: false },
      deliverySpeed: speed,
      modifiers: {
        boostMethodModifier: 0,
        liveStreamModifier: 0,
        deliveryModifier,
      },
      estimatedTime: service.delivery,
      options,
    });
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="space-y-5">
        {/* --- Variant selector (selector mode only) --- */}
        {isSelector && variants.length > 0 && (
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
              Select {service.title.replace(/s$/, "")}
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {variants.map((v) => {
                const active = v.id === variantId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={`group relative rounded-lg border px-2.5 py-2 text-left transition-all ${
                      active
                        ? "border-primary bg-primary/12 shadow-[0_0_12px_hsl(48_100%_50%_/_0.18)]"
                        : "border-border/50 bg-secondary/40 hover:border-primary/40"
                    }`}
                  >
                    <div
                      className={`text-[12px] font-bold uppercase tracking-wide leading-tight ${
                        active ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {v.title}
                    </div>
                    <div className="mt-0.5 flex items-center justify-between gap-2 text-[10px]">
                      <span
                        className={`uppercase tracking-wide ${
                          active ? "text-primary/85" : "text-muted-foreground"
                        }`}
                      >
                        {v.blurb ?? `${v.packSize ?? 1} per unit`}
                      </span>
                      <span
                        className={`font-bold ${
                          active ? "text-primary" : "text-foreground/80"
                        }`}
                      >
                        ${v.price.toFixed(2)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- Quantity / Hours --- */}
        {isFixed && (
          <div className="rounded-xl border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="font-semibold uppercase tracking-wider">
                Fixed-Price Service
              </span>
            </div>
            <p className="mt-1 text-xs">No configuration needed — set delivery speed below.</p>
          </div>
        )}

        {isHourly && (
          <div>
            <div className="mb-3 flex items-end justify-between">
              <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
                Hours
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Decrease hours"
                  onClick={() => setHours((v) => clamp(v - 1, 1, 24))}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 bg-secondary/60 text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <Input
                  type="number"
                  value={hours}
                  onChange={(e) => handleHoursInput(e.target.value)}
                  min={1}
                  max={24}
                  className="h-8 w-16 border-border/50 bg-secondary/50 text-center text-sm"
                />
                <button
                  type="button"
                  aria-label="Increase hours"
                  onClick={() => setHours((v) => clamp(v + 1, 1, 24))}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 bg-secondary/60 text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <Slider
              value={[hours]}
              onValueChange={([v]) => setHours(v)}
              min={1}
              max={24}
              step={1}
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>1 hr</span>
              <span>24 hrs</span>
            </div>
          </div>
        )}

        {(isQuantity || isSelector) && (
          <div>
            <div className="mb-3 flex items-end justify-between">
              <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
                Quantity ({qtyCfg.qtyUnit}
                {quantity === 1 ? "" : "s"})
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setQuantity((v) => clamp(v - qtyCfg.qtyStep, qtyCfg.qtyMin, qtyCfg.qtyMax))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 bg-secondary/60 text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQtyInput(e.target.value)}
                  min={qtyCfg.qtyMin}
                  max={qtyCfg.qtyMax}
                  step={qtyCfg.qtyStep}
                  className="h-8 w-16 border-border/50 bg-secondary/50 text-center text-sm"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((v) => clamp(v + qtyCfg.qtyStep, qtyCfg.qtyMin, qtyCfg.qtyMax))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 bg-secondary/60 text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <Slider
              value={[quantity]}
              onValueChange={([v]) => setQuantity(v)}
              min={qtyCfg.qtyMin}
              max={qtyCfg.qtyMax}
              step={qtyCfg.qtyStep}
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>
                {qtyCfg.qtyMin} {qtyCfg.qtyUnit}
              </span>
              <span>
                {qtyCfg.qtyMax} {qtyCfg.qtyUnit}s
              </span>
            </div>

            {showsPack && (
              <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-[11px] font-medium text-foreground/85">
                <span className="text-primary">You receive: </span>
                {formatInt(totalItems)} {itemLabel}
                <span className="text-muted-foreground">
                  {" · "}
                  {quantity} × pack of {qtyCfg.packSize}
                </span>
              </div>
            )}
          </div>
        )}

        {/* --- Delivery Speed --- */}
        <div>
          <label className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
            Delivery Speed
          </label>
          <div className="grid grid-cols-3 gap-2">
            {SPEEDS.map((opt) => {
              const active = speed === opt.value;
              return (
                <Tooltip key={opt.value}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setSpeed(opt.value)}
                      className={`group rounded-lg border px-2 py-3 text-center transition-all ${
                        active
                          ? "border-primary bg-primary/10 shadow-[0_0_12px_hsl(48_100%_50%_/_0.2)]"
                          : "border-border/50 bg-secondary/40 hover:border-primary/40"
                      }`}
                    >
                      <span
                        className={`block text-xs font-bold uppercase tracking-wide ${
                          active ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span
                        className={`mt-0.5 block text-[10px] ${
                          opt.modifier > 0 ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {opt.modifier > 0
                          ? `+${Math.round(opt.modifier * 100)}%`
                          : "Included"}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-[220px] text-xs leading-snug"
                  >
                    {opt.description}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* --- Promo Code --- */}
        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
            Promo Code
          </label>
          <PromoCodeInput
            appliedCode={appliedPromo}
            onApply={setAppliedPromo}
            onRemove={() => setAppliedPromo(null)}
            orderTotal={finalPrice}
          />
        </div>

        {/* --- Price block --- */}
        <div className="rounded-xl border border-primary/40 bg-gradient-to-b from-primary/10 to-primary/[0.03] p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Total Price
              </p>
              <p className="mt-1 text-3xl font-black text-primary drop-shadow-[0_0_10px_hsl(48_100%_50%_/_0.45)]">
                ${finalPrice.toFixed(2)}
              </p>
              {SALE_ACTIVE && (
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground line-through">
                    ${priceBeforeSale.toFixed(2)}
                  </p>
                  <span className="inline-flex items-center rounded-full border border-primary/60 bg-primary/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary">
                    {SALE_BADGE_LABEL}
                  </span>
                </div>
              )}
            </div>
            <div className="text-right text-xs">
              <div className="flex items-center justify-end gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{service.delivery}</span>
              </div>
              <div className="mt-1 flex items-center justify-end gap-1.5 text-primary">
                <Coins className="h-3.5 w-3.5" />
                <span className="font-semibold">+${cashback.toFixed(2)} cashback</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleAdd}
            size="lg"
            className="btn-yellow mt-4 w-full gap-2 rounded-xl font-black uppercase tracking-wider text-background glow-box-intense"
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </Button>
        </div>

        {/* --- Trust row --- */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> SSL Secure
          </span>
          <span className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-primary" /> Fast Start
          </span>
          <span className="flex items-center gap-1">
            <BadgeCheck className="h-3.5 w-3.5 text-primary" /> Refund Guarantee
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default RustServiceConfigurator;
