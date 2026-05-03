import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(48_100%_50%_/_0.02)_0%,_transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="animate-slide-up">
            <Link to="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
              <Gamepad2 className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-lg font-bold uppercase tracking-wider text-primary glow-text">MyBoost</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Premium game boosting marketplace trusted by 10,000+ players worldwide. Fast, safe, affordable.
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-bold uppercase tracking-wider text-foreground mb-3 relative inline-block">
              Games
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary glow-box" />
            </h4>
            <ul className="mt-4 space-y-2">
              {[
                { name: "Arena Breakout", slug: "arena-breakout" },
                { name: "Dota 2", slug: "dota-2" },
                { name: "CS2 (FACEIT)", slug: "cs2" },
                { name: "Rust", slug: "rust" },
              ].map((g) => (
                <li key={g.slug}>
                  <Link to={`/game/${g.slug}`} className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1 inline-block">
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-bold uppercase tracking-wider text-foreground mb-3 relative inline-block">
              Company
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary glow-box" />
            </h4>
            <ul className="mt-4 space-y-2">
              {["About Us", "Contact", "Blog"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1 inline-block">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-bold uppercase tracking-wider text-foreground mb-3 relative inline-block">
              Support
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary glow-box" />
            </h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1 inline-block">FAQ</a></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1 inline-block">Discord: geroj2</a></li>
              <li><Link to="/refund" className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1 inline-block">Refund Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1 inline-block">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1 inline-block">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="transition-colors duration-300 hover:text-primary">
            © {new Date().getFullYear()} MyBoost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
