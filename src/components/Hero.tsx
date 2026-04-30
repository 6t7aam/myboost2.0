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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(48_100%_50%_/_0.06)_0%,_transparent_60%)]" />
      <div className="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8 glow-box">
          <Zap className="h-4 w-4" />
          <span className="font-semibold">Trusted by 10,000+ Players</span>
        </div>

        <h1 className="mx-auto max-w-5xl text-5xl font-black uppercase leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          Level Up Your Game{" "}
          <span className="text-primary glow-text">Instantly</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Professional boosting services for competitive games. Fast, safe, and powered by top-tier verified players.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={scrollToGames} size="lg" className="rounded-xl glow-box-intense px-8 text-base font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105">
            Get Boosted
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
          <Button onClick={scrollToGames} size="lg" variant="outline" className="rounded-xl border-primary/40 px-8 text-base font-bold uppercase tracking-wider text-primary hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105">
            View Services
          </Button>
        </div>

        {/* Trust strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> 100% Safe</span>
          <span className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> 15 min start</span>
          <span className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /> Professional Boosters</span>
          <span className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> 10,000+ orders</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
