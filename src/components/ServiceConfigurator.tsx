import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Zap, Clock, ShoppingCart, MessageCircle } from "lucide-react";
import { ServiceOption } from "@/data/gameConfigs";
import { SpeedOption } from "@/contexts/CartContext";

interface ServiceConfiguratorProps {
  service: ServiceOption;
  gameSlug: string;
  gameTitle: string;
  onAddToCart: (order: OrderSummary) => void;
}

export interface OrderSummary {
  game: string;
  gameSlug: string;
  service: string;
  options: Record<string, string>;
  basePrice: number;
  price: number;
  speed: SpeedOption;
  estimatedTime: string;
}

const speedOptions: { value: SpeedOption; label: string; multiplier: number }[] = [
  { value: "normal", label: "Normal", multiplier: 1 },
  { value: "express", label: "⚡ Express", multiplier: 1.2 },
  { value: "super-express", label: "⚡ Super Express", multiplier: 1.3 },
];

const ServiceConfigurator = ({ service, gameSlug, gameTitle, onAddToCart }: ServiceConfiguratorProps) => {
  const [quantity, setQuantity] = useState(service.defaultValue || 1);
  const [selectedMap, setSelectedMap] = useState(service.maps?.[0] || "");
  const [selectedMode, setSelectedMode] = useState(service.modes?.[0]?.name || "");
  const [currentElo, setCurrentElo] = useState(service.min || 0);
  const [desiredElo, setDesiredElo] = useState((service.min || 0) + (service.step || 100) * 4);
  const [speed, setSpeed] = useState<SpeedOption>("normal");
  const [resourceQuantities, setResourceQuantities] = useState<Record<string, number>>(
    () => {
      const map: Record<string, number> = {};
      service.resources?.forEach((r) => { map[r.name] = r.defaultValue; });
      return map;
    }
  );

  const calculateTieredPrice = (): number => {
    if (!service.tiers) return 0;
    const from = Math.min(currentElo, desiredElo);
    const to = Math.max(currentElo, desiredElo);
    let total = 0;
    let remaining = to - from;
    let cursor = from;
    while (remaining > 0) {
      const tier = service.tiers.find((t) => cursor >= t.minElo && cursor < t.maxElo) || service.tiers[service.tiers.length - 1];
      const tierEnd = Math.min(tier.maxElo, to);
      const chunk = Math.min(remaining, tierEnd - cursor);
      total += (chunk / tier.per) * tier.pricePer;
      cursor += chunk;
      remaining -= chunk;
      if (chunk <= 0) break;
    }
    return Math.max(0, total);
  };

  const calculateResourcePrice = (): number => {
    if (!service.resources) return 0;
    return service.resources.reduce((sum, r) => {
      const qty = resourceQuantities[r.name] || 0;
      // pricePerUnit is price per unit (e.g. per 10k or per 1k)
      const unitSize = r.unit === "1k" ? 1000 : 10000;
      return sum + (qty / unitSize) * r.pricePerUnit;
    }, 0);
  };

  const calculateBasePrice = (): number => {
    if (service.type === "fixed") return service.fixedPrice || 0;
    if (service.type === "contact") return 0;
    if (service.type === "tiered") return calculateTieredPrice();
    if (service.type === "resources") return calculateResourcePrice();
    if (service.type === "raids") {
      const mode = service.modes?.find((m) => m.name === selectedMode);
      return (mode?.pricePerUnit || 0) * quantity;
    }
    return (service.pricePerUnit || 0) * quantity;
  };

  const basePrice = calculateBasePrice();
  const speedMultiplier = speedOptions.find((s) => s.value === speed)?.multiplier || 1;
  const price = basePrice * speedMultiplier;

  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

  const handleAddToCart = () => {
    const options: Record<string, string> = {};
    if (service.type === "tiered") {
      options["Current"] = `${currentElo} ${service.unit}`;
      options["Desired"] = `${desiredElo} ${service.unit}`;
    } else if (service.type === "resources" && service.resources) {
      service.resources.forEach((r) => {
        const qty = resourceQuantities[r.name] || 0;
        if (qty > 0) options[r.name] = `${qty.toLocaleString()} resources`;
      });
    } else if (service.type !== "fixed" && service.type !== "contact") {
      options["Quantity"] = `${quantity} ${service.unit || ""}`;
    }
    if (service.type === "raids") {
      options["Map"] = selectedMap;
      options["Mode"] = selectedMode;
    }
    if (speed !== "normal") {
      options["Speed"] = speedOptions.find((s) => s.value === speed)?.label || "";
    }
    onAddToCart({
      game: gameTitle,
      gameSlug,
      service: service.name,
      options,
      basePrice,
      price,
      speed,
      estimatedTime: service.estimatedTime || "TBD",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
          {service.tag && (
            <Badge className="border-none bg-primary/20 text-xs font-bold uppercase text-primary">{service.tag}</Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
      </div>

      {/* Contact-only */}
      {service.type === "contact" && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <MessageCircle className="mx-auto h-10 w-10 text-primary" />
          <div className="mt-3 text-sm text-foreground font-medium whitespace-pre-line">
            {service.contactMessage?.split("**").map((part, i) =>
              i % 2 === 1 ? <strong key={i} className="text-primary">{part}</strong> : part
            )}
          </div>
          <Button
            size="lg"
            className="mt-4 gap-2 rounded-xl font-bold uppercase tracking-wider glow-box-intense"
            onClick={() => window.open("https://discord.gg", "_blank")}
          >
            Contact on Discord
          </Button>
        </div>
      )}

      {/* Fixed */}
      {service.type === "fixed" && (
        <div className="rounded-xl border border-border/50 bg-secondary/50 p-4">
          <p className="text-sm text-muted-foreground">Fixed price — no configuration needed</p>
        </div>
      )}

      {/* Tiered (ELO/MMR) */}
      {service.type === "tiered" && service.tiers && (
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Current {service.unit}</label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={currentElo}
                onChange={(e) => setCurrentElo(clamp(parseInt(e.target.value) || 0, service.min || 0, service.max || 10000))}
                className="h-10 w-28 border-border/50 bg-secondary/50 text-center"
              />
              <Slider
                value={[currentElo]}
                onValueChange={([v]) => setCurrentElo(v)}
                min={service.min || 0}
                max={service.max || 10000}
                step={service.step || 25}
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Desired {service.unit}</label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={desiredElo}
                onChange={(e) => setDesiredElo(clamp(parseInt(e.target.value) || 0, service.min || 0, service.max || 10000))}
                className="h-10 w-28 border-border/50 bg-secondary/50 text-center"
              />
              <Slider
                value={[desiredElo]}
                onValueChange={([v]) => setDesiredElo(v)}
                min={service.min || 0}
                max={service.max || 10000}
                step={service.step || 25}
                className="flex-1"
              />
            </div>
          </div>
          <div className="rounded-lg border border-border/50 bg-secondary/30 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Price Tiers</p>
            {service.tiers.map((t) => (
              <div key={t.minElo} className="flex justify-between text-xs text-muted-foreground py-0.5">
                <span>{t.minElo}–{t.maxElo === 10000 || t.maxElo === 15000 || t.maxElo === 40000 ? `${t.maxElo}+` : t.maxElo} {service.unit}</span>
                <span className="text-foreground font-medium">${t.pricePer.toFixed(1)} / {t.per} {service.unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources */}
      {service.type === "resources" && service.resources && (
        <div className="space-y-3">
          {service.resources.map((r) => {
            const unitSize = r.unit === "1k" ? 1000 : 10000;
            const qty = resourceQuantities[r.name] || 0;
            const itemPrice = (qty / unitSize) * r.pricePerUnit;
            return (
              <div key={r.name} className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-foreground">{r.name}</span>
                  <span className="text-xs text-primary font-medium">
                    Price per {unitSize.toLocaleString()}: ${r.pricePerUnit}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={qty}
                    onChange={(e) => {
                      const val = clamp(parseInt(e.target.value) || 0, 0, r.max);
                      setResourceQuantities((prev) => ({ ...prev, [r.name]: val }));
                    }}
                    className="h-8 w-24 border-border/50 bg-secondary/50 text-center text-sm"
                  />
                  <Slider
                    value={[qty]}
                    onValueChange={([v]) => setResourceQuantities((prev) => ({ ...prev, [r.name]: v }))}
                    min={0}
                    max={r.max}
                    step={r.step}
                    className="flex-1"
                  />
                  <span className="text-xs font-bold text-primary w-16 text-right">
                    ${itemPrice.toFixed(2)}
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>{r.max.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Raids */}
      {service.type === "raids" && (
        <div className="space-y-5">
          {service.maps && (
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Select Map</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {service.maps.map((map) => (
                  <button
                    key={map}
                    onClick={() => setSelectedMap(map)}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                      selectedMap === map
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 bg-secondary/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {map}
                  </button>
                ))}
              </div>
            </div>
          )}
          {service.modes && (
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Select Mode</label>
              <div className="grid grid-cols-2 gap-2">
                {service.modes.map((mode) => (
                  <button
                    key={mode.name}
                    onClick={() => setSelectedMode(mode.name)}
                    className={`rounded-lg border px-4 py-3 text-left transition-all ${
                      selectedMode === mode.name
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-secondary/50 hover:border-primary/30"
                    }`}
                  >
                    <span className={`text-sm font-semibold ${selectedMode === mode.name ? "text-primary" : "text-foreground"}`}>
                      {mode.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">${mode.pricePerUnit.toFixed(2)} / raid</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <QuantitySlider
            label="Number of Raids"
            value={quantity}
            onChange={setQuantity}
            min={service.min || 1}
            max={service.max || 20}
            step={service.step || 1}
          />
        </div>
      )}

      {/* Standard slider */}
      {(service.type === "slider" || service.type === "slider-input") && (
        <QuantitySlider
          label={`Amount (${service.unit})`}
          value={quantity}
          onChange={setQuantity}
          min={service.min || 1}
          max={service.max || 100}
          step={service.step || 1}
          unit={service.unit}
        />
      )}

      {/* Express Options */}
      {service.type !== "contact" && (
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Delivery Speed</label>
          <div className="grid grid-cols-3 gap-2">
            {speedOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSpeed(opt.value)}
                className={`rounded-lg border px-3 py-3 text-center transition-all ${
                  speed === opt.value
                    ? "border-primary bg-primary/10 shadow-[0_0_12px_hsl(48_100%_50%_/_0.2)]"
                    : "border-border/50 bg-secondary/50 hover:border-primary/30"
                }`}
              >
                <span className={`text-sm font-semibold ${speed === opt.value ? "text-primary" : "text-foreground"}`}>
                  {opt.label}
                </span>
                {opt.multiplier > 1 && (
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    +{Math.round((opt.multiplier - 1) * 100)}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price block */}
      {service.type !== "contact" && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Price</p>
              <p className="mt-1 text-3xl font-black text-primary">${price.toFixed(2)}</p>
              {speed !== "normal" && (
                <p className="text-xs text-muted-foreground line-through">${basePrice.toFixed(2)}</p>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{service.estimatedTime}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-primary">
                <Zap className="h-3.5 w-3.5" />
                <span>15 min start</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="mt-4 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box-intense"
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      )}

      {/* Trust */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secure</span>
        <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" /> Fast</span>
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary" /> 24/7 Support</span>
      </div>
    </div>
  );
};

function QuantitySlider({ label, value, onChange, min, max, step, unit }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; unit?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              const n = parseInt(e.target.value);
              if (!isNaN(n)) onChange(Math.min(Math.max(n, min), max));
            }}
            min={min}
            max={max}
            className="h-8 w-20 border-border/50 bg-secondary/50 text-center text-sm"
          />
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <Slider value={[value]} onValueChange={([v]) => onChange(v)} min={min} max={max} step={step} className="mt-3" />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default ServiceConfigurator;
