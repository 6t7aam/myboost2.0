import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, X, ShoppingCart, ShieldCheck, User, LogIn, ClipboardList, MessageSquare, Bell, BellOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { useScrolled } from "@/hooks/useScrolled";
import { useUnreadOrderMessages } from "@/hooks/useUnreadOrderMessages";
import { useSoundPreference } from "@/hooks/useSoundPreference";
import { playMessageSound, getAudioContextState } from "@/lib/notificationSounds";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const scrolled = useScrolled(50);
  const unreadCount = useUnreadOrderMessages(user);
  const [soundEnabled, setSoundPref] = useSoundPreference();

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
    <nav className={`navbar-base fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-cyber ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
          <Gamepad2 className="h-7 w-7 text-primary glow-text transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-xl font-bold uppercase tracking-wider text-primary glow-text">MyBoost</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => handleNavClick(l.href)} className="nav-link relative text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary">
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link to="/admin" className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:glow-box hover:scale-105">
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin
            </Link>
          )}

          {/* Auth buttons */}
          {!loading && (
            user ? (
              <>
                <Link
                  to="/chat"
                  className={`relative hidden md:inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:scale-105 ${
                    unreadCount > 0
                      ? "chat-has-unread"
                      : "border-primary/30 text-primary"
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Chat
                  {unreadCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-black shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                      aria-label={`${unreadCount} unread messages`}
                    >
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </Link>
                <Link to="/my-orders" className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-primary/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:scale-105">
                  <ClipboardList className="h-3.5 w-3.5" />
                  My Orders
                </Link>
                <Link to="/account" className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-primary/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:scale-105">
                  <User className="h-3.5 w-3.5" />
                  Account
                </Link>
              </>
            ) : (
              <Link to="/login" className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-primary/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:scale-105">
                <LogIn className="h-3.5 w-3.5" />
                Login
              </Link>
            )
          )}

          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled;
              setSoundPref(next);
              console.log("[Navbar] sound toggle ->", next, "audio state:", getAudioContextState());
              if (next) void playMessageSound();
            }}
            className="rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-primary/10 hover:scale-110"
            aria-label={soundEnabled ? "Mute notification sounds" : "Enable notification sounds (and play test)"}
            title={soundEnabled ? "Mute notification sounds" : "Enable notification sounds (and play test)"}
          >
            {soundEnabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          </button>

          <Link to="/cart" className="relative rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-primary/10 hover:scale-110">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-pulse-glow">
                {itemCount}
              </span>
            )}
          </Link>
          <Button onClick={handleGetBoosted} className="hidden md:inline-flex btn-yellow cta-pulse glow-box font-bold uppercase tracking-wider transition-all duration-300 hover:glow-box-intense hover:scale-[1.02]">
            Get Boosted
          </Button>
          <button className="md:hidden text-foreground transition-all duration-300 hover:text-primary hover:scale-110" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-cyber px-4 pb-4 animate-slide-up">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => handleNavClick(l.href)} className="block w-full py-3 text-left text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-2 border-b border-border/30">
              {l.label}
            </button>
          ))}
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="block w-full py-3 text-left text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-2 border-b border-border/30">
            Cart {itemCount > 0 && `(${itemCount})`}
          </Link>

          {/* Mobile auth link */}
          {!loading && (
            user ? (
              <>
                <Link to="/chat" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full py-3 text-left text-sm font-bold text-primary transition-all duration-300 hover:text-primary/80 hover:translate-x-2 border-b border-border/30">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                  {unreadCount > 0 && (
                    <span className="ml-auto inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-black">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </Link>
                <Link to="/my-orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full py-3 text-left text-sm font-bold text-primary transition-all duration-300 hover:text-primary/80 hover:translate-x-2 border-b border-border/30">
                  <ClipboardList className="h-4 w-4" />
                  My Orders
                </Link>
                <Link to="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full py-3 text-left text-sm font-bold text-primary transition-all duration-300 hover:text-primary/80 hover:translate-x-2 border-b border-border/30">
                  <User className="h-4 w-4" />
                  My Account
                </Link>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full py-3 text-left text-sm font-bold text-primary transition-all duration-300 hover:text-primary/80 hover:translate-x-2 border-b border-border/30">
                <LogIn className="h-4 w-4" />
                Login / Sign Up
              </Link>
            )
          )}

          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full py-3 text-left text-sm font-bold text-primary transition-all duration-300 hover:text-primary/80 hover:translate-x-2 border-b border-border/30">
              <ShieldCheck className="h-4 w-4" />
              Admin Panel
            </Link>
          )}
          <Button onClick={handleGetBoosted} className="mt-3 w-full btn-yellow glow-box font-bold uppercase tracking-wider transition-all duration-300 hover:glow-box-intense">
            Get Boosted
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
