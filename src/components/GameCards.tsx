import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SALE_BADGE_LABEL } from "@/config/pricing";

interface GameCardEntry {
  name: string;
  slug: string;
  image: string;
  description: string;
  tag: string | null;
  startPrice: string;
  startOldPrice?: string;
}

const games: GameCardEntry[] = [
  {
    name: "Arena Breakout: Infinite",
    slug: "arena-breakout",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2073620/header.jpg",
    description: "Koens, Raids, Cases, Coaching",
    tag: "New",
    startPrice: "From $0.99",
    startOldPrice: "$1.50",
  },
  {
    name: "CS2",
    slug: "cs2",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    description: "ELO Boost, Premier, Coaching",
    tag: "Most Popular",
    startPrice: "From $4.50",
  },
  {
    name: "Dota 2",
    slug: "dota-2",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/570/header.jpg",
    description: "MMR Boost, LP Removal, Tokens",
    tag: null,
    startPrice: "From $3",
  },
  {
    name: "Rust",
    slug: "rust",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/252490/header.jpg",
    description: "Base Building, Raids, Resources, Weapons",
    tag: null,
    startPrice: "From $1.09",
  },
];

const GameCards = () => {
  const reduced = useReducedMotion();

  const titleVariant = {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const cardVariant = {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section id="services" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(48_100%_50%_/_0.03)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          variants={reduced ? undefined : titleVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl"
        >
          Choose Your <span className="text-primary glow-text">Game</span>
        </motion.h2>
        <motion.p
          variants={reduced ? undefined : titleVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-center text-muted-foreground"
        >
          Select from our most popular titles and start climbing today.
        </motion.p>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={reduced ? undefined : { animate: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
          style={{ perspective: "1000px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {games.map((game) => (
            <motion.div
              key={game.name}
              variants={reduced ? undefined : cardVariant}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link to={`/game/${game.slug}`} className="group block">
              <Card className="service-card-hover relative h-full overflow-hidden border-border/50 bg-card perspective-card">
                {game.tag && (
                  <Badge className="badge-shimmer absolute top-3 right-3 z-10 border-none text-xs font-bold uppercase backdrop-blur-sm glow-box">
                    {game.tag}
                  </Badge>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

                  {/* Scan line effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-20 animate-scan-line" style={{ animation: 'scan-line 2s ease-in-out infinite' }} />
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold uppercase text-foreground group-hover:text-primary transition-colors duration-300">
                    {game.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{game.description}</p>
                  {game.startOldPrice ? (
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground/70 line-through">{game.startOldPrice}</span>
                      <span className="text-sm font-bold text-primary glow-text">{game.startPrice}</span>
                      <span className="inline-flex items-center rounded-full border border-primary/60 bg-primary/15 px-1.5 py-0 text-[9px] font-black uppercase tracking-wider text-primary">
                        {SALE_BADGE_LABEL}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm font-bold text-primary glow-text">{game.startPrice}</p>
                  )}
                  <Button
                    className="btn-yellow mt-4 w-full gap-2 rounded-lg glow-box font-bold uppercase tracking-wider transition-all duration-300 group-hover:glow-box-intense group-hover:shadow-[0_0_30px_hsl(48_100%_50%_/_0.3)]"
                    size="sm"
                  >
                    Order Now <ArrowRight className="view-service-arrow h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GameCards;
