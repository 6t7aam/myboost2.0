import { useMemo, useState } from "react";
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
import { RustService } from "@/data/rustServices";
import { SpeedOption } from "@/contexts/CartContext";

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

const RustServiceConfigurator = ({
  service,
  onAddToCart,
}: RustServiceConfiguratorProps) => {
  const isHourly = service.calculatorType === "hourly";
  const isQuantity = service.calculatorType === "quantity";
  const isFixed = service.calculatorType === "fixed";

  const qtyMin = service.qtyMin ?? 1;
  const qtyMax = service.qtyMax ?? 50;
  const qtyStep = service.qtyStep ?? 1;
  const qtyDefault = service.qtyDefault ?? qtyMin;
  const packSize = service.packSize ?? 1;

  const [hours, setHours] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(qtyDefault);
  const [speed, setSpeed] = useState<SpeedOption>("normal");

  const basePrice = useMemo(() => {
    if (isHourly) return service.price * hours;
    if (isQuantity) return service.price * quantity;
    return service.price;
  }, [service.price, isHourly, isQuantity, hours, quantity]);

  const deliveryModifier = SPEEDS.find((s) => s.value === speed)?.modifier ?? 0;
  const totalModifier = 1 + deliveryModifier;
  const finalPrice = basePrice * totalModifier;
  const cashback = finalPrice * CASHBACK_RATE;

  const handleQtyInput = (raw: string) => {
    const n = parseInt(raw, 10);
    setQuantity(Number.isFinite(n) ? clamp(n, qtyMin, qtyMax) : qtyMin);
  };

  const handleHoursInput = (raw: string) => {
    const n = parseInt(raw, 10);
    setHours(Number.isFinite(n) ? clamp(n, 1, 24) : 1);
  };

  const totalItems = packSize * quantity;
  const itemLabel = service.packUnitLabel ?? service.qtyUnit ?? "items";

  const handleAdd = () => {
    const options: Record<string, string> = {};
    if (isHourly) {
      options["Hours"] = `${hours}`;
    } else if (isQuantity) {
      if (packSize > 1) {
        options["Quantity"] = `${quantity} × pack of ${packSize} = ${totalItems} ${itemLabel}`;
      } else {
        options["Quantity"] = `${quantity} ${itemLabel}`;
      }
    }
    if (speed !== "normal") {
      options["Delivery"] = SPEEDS.find((s) => s.value === speed)?.label ?? speed;
    } else {
      options["Delivery"] = "Standard";
    }

    onAddToCart({
      game: "Rust",
      gameSlug: "rust",
      serviceId: service.id,
      serviceName: service.title,
      category: service.category,
      calculatorType: service.calculatorType,
      quantity: isQuantity ? quantity : undefined,
      hours: isHourly ? hours : undefined,
      unit: isHourly
        ? service.unit
        : isQuantity
          ? service.qtyUnit ?? "item"
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

        {isQuantity && (
          <div>
            <div className="mb-3 flex items-end justify-between">
              <label className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
                Quantity {service.qtyUnit ? `(${service.qtyUnit}s)` : ""}
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setQuantity((v) => clamp(v - qtyStep, qtyMin, qtyMax))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 bg-secondary/60 text-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQtyInput(e.target.value)}
                  min={qtyMin}
                  max={qtyMax}
                  step={qtyStep}
                  className="h-8 w-16 border-border/50 bg-secondary/50 text-center text-sm"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((v) => clamp(v + qtyStep, qtyMin, qtyMax))
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
              min={qtyMin}
              max={qtyMax}
              step={qtyStep}
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>
                {qtyMin} {service.qtyUnit ?? "item"}
              </span>
              <span>
                {qtyMax} {service.qtyUnit ?? "item"}s
              </span>
            </div>

            {packSize > 1 && (
              <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-[11px] font-medium text-foreground/85">
                <span className="text-primary">You receive: </span>
                {totalItems} {itemLabel}
                <span className="text-muted-foreground"> · {quantity} × pack of {packSize}</span>
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
              {totalModifier !== 1 && (
                <p className="text-xs text-muted-foreground line-through">
                  ${basePrice.toFixed(2)}
                </p>
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
