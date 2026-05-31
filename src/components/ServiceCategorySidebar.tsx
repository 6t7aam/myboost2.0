import { Link, useLocation } from "react-router-dom";
import { gameConfigs } from "@/data/gameConfigs";
import { getCs2ServicePath, getDota2ServicePath } from "@/lib/serviceRoutes";

interface ServiceLink {
  label: string;
  path: string;
}

const DOTA_2_SERVICE_LINKS: ServiceLink[] = [
  { label: "MMR Boost", path: getDota2ServicePath("mmr-boost") },
  { label: "Coaching", path: getDota2ServicePath("coaching") },
  { label: "Calibration Boost", path: getDota2ServicePath("calibration-boost") },
  { label: "Low Priority Removal", path: getDota2ServicePath("lp-removal") },
  { label: "Behavior Score", path: getDota2ServicePath("behavior-score-boost") },
  { label: "Win Rate Boost", path: getDota2ServicePath("win-rate-boost") },
  { label: "Battle Cup", path: getDota2ServicePath("battle-cup") },
  { label: "Rank Tokens", path: getDota2ServicePath("rank-tokens") },
];

const ARENA_BREAKOUT_SERVICE_LINKS: ServiceLink[] = gameConfigs["arena-breakout"].services.map((service) => ({
  label: service.name,
  path: `/game/arena-breakout/${service.id}`,
}));

const CS2_SERVICE_LINKS: ServiceLink[] = gameConfigs["cs2"].services.map((service) => ({
  label: service.name,
  path: getCs2ServicePath(service.id),
}));

const gameServices: Record<string, ServiceLink[]> = {
  "dota-2": DOTA_2_SERVICE_LINKS,
  "arena-breakout": ARENA_BREAKOUT_SERVICE_LINKS,
  "cs2": CS2_SERVICE_LINKS,
};

const gameAliases: Record<string, string> = {
  "arena-breakout-infinite": "arena-breakout",
  "arena-breakout-boosting": "arena-breakout",
  "dota-2-boosting": "dota-2",
  "cs2-boosting": "cs2",
};

const normalizePath = (path: string) => path.replace(/\/+$/, "");

const getCurrentGameSlug = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "game" && parts[1]) {
    return gameAliases[parts[1]] ?? parts[1];
  }

  if (
    pathname.startsWith("/arena-breakout-")
  ) {
    return "arena-breakout";
  }

  if (pathname === "/dota-2-boosting") return "dota-2";
  if (pathname === "/cs2-boosting") return "cs2";

  return null;
};

const ServiceCategorySidebar = () => {
  const location = useLocation();
  const pathname = normalizePath(location.pathname);
  const gameSlug = getCurrentGameSlug(pathname);

  if (!gameSlug || !gameServices[gameSlug]) {
    return null;
  }

  return (
    <aside
      className="hidden self-start min-[900px]:block min-[900px]:sticky"
      style={{ top: 20, maxHeight: "calc(100vh - 40px)" }}
    >
      <div className="overflow-y-auto rounded-2xl border border-primary/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
        <div className="rounded-xl border border-primary/10 bg-black/20 px-4 py-3">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
            Categories
          </div>
          <div className="mt-2 text-sm font-semibold text-white/70">
            Switch between services
          </div>
        </div>

        <nav className="mt-4 space-y-2" aria-label="Service categories">
          {gameServices[gameSlug].map((service) => {
            const active = pathname === normalizePath(service.path);

            return (
              <Link
                key={service.path}
                to={service.path}
                aria-current={active ? "page" : undefined}
                className={`group block rounded-xl border px-4 py-3 text-[15px] leading-snug transition-all duration-150 ${
                  active
                    ? "border-primary/40 bg-primary/12 font-bold text-[#F5C518] shadow-[inset_3px_0_0_0_#F5C518,0_0_0_1px_rgba(245,197,24,0.08)]"
                    : "border-transparent bg-white/[0.02] text-white/70 hover:border-primary/20 hover:bg-primary/[0.05] hover:text-[#F5C518]"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span>{service.label}</span>
                  <span
                    className={`text-xs transition-transform duration-150 ${
                      active ? "text-[#F5C518]" : "text-white/25 group-hover:translate-x-0.5 group-hover:text-[#F5C518]"
                    }`}
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default ServiceCategorySidebar;
