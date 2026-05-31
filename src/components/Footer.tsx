import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CANONICAL_PATHS } from "@/lib/siteConfig";
import { HUB_PATHS } from "@/lib/serviceRoutes";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-background py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(48_100%_50%_/_0.02)_0%,_transparent_50%)]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="animate-slide-up">
            <Link to="/" className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <Gamepad2 className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-lg font-bold uppercase tracking-wider text-primary glow-text">MyBoost</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Premium gaming marketplace trusted by 10,000+ players worldwide. Fast, secure, affordable.
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="relative mb-3 inline-block font-bold uppercase tracking-wider text-foreground">
              Boosting Pages
              <span className="absolute bottom-0 left-0 h-0.5 w-8 bg-primary glow-box" />
            </h4>
            <ul className="mt-4 space-y-2">
              {[
                { name: "Rust Boosting", path: HUB_PATHS.rust },
                { name: "Dota 2 Boosting", path: HUB_PATHS["dota-2"] },
                { name: "CS2 Boosting", path: HUB_PATHS.cs2 },
                { name: "Arena Breakout Boosting", path: HUB_PATHS["arena-breakout"] },
                { name: "Arena Breakout Koens", path: CANONICAL_PATHS.arenaBreakoutKoens },
                { name: "Arena Breakout Raids", path: CANONICAL_PATHS.arenaBreakoutRaids },
                { name: "Arena Breakout Coaching", path: CANONICAL_PATHS.arenaBreakoutCoaching },
              ].map((page) => (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="relative mb-3 inline-block font-bold uppercase tracking-wider text-foreground">
              Company
              <span className="absolute bottom-0 left-0 h-0.5 w-8 bg-primary glow-box" />
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to={HUB_PATHS.rust}
                  className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Rust Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to={HUB_PATHS["dota-2"]}
                  className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Dota 2 Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to={HUB_PATHS.cs2}
                  className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  CS2 Marketplace
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="relative mb-3 inline-block font-bold uppercase tracking-wider text-foreground">
              Support
              <span className="absolute bottom-0 left-0 h-0.5 w-8 bg-primary glow-box" />
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to={CANONICAL_PATHS.home}
                  className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Homepage FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.com/users/geroj2"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Discord: geroj2
                </a>
              </li>
              <li>
                <Link
                  to="/refund"
                  className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 animate-fade-in border-t border-border/50 pt-6 text-center text-sm text-muted-foreground"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="transition-colors duration-300 hover:text-primary">
            &copy; {new Date().getFullYear()} MyBoost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
