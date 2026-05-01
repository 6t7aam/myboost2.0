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
  const [currentRank, setCurrentRank] = useState(service.ranks?.[0] || "");
  const [desiredRank, setDesiredRank] = useState(service.ranks?.[4] || "");
  const [currentDivision, setCurrentDivision] = useState("IV");
  const [desiredDivision, setDesiredDivision] = useState("IV");
  const [warlordStars, setWarlordStars] = useState(service.defaultValue || 1);
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

  const calculateWarlordPrice = (): number => {
    if (!currentRank || !desiredRank) return 0;

    const rankOrder = ["Recruit", "Vanguard", "Ranger", "Commander", "Warlord"];
    const divisionOrder = ["IV", "III", "II", "I"];
    const rankPrices: Record<string, number> = {
      "Recruit": 8,
      "Vanguard": 10,
      "Ranger": 12,
      "Commander": 14,
      "Warlord": 2, // per star
    };

    // Convert ranks to absolute position numbers for easier calculation
    const getAbsolutePosition = (rank: string, division: string, stars: number = 0): number => {
      const rankIndex = rankOrder.indexOf(rank);
      if (rank === "Warlord") {
        // Warlord starts after Commander I (position 16)
        // Position 16 = Warlord 1, Position 17 = Warlord 2, etc.
        return 16 + stars - 1; // stars start at 1, so subtract 1
      }
      // Each rank has 4 divisions (IV=0, III=1, II=2, I=3)
      const divIndex = divisionOrder.indexOf(division);
      return rankIndex * 4 + divIndex;
    };

    const currentPos = getAbsolutePosition(currentRank, currentDivision, 0);
    const desiredPos = getAbsolutePosition(desiredRank, desiredDivision, desiredRank === "Warlord" ? warlordStars : 0);

    // If desired position is not higher than current, return 0
    if (desiredPos <= currentPos) return 0;

    let totalPrice = 0;
    let position = currentPos;

    // Calculate price step by step
    // Each step moves from one position to the next
    while (position < desiredPos) {
      // Determine which rank we're progressing THROUGH (the rank we're leaving)
      if (position < 4) {
        // Progressing through Recruit (positions 0-3)
        totalPrice += rankPrices["Recruit"];
      } else if (position < 8) {
        // Progressing through Vanguard (positions 4-7)
        totalPrice += rankPrices["Vanguard"];
      } else if (position < 12) {
        // Progressing through Ranger (positions 8-11)
        totalPrice += rankPrices["Ranger"];
      } else if (position < 16) {
        // Progressing through Commander (positions 12-15)
        totalPrice += rankPrices["Commander"];
      } else {
        // Progressing through Warlord (positions 16+)
        totalPrice += rankPrices["Warlord"];
      }
      position++;
    }

    return totalPrice;
  };

  const calculateBasePrice = (): number => {
    if (service.type === "fixed") return service.fixedPrice || 0;
    if (service.type === "contact") return 0;
    if (service.type === "warlord") return calculateWarlordPrice();
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
    } else if (service.type === "warlord") {
      // Warlord Tournament specific options
      if (currentRank === "Warlord") {
        options["Current Rank"] = "Warlord";
      } else {
        options["Current Rank"] = `${currentRank} ${currentDivision}`;
      }
      if (desiredRank === "Warlord") {
        options["Desired Rank"] = `Warlord ${warlordStars} ★`;
      } else {
        options["Desired Rank"] = `${desiredRank} ${desiredDivision}`;
      }
      // Always include delivery speed for Warlord Tournament
      const speedLabel = speedOptions.find((s) => s.value === speed)?.label || "Normal";
      options["Delivery Speed"] = speedLabel;
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
    if (speed !== "normal" && service.type !== "warlord") {
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
            onClick={() => {
              const discordMatch = service.contactMessage?.match(/Discord:\s*(\S+)/);
              const discordUser = discordMatch ? discordMatch[1] : "geroj2";
              window.open(`https://discord.com/users/${discordUser}`, "_blank");
            }}
          >
            Contact in Discord
          </Button>
        </div>
      )}

      {/* Warlord Tournament */}
      {service.type === "warlord" && service.ranks && (
        <div className="space-y-6">
          {/* Current Rank */}
          <div>
            <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-foreground">Current Rank</label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {service.ranks.map((rank) => (
                <button
                  key={rank}
                  onClick={() => setCurrentRank(rank)}
                  className={`group relative rounded-xl border-2 p-4 transition-all duration-300 flex flex-col items-center gap-3 ${
                    currentRank === rank
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(48_100%_50%_/_0.3)] scale-105"
                      : "border-border/50 bg-card hover:border-primary/50 hover:bg-card/80 hover:scale-102 hover:shadow-[0_0_15px_hsl(48_100%_50%_/_0.15)]"
                  }`}
                >
                  <div className={`relative w-16 h-16 rounded-lg overflow-hidden ${
                    currentRank === rank ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                  }`}>
                    <img
                      src={`/ranks/${rank.toLowerCase()}.png`}
                      alt={rank}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-wide ${
                    currentRank === rank ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    {rank}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Division - only show if rank is not Warlord */}
          {currentRank && currentRank !== "Warlord" && (
            <div>
              <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-foreground">Current Division</label>
              <div className="grid grid-cols-4 gap-3">
                {["IV", "III", "II", "I"].map((division) => (
                  <button
                    key={division}
                    onClick={() => setCurrentDivision(division)}
                    className={`rounded-lg border-2 px-4 py-4 text-base font-bold uppercase transition-all duration-300 ${
                      currentDivision === division
                        ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_hsl(48_100%_50%_/_0.25)] scale-105"
                        : "border-border/50 bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground hover:scale-102"
                    }`}
                  >
                    {division}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Desired Rank */}
          <div>
            <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-foreground">Desired Rank</label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {service.ranks.map((rank) => (
                <button
                  key={rank}
                  onClick={() => setDesiredRank(rank)}
                  className={`group relative rounded-xl border-2 p-4 transition-all duration-300 flex flex-col items-center gap-3 ${
                    desiredRank === rank
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(48_100%_50%_/_0.3)] scale-105"
                      : "border-border/50 bg-card hover:border-primary/50 hover:bg-card/80 hover:scale-102 hover:shadow-[0_0_15px_hsl(48_100%_50%_/_0.15)]"
                  }`}
                >
                  <div className={`relative w-16 h-16 rounded-lg overflow-hidden ${
                    desiredRank === rank ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                  }`}>
                    <img
                      src={`/ranks/${rank.toLowerCase()}.png`}
                      alt={rank}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-wide ${
                    desiredRank === rank ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    {rank}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Desired Division - only show if rank is not Warlord */}
          {desiredRank && desiredRank !== "Warlord" && (
            <div>
              <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-foreground">Desired Division</label>
              <div className="grid grid-cols-4 gap-3">
                {["IV", "III", "II", "I"].map((division) => (
                  <button
                    key={division}
                    onClick={() => setDesiredDivision(division)}
                    className={`rounded-lg border-2 px-4 py-4 text-base font-bold uppercase transition-all duration-300 ${
                      desiredDivision === division
                        ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_hsl(48_100%_50%_/_0.25)] scale-105"
                        : "border-border/50 bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground hover:scale-102"
                    }`}
                  >
                    {division}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Warlord Stars Slider - only show if desired rank is Warlord */}
          {desiredRank === "Warlord" && (
            <div className="rounded-xl border-2 border-primary/30 bg-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold uppercase tracking-wider text-foreground">Warlord Stars</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={warlordStars}
                    onChange={(e) => {
                      const n = parseInt(e.target.value);
                      if (!isNaN(n)) setWarlordStars(Math.min(Math.max(n, service.min || 1), service.max || 99));
                    }}
                    min={service.min || 1}
                    max={service.max || 99}
                    className="h-10 w-24 border-2 border-primary/30 bg-secondary/50 text-center text-base font-bold text-primary"
                  />
                  <span className="text-sm font-medium text-primary">★</span>
                </div>
              </div>
              <Slider
                value={[warlordStars]}
                onValueChange={([v]) => setWarlordStars(v)}
                min={service.min || 1}
                max={service.max || 99}
                step={service.step || 1}
                className="mt-4"
              />
              <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
                <span>{service.min || 1} ★</span>
                <span>{service.max || 99} ★</span>
              </div>
            </div>
          )}

          {/* Price Block for Warlord Tournament */}
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
            {price === 0 && currentRank && desiredRank ? (
              // Show error message when price is 0
              <div className="text-center py-4">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Invalid Selection</p>
                <p className="text-base text-foreground">Desired rank must be higher than current rank</p>
                <p className="mt-2 text-2xl font-black text-muted-foreground">$0.00</p>
              </div>
            ) : (
              // Show normal price display
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Price</p>
                    <p className="mt-1 text-3xl font-black text-primary">${price.toFixed(2)}</p>
                    {speed !== "normal" && (
                      <>
                        <p className="text-xs text-muted-foreground line-through">${basePrice.toFixed(2)}</p>
                        <p className="text-xs text-primary/80 mt-0.5">Includes delivery speed modifier</p>
                      </>
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

                {/* Delivery Speed Options */}
                <div className="mt-5 pt-5 border-t border-primary/20">
                  <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Delivery Speed</label>
                  <div className="space-y-2">
                    {speedOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSpeed(opt.value)}
                        className={`w-full flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-all ${
                          speed === opt.value
                            ? "border-primary bg-primary/10 shadow-[0_0_12px_hsl(48_100%_50%_/_0.2)]"
                            : "border-border/50 bg-card/50 hover:border-primary/30"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          speed === opt.value ? "border-primary" : "border-muted-foreground"
                        }`}>
                          {speed === opt.value && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <span className={`text-sm font-semibold flex-1 ${
                          speed === opt.value ? "text-primary" : "text-foreground"
                        }`}>
                          {opt.label}
                        </span>
                        {opt.multiplier > 1 && (
                          <span className={`text-xs font-medium ${
                            speed === opt.value ? "text-primary" : "text-muted-foreground"
                          }`}>
                            +{Math.round((opt.multiplier - 1) * 100)}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  disabled={price === 0}
                  className="mt-5 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box-intense disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
              </>
            )}
          </div>

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secure</span>
            <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" /> Fast</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary" /> 24/7 Support</span>
          </div>
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

      {/* Express Options - only for non-warlord services */}
      {service.type !== "contact" && service.type !== "warlord" && (
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
      {service.type !== "contact" && service.type !== "warlord" && (
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
