import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RUST_CATEGORIES, RustCategoryId } from "@/data/rustServices";
import { ChevronDown } from "lucide-react";

interface RustCategorySidebarProps {
  /**
   * "hub" mode renders smooth-scroll anchor buttons that highlight the active
   * category as the user scrolls the main hub page.
   *
   * "service" mode renders Links back to the main hub at #category anchors
   * (used on individual service pages).
   */
  mode?: "hub" | "service";
  /** When provided in service mode, forces the active highlight. */
  activeCategory?: RustCategoryId;
}

const useActiveCategoryFromScroll = (enabled: boolean): RustCategoryId | null => {
  const [active, setActive] = useState<RustCategoryId | null>(RUST_CATEGORIES[0].id);

  useEffect(() => {
    if (!enabled) return;
    const handler = () => {
      let current: RustCategoryId | null = null;
      for (const cat of RUST_CATEGORIES) {
        const el = document.getElementById(`category-${cat.id}`);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - 160 <= 0) current = cat.id;
      }
      setActive(current ?? RUST_CATEGORIES[0].id);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [enabled]);

  return active;
};

const RustCategorySidebar = ({
  mode = "hub",
  activeCategory,
}: RustCategorySidebarProps) => {
  const location = useLocation();
  const scrollActive = useActiveCategoryFromScroll(mode === "hub");
  const [mobileOpen, setMobileOpen] = useState(false);

  const active: RustCategoryId | null =
    mode === "service"
      ? activeCategory ?? null
      : scrollActive;

  const handleAnchor = (id: RustCategoryId) => (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (mode !== "hub") return;
    e.preventDefault();
    const el = document.getElementById(`category-${id}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  };

  const linkHref = (id: RustCategoryId) =>
    mode === "hub" ? `#category-${id}` : `/game/rust#category-${id}`;

  const NavList = (
    <nav className="space-y-1.5" aria-label="Rust service categories">
      {RUST_CATEGORIES.map((category) => {
        const isActive = active === category.id;
        return (
          <a
            key={category.id}
            href={linkHref(category.id)}
            onClick={handleAnchor(category.id)}
            aria-current={isActive ? "page" : undefined}
            className={`group block rounded-xl border px-4 py-2.5 text-sm leading-snug transition-all duration-150 ${
              isActive
                ? "border-primary/40 bg-primary/12 font-bold text-[#F5C518] shadow-[inset_3px_0_0_0_#F5C518,0_0_0_1px_rgba(245,197,24,0.08)]"
                : "border-transparent bg-white/[0.02] text-white/70 hover:border-primary/20 hover:bg-primary/[0.05] hover:text-[#F5C518]"
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="uppercase tracking-wide">{category.title}</span>
              <span
                className={`text-xs transition-transform duration-150 ${
                  isActive
                    ? "text-[#F5C518]"
                    : "text-white/25 group-hover:translate-x-0.5 group-hover:text-[#F5C518]"
                }`}
                aria-hidden
              >
                →
              </span>
            </span>
          </a>
        );
      })}
    </nav>
  );

  // Reset mobile open state whenever the page changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile collapsible (visible <900px) */}
      <div className="min-[900px]:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-primary/20 bg-card/60 px-4 py-3 text-sm font-bold uppercase tracking-wide text-foreground"
        >
          <span>Browse Rust Categories</span>
          <ChevronDown
            className={`h-4 w-4 text-primary transition-transform ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>
        {mobileOpen && (
          <div className="mt-3 rounded-2xl border border-primary/15 bg-card/70 p-3">
            {NavList}
          </div>
        )}
      </div>

      {/* Desktop sticky sidebar (>=900px) */}
      <aside
        className="hidden self-start min-[900px]:block min-[900px]:sticky"
        style={{ top: 96, maxHeight: "calc(100vh - 120px)" }}
      >
        <div
          className="rust-sidebar-scroll overflow-y-auto rounded-2xl border border-primary/15 bg-[linear-gradient(180deg,rgba(255,215,0,0.04),rgba(255,255,255,0.015))] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <div className="rounded-xl border border-primary/15 bg-black/40 px-4 py-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Rust Services
            </div>
            <div className="mt-1 text-xs text-white/55">11 categories</div>
          </div>

          <div className="mt-4">{NavList}</div>
        </div>
      </aside>
    </>
  );
};

export default RustCategorySidebar;
