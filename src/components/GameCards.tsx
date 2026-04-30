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
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
          Choose Your <span className="text-primary glow-text">Game</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Select from our most popular titles and start climbing today.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <Link key={game.name} to={`/game/${game.slug}`} className="group">
              <Card className="relative h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:glow-border hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_hsl(48_100%_50%_/_0.15)]">
                {game.tag && (
                  <Badge className="absolute top-3 right-3 z-10 border-none bg-primary/20 text-xs font-bold uppercase text-primary backdrop-blur-sm">
                    {game.tag}
                  </Badge>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold uppercase text-foreground group-hover:text-primary transition-colors duration-200">
                    {game.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{game.description}</p>
                  <p className="mt-2 text-sm font-bold text-primary">{game.startPrice}</p>
                  <Button
                    className="mt-4 w-full gap-2 rounded-lg glow-box font-bold uppercase tracking-wider transition-all duration-200 group-hover:glow-box-intense"
                    size="sm"
                  >
                    Order Now <ArrowRight className="h-3.5 w-3.5" />
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
