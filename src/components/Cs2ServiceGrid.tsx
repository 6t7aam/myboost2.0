import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, CheckCircle, Crosshair, Star, Zap } from "lucide-react";
import { GameConfig, ServiceOption } from "@/data/gameConfigs";
import { useCountUp } from "@/hooks/useCountUp";
import { getGlobalSale, SALE_BADGE_LABEL } from "@/config/pricing";

interface Cs2ServiceGridProps {
  config: GameConfig;
}

const StatBadge = ({ Icon, value, label, fill }: { Icon: typeof CheckCircle; value: string; label: string; fill?: boolean }) => {
  const animated = useCountUp(value, 1500);
  return (
    <div className="stat-badge flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-sm backdrop-blur-sm">
      <Icon className={`h-4 w-4 text-primary ${fill ? "fill-primary" : ""}`} />
      <span className="font-semibold text-foreground tabular-nums">{animated}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

/**
 * Image slot for a CS2 service. Drop a file at the service's `image` path
 * (e.g. /service-images/cs2/<slug>.webp) and it appears automatically.
 * Until then, a black-yellow gradient placeholder is shown.
 */
const ServiceMedia = ({ service }: { service: ServiceOption }) => {
  const [imageReady, setImageReady] = useState(false);

  return (
    <div className="relative h-44 overflow-hidden bg-secondary/30">
      {/* Black-yellow gradient placeholder (shown until a real image loads) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(48_100%_50%_/_0.18)_0%,_transparent_55%),linear-gradient(135deg,_#0b0b0b_0%,_#181818_60%,_#0b0b0b_100%)]">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, hsl(48 100% 50%) 0, hsl(48 100% 50%) 1px, transparent 1px, transparent 14px)",
          }}
        />
        <Crosshair className="absolute -right-4 -bottom-4 h-28 w-28 text-primary/15 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-12" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <span className="text-center text-base font-black uppercase tracking-[0.18em] text-primary/80 glow-text">
            {service.name}
          </span>
        </div>
      </div>

      {service.image && (
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageReady(true)}
          onError={() => setImageReady(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
            imageReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
    </div>
  );
};

const Cs2ServiceGrid = ({ config }: Cs2ServiceGridProps) => {
  const reduced = useReducedMotion();

  const cardVariant = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <>
      <SEO
        title="CS2 Boosting Services - Premier, FACEIT, Ranks & Coaching"
        description="Professional CS2 boosting services. Premier rating, FACEIT wins & rank, ESEA, competitive & wingman ranks, coaching and more. 2,400+ orders, 4.9★ rating. Fast, safe, and affordable."
        keywords="cs2 boosting, cs2 premier rating, faceit boost, faceit wins, esea rank, cs2 competitive rank, cs2 wingman, cs2 coaching, cs2 rank boost"
        canonicalUrl="https://www.myboost.top/game/cs2"
      />
      <div className="relative min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="relative flex items-end overflow-hidden pt-16">
          <div className="absolute inset-0">
            <img src={config.image} alt={config.title} className="h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
          </div>
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              {config.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-primary glow-text">{config.title.split(" ").slice(-1)}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{config.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <StatBadge Icon={CheckCircle} value={config.stats.orders} label="orders" />
              <StatBadge Icon={Star} value={config.stats.rating} label="rating" fill />
              <StatBadge Icon={Zap} value={config.stats.speed} label="avg. delivery" />
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="relative z-10 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              Choose Your <span className="text-primary glow-text">Service</span>
            </h2>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-60px" }}
              variants={reduced ? undefined : { animate: { transition: { staggerChildren: 0.06 } } }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {config.services.map((service) => {
                const basePrice = service.pricePerUnit ?? service.fixedPrice ?? 0;
                const sale = getGlobalSale(basePrice);
                const isFromPrice = service.startPrice?.toLowerCase().startsWith("from");
                return (
                <motion.div key={service.id} variants={reduced ? undefined : cardVariant}>
                  <Link to={`/game/cs2/${service.id}`} className="group block h-full">
                    <Card className="service-card-hover relative flex h-full flex-col overflow-hidden border-border/50 bg-card hover:glow-border">
                      {service.tag && (
                        <Badge className="badge-shimmer absolute right-3 top-3 z-10 border-none px-3 py-1 text-xs font-bold uppercase backdrop-blur-sm">
                          {service.tag}
                        </Badge>
                      )}
                      {sale && (
                        <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full border border-primary/70 bg-primary/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-primary shadow-[0_0_12px_hsl(48_100%_50%_/_0.35)] backdrop-blur-sm">
                          {SALE_BADGE_LABEL}
                        </span>
                      )}

                      <ServiceMedia service={service} />

                      <CardContent className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-bold uppercase text-foreground transition-colors duration-200 group-hover:text-primary">
                          {service.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{service.description}</p>

                        {service.bullets && service.bullets.length > 0 && (
                          <ul className="mt-3 space-y-1.5">
                            {service.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {sale ? (
                          <div className="mt-auto pt-4 flex items-baseline gap-2">
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
                          <p className="mt-auto pt-4 text-base font-bold text-primary glow-text">{service.startPrice}</p>
                        )}

                        <Button className="btn-yellow view-service-btn mt-3 w-full gap-2 rounded-lg font-bold uppercase tracking-wider glow-box transition-all duration-200 group-hover:glow-box-intense">
                          View Service <ArrowRight className="view-service-arrow h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Cs2ServiceGrid;
