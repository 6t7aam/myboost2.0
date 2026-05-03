import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, ShieldCheck, Trophy, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToGames = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(48_100%_50%_/_0.08)_0%,_transparent_60%)]" />
      <div className="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px] animate-pulse-glow" />
      <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 left-1/4 h-[250px] w-[250px] rounded-full bg-primary/3 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8 glow-box backdrop-blur-cyber animate-slide-up">
          <Zap className="h-4 w-4 animate-pulse" />
          <span className="font-semibold">Trusted by 10,000+ Players</span>
        </div>

        <h1 className="mx-auto max-w-5xl text-5xl font-black uppercase leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Level Up Your Game{" "}
          <span className="text-primary glow-text-intense inline-block">Instantly</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Professional boosting services for competitive games. Fast, safe, and powered by top-tier verified players.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button onClick={scrollToGames} size="lg" className="group rounded-xl glow-box-intense px-8 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_hsl(48_100%_50%_/_0.4)]">
            Get Boosted
            <ChevronRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button onClick={scrollToGames} size="lg" variant="outline" className="group rounded-xl border-primary/40 px-8 text-base font-bold uppercase tracking-wider text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105 hover:border-primary/60">
            View Services
          </Button>
        </div>

        {/* Enhanced trust strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <span className="flex items-center gap-2 transition-all duration-300 hover:text-primary hover:scale-110">
            <ShieldCheck className="h-5 w-5 text-primary" /> 100% Safe
          </span>
          <span className="flex items-center gap-2 transition-all duration-300 hover:text-primary hover:scale-110">
            <Zap className="h-5 w-5 text-primary" /> 15 min start
          </span>
          <span className="flex items-center gap-2 transition-all duration-300 hover:text-primary hover:scale-110">
            <Trophy className="h-5 w-5 text-primary" /> Professional Boosters
          </span>
          <span className="flex items-center gap-2 transition-all duration-300 hover:text-primary hover:scale-110">
            <Users className="h-5 w-5 text-primary" /> 10,000+ orders
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
