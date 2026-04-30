import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold uppercase tracking-wider text-primary">MyBoost</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Premium game boosting marketplace trusted by 10,000+ players worldwide. Fast, safe, affordable.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-foreground">Games</h4>
            <ul className="mt-3 space-y-2">
              {[
                { name: "Arena Breakout", slug: "arena-breakout" },
                { name: "Dota 2", slug: "dota-2" },
                { name: "CS2 (FACEIT)", slug: "cs2" },
                { name: "Rust", slug: "rust" },
              ].map((g) => (
                <li key={g.slug}>
                  <Link to={`/game/${g.slug}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="mt-3 space-y-2">
              {["About Us", "Contact", "Blog"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-foreground">Support</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">FAQ</a></li>
              <li><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Discord: geroj2</a></li>
              <li><Link to="/refund" className="text-sm text-muted-foreground transition-colors hover:text-primary">Refund Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MyBoost. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
