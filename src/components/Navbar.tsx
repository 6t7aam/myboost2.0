import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, X, ShoppingCart, ShieldCheck, User, LogIn, ClipboardList } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user, loading } = useAuth();
  const { isAdmin } = useAdmin();

  const handleGetBoosted = () => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Gamepad2 className="h-7 w-7 text-primary glow-text" />
          <span className="text-xl font-bold uppercase tracking-wider text-primary glow-text">MyBoost</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => handleNavClick(l.href)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link to="/admin" className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:glow-box">
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin
            </Link>
          )}

          {/* Auth buttons */}
          {!loading && (
            user ? (
              <>
                <Link to="/my-orders" className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-primary/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary/10">
                  <ClipboardList className="h-3.5 w-3.5" />
                  My Orders
                </Link>
                <Link to="/account" className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-primary/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary/10">
                  <User className="h-3.5 w-3.5" />
                  Account
                </Link>
              </>
            ) : (
              <Link to="/login" className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-primary/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary/10">
                <LogIn className="h-3.5 w-3.5" />
                Login
              </Link>
            )
          )}

          <Link to="/cart" className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
          <Button onClick={handleGetBoosted} className="hidden md:inline-flex glow-box font-bold uppercase tracking-wider">
            Get Boosted
          </Button>
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 pb-4">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => handleNavClick(l.href)} className="block w-full py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-primary border-b border-border/30">
              {l.label}
            </button>
          ))}
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="block w-full py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-primary border-b border-border/30">
            Cart {itemCount > 0 && `(${itemCount})`}
          </Link>

          {/* Mobile auth link */}
          {!loading && (
            user ? (
              <>
                <Link to="/my-orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full py-3 text-left text-sm font-bold text-primary transition-colors hover:text-primary/80 border-b border-border/30">
                  <ClipboardList className="h-4 w-4" />
                  My Orders
                </Link>
                <Link to="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full py-3 text-left text-sm font-bold text-primary transition-colors hover:text-primary/80 border-b border-border/30">
                  <User className="h-4 w-4" />
                  My Account
                </Link>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full py-3 text-left text-sm font-bold text-primary transition-colors hover:text-primary/80 border-b border-border/30">
                <LogIn className="h-4 w-4" />
                Login / Sign Up
              </Link>
            )
          )}

          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full py-3 text-left text-sm font-bold text-primary transition-colors hover:text-primary/80 border-b border-border/30">
              <ShieldCheck className="h-4 w-4" />
              Admin Panel
            </Link>
          )}
          <Button onClick={handleGetBoosted} className="mt-3 w-full glow-box font-bold uppercase tracking-wider">
            Get Boosted
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
