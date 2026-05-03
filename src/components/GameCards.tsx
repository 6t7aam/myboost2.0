import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const games = [
  {
    name: "Arena Breakout: Infinite",
    slug: "arena-breakout",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2073620/header.jpg",
    description: "Koens, Raids, Cases, Coaching",
    tag: "New",
    startPrice: "From $1.50",
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
    description: "Base Building, Raids, Farming",
    tag: null,
    startPrice: "From $2.50",
  },
];

const GameCards = () => {
  return (
    <section id="services" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(48_100%_50%_/_0.03)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl animate-slide-up">
          Choose Your <span className="text-primary glow-text">Game</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Select from our most popular titles and start climbing today.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game, index) => (
            <Link key={game.name} to={`/game/${game.slug}`} className="group animate-slide-up" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
              <Card className="relative h-full overflow-hidden border-border/50 bg-card transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_30px_hsl(48_100%_50%_/_0.2),0_20px_40px_-15px_hsl(48_100%_50%_/_0.15)] hover:-translate-y-3 perspective-card">
                {game.tag && (
                  <Badge className="absolute top-3 right-3 z-10 border-none bg-primary/20 text-xs font-bold uppercase text-primary backdrop-blur-sm glow-box">
                    {game.tag}
                  </Badge>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-115"
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
                  <p className="mt-2 text-sm font-bold text-primary glow-text">{game.startPrice}</p>
                  <Button
                    className="mt-4 w-full gap-2 rounded-lg glow-box font-bold uppercase tracking-wider transition-all duration-300 group-hover:glow-box-intense group-hover:shadow-[0_0_30px_hsl(48_100%_50%_/_0.3)]"
                    size="sm"
                  >
                    Order Now <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameCards;
