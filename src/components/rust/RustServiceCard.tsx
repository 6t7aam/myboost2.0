import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Clock } from "lucide-react";
import { RustService, rustPlaceholderImage } from "@/data/rustServices";

const formatPrice = (service: RustService): { value: string; suffix?: string; prefix?: string } => {
  if (service.calculatorType === "hourly") {
    return { value: `$${service.price.toFixed(2)}`, suffix: `/${service.unit ?? "hour"}` };
  }
  if (service.calculatorType === "selector") {
    return { prefix: "From", value: `$${service.price.toFixed(2)}` };
  }
  if (service.calculatorType === "quantity") {
    if (service.packSize && service.packSize > 1) {
      return { value: `$${service.price.toFixed(2)}`, suffix: `/${service.packSize} ${service.packUnitLabel ?? "items"}` };
    }
    return { value: `$${service.price.toFixed(2)}`, suffix: `/${service.qtyUnit ?? "item"}` };
  }
  return { value: `$${service.price.toFixed(2)}` };
};

const RustServiceCard = ({ service }: { service: RustService }) => {
  const price = formatPrice(service);
  return (
    <Link to={`/game/rust/${service.slug}`} className="group block focus:outline-none">
      <Card className="rust-card service-card-hover relative h-full overflow-hidden border-white/5 bg-gradient-to-b from-[#161616] to-[#0d0d0d] hover:border-primary/50">
        {service.badge && (
          <Badge className="badge-shimmer absolute top-3 right-3 z-10 border-none text-[11px] font-black uppercase tracking-wider px-2.5 py-1">
            {service.badge}
          </Badge>
        )}

        <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width={640}
            height={400}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = rustPlaceholderImage(service.title);
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">
            <Clock className="h-3 w-3 text-primary" />
            {service.delivery}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-black uppercase tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary md:text-lg">
            {service.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-muted-foreground md:text-[13px]">
            {service.description}
          </p>

          <ul className="mt-3 space-y-1.5">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[12px] text-foreground/80">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {price.prefix ?? "Starting at"}
              </div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="text-xl font-black text-primary glow-text">{price.value}</span>
                {price.suffix && (
                  <span className="text-[11px] font-semibold uppercase text-muted-foreground">
                    {price.suffix}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button
            className="btn-yellow view-service-btn mt-4 w-full gap-2 rounded-lg font-bold uppercase tracking-wider text-background glow-box transition-all duration-200 group-hover:glow-box-intense"
            size="default"
          >
            View Service <ArrowRight className="view-service-arrow h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RustServiceCard;
