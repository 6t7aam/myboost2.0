import { Link } from "react-router-dom";
import { BookOpen, Coins, Swords, GraduationCap, ArrowRight } from "lucide-react";

const ArenaBreakoutGuides = () => {
  const guides = [
    {
      title: "Complete Boosting Guide",
      description: "Professional ABI boosting services overview",
      icon: BookOpen,
      link: "/arena-breakout-infinite-boosting",
    },
    {
      title: "Buy Koens",
      description: "Fast Koens farming service",
      icon: Coins,
      link: "/buy-arena-breakout-infinite-koens",
    },
    {
      title: "Raids Boost",
      description: "Expert raid carries on all maps",
      icon: Swords,
      link: "/arena-breakout-infinite-raids-boost",
    },
    {
      title: "Coaching",
      description: "Learn from elite ABI players",
      icon: GraduationCap,
      link: "/arena-breakout-infinite-coaching",
    },
  ];

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black uppercase tracking-tight text-foreground text-center mb-2">
            Arena Breakout: Infinite <span className="text-primary">Guides</span>
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            Comprehensive guides for all ABI boosting services
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map(({ title, description, icon: Icon, link }) => (
              <Link
                key={link}
                to={link}
                className="group rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/50 hover:bg-card/80"
              >
                <Icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {description}
                </p>
                <div className="flex items-center gap-1 text-xs text-primary font-semibold">
                  Learn More <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArenaBreakoutGuides;
