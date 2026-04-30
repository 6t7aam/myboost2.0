import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Star, Zap } from "lucide-react";
import { GameConfig } from "@/data/gameConfigs";

interface ArenaBreakoutServiceGridProps {
  config: GameConfig;
}

const ArenaBreakoutServiceGrid = ({ config }: ArenaBreakoutServiceGridProps) => {
  return (
    <div className="min-h-screen bg-background">
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
            {[
              { icon: CheckCircle, value: config.stats.orders, label: "orders" },
              { icon: Star, value: config.stats.rating, label: "rating", fill: true },
              { icon: Zap, value: config.stats.speed, label: "avg. delivery" },
            ].map(({ icon: Icon, value, label, fill }) => (
              <div key={label} className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-sm backdrop-blur-sm">
                <Icon className={`h-4 w-4 text-primary ${fill ? "fill-primary" : ""}`} />
                <span className="font-semibold text-foreground">{value}</span>
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
            Choose Your <span className="text-primary glow-text">Service</span>
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {config.services.map((service) => (
              <Link key={service.id} to={`/game/arena-breakout/${service.id}`} className="group">
                <Card className="relative h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:glow-border hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_hsl(48_100%_50%_/_0.15)]">
                  {service.tag && (
                    <Badge className="absolute top-3 right-3 z-10 border-none bg-primary/20 text-sm font-bold uppercase text-primary backdrop-blur-sm px-3 py-1">
                      {service.tag}
                    </Badge>
                  )}
                  <div className="relative aspect-[16/9] overflow-hidden bg-secondary/30">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23ffd700'%3E" + service.name + "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold uppercase text-foreground group-hover:text-primary transition-colors duration-200">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                    <p className="mt-2 text-base font-bold text-primary">{service.startPrice}</p>
                    <Button
                      className="mt-3 w-full gap-2 rounded-lg glow-box font-bold uppercase tracking-wider transition-all duration-200 group-hover:glow-box-intense"
                      size="default"
                    >
                      View Service <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArenaBreakoutServiceGrid;
