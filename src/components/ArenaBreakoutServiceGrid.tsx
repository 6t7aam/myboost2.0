import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { GameConfig } from "@/data/gameConfigs";
import {
  getArenaServiceSale,
  getArenaRaidSale,
  SALE_BADGE_LABEL,
} from "@/config/pricing";

interface ArenaBreakoutServiceGridProps {
  config: GameConfig;
}


const ArenaBreakoutServiceGrid = ({ config }: ArenaBreakoutServiceGridProps) => {
  return (
    <>
      <SEO
        title="ABI - Arena Breakout: Infinite Boosting Services"
        description="Professional boosting services for Arena Breakout: Infinite. Rank up faster with expert boosters — coaching, raids, koens farming, rent-a-booster and more. Safe, fast and worldwide."
        keywords="arena breakout infinite boosting, arena breakout koens farming, arena breakout raids boost, arena breakout coaching, abi boosting service, arena breakout infinite services"
        canonicalUrl="https://www.myboost.top/game/arena-breakout"
      />
      <div className="min-h-screen bg-background relative">
        <div className="dota-bg-overlay absolute inset-0 pointer-events-none" />
        <Navbar />

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={config.image} alt={config.title} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
          <Link to="/" className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
            {config.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-primary glow-text">{config.title.split(" ").slice(-1)}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{config.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="stat-badge flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-sm backdrop-blur-sm">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Fast Start</span>
              <span className="text-muted-foreground">within 15 min</span>
            </div>
            <div className="stat-badge flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-sm backdrop-blur-sm">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Manual Only</span>
              <span className="text-muted-foreground">no bots</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
            Choose Your <span className="text-primary glow-text">Service</span>
          </h2>

          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {config.services.map((service) => {
              const sale =
                service.id === "raids-boost"
                  ? getArenaRaidSale("Lockdown")
                  : getArenaServiceSale(service.id);
              const isFromPrice = service.startPrice?.toLowerCase().startsWith("from");
              return (
                <Link key={service.id} to={`/game/arena-breakout/${service.id}`} className="group">
                  <Card
                    className="service-card-hover relative h-full overflow-hidden border-border/50 bg-card hover:glow-border"
                    style={{ minHeight: "460px" }}
                  >
                    {service.tag && (
                      <Badge className="badge-shimmer absolute top-3 right-3 z-10 border-none text-sm font-bold uppercase backdrop-blur-sm px-3 py-1">
                        {service.tag}
                      </Badge>
                    )}
                    {sale && (
                      <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full border border-primary/70 bg-primary/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-primary shadow-[0_0_12px_hsl(48_100%_50%_/_0.35)] backdrop-blur-sm">
                        {SALE_BADGE_LABEL}
                      </span>
                    )}
                    <div className="relative overflow-hidden bg-secondary/30" style={{ height: "220px" }}>
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        style={{ objectPosition: "top center" }}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23ffd700'%3E" + service.name + "%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    </div>
                    <CardContent style={{ padding: "20px" }}>
                      <h3 className="font-bold uppercase text-foreground group-hover:text-primary transition-colors duration-200" style={{ fontSize: "20px" }}>
                        {service.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                      {sale ? (
                        <div className="mt-3 flex items-baseline gap-2">
                          {isFromPrice && (
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              From
                            </span>
                          )}
                          <span className="text-sm font-medium text-muted-foreground/70 line-through">
                            ${sale.oldPrice.toFixed(2)}
                          </span>
                          <span className="text-lg font-black text-primary glow-text">
                            ${sale.newPrice.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <p className="mt-3 text-base font-bold text-primary">{service.startPrice}</p>
                      )}
                      <Button
                        className="btn-yellow view-service-btn mt-3 w-full gap-2 rounded-lg glow-box font-bold uppercase tracking-wider transition-all duration-200 group-hover:glow-box-intense"
                        size="default"
                      >
                        View Service <ArrowRight className="view-service-arrow h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default ArenaBreakoutServiceGrid;
