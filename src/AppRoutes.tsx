import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";
import RouteProgressBar from "@/components/RouteProgressBar";
import { getVariants, reducedVariants } from "@/lib/pageTransitions";
import { CANONICAL_PATHS } from "@/lib/siteConfig";
import Index from "./pages/Index";
import OrderPage from "./pages/OrderPage";
import BoosterSelectionPage from "./pages/BoosterSelectionPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import GamePage from "./pages/GamePage";
import Cs2ServicePage from "./pages/Cs2ServicePage";
import ArenaBreakoutServicePage from "./pages/ArenaBreakoutServicePage";
import Dota2ServicePage from "./pages/Dota2ServicePage";
import RustServicePage from "./pages/RustServicePage";
import RustHubPage from "./pages/RustHubPage";
import ArenaBreakoutInfiniteBoostingPage from "./pages/ArenaBreakoutInfiniteBoostingPage";
import BuyArenaBreakoutInfiniteKoensPage from "./pages/BuyArenaBreakoutInfiniteKoensPage";
import ArenaBreakoutInfiniteRaidsBoostPage from "./pages/ArenaBreakoutInfiniteRaidsBoostPage";
import ArenaBreakoutInfiniteCoachingPage from "./pages/ArenaBreakoutInfiniteCoachingPage";
import Dota2MMRBoostPage from "./pages/Dota2MMRBoostPage";
import Dota2LPRemovalPage from "./pages/Dota2LPRemovalPage";
import Dota2RankTokensPage from "./pages/Dota2RankTokensPage";
import Dota2CoachingPage from "./pages/Dota2CoachingPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import AdminOrderDetailsPage from "./pages/AdminOrderDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import AccountPage from "./pages/AccountPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ChatPage from "./pages/ChatPage";
import TermsPage from "./pages/TermsPage";
import RefundPage from "./pages/RefundPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";
import Dota2BoostingPage from "./pages/Dota2BoostingPage";
import Cs2BoostingPage from "./pages/Cs2BoostingPage";

const useMobileSpeedMultiplier = () => {
  if (typeof window === "undefined") return 1;
  return window.matchMedia("(max-width: 768px)").matches ? 0.7 : 1;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const reduced = useReducedMotion();
  const speed = useMobileSpeedMultiplier();
  const variants = reduced ? reducedVariants : getVariants(location.pathname, speed);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path={CANONICAL_PATHS.rustBoosting} element={<RustHubPage />} />
          <Route path={CANONICAL_PATHS.dota2Boosting} element={<Dota2BoostingPage />} />
          <Route path={CANONICAL_PATHS.cs2Boosting} element={<Cs2BoostingPage />} />
          <Route path={CANONICAL_PATHS.arenaBreakoutBoosting} element={<ArenaBreakoutInfiniteBoostingPage />} />
          <Route path={CANONICAL_PATHS.arenaBreakoutKoens} element={<BuyArenaBreakoutInfiniteKoensPage />} />
          <Route path={CANONICAL_PATHS.arenaBreakoutRaids} element={<ArenaBreakoutInfiniteRaidsBoostPage />} />
          <Route path={CANONICAL_PATHS.arenaBreakoutCoaching} element={<ArenaBreakoutInfiniteCoachingPage />} />

          <Route path="/arena-breakout-infinite-boosting" element={<Navigate replace to={CANONICAL_PATHS.arenaBreakoutBoosting} />} />
          <Route path="/buy-arena-breakout-infinite-koens" element={<Navigate replace to={CANONICAL_PATHS.arenaBreakoutKoens} />} />
          <Route path="/arena-breakout-infinite-raids-boost" element={<Navigate replace to={CANONICAL_PATHS.arenaBreakoutRaids} />} />
          <Route path="/arena-breakout-infinite-coaching" element={<Navigate replace to={CANONICAL_PATHS.arenaBreakoutCoaching} />} />

          <Route path="/game/arena-breakout/:serviceId" element={<ArenaBreakoutServicePage />} />

          <Route path="/game/dota-2/mmr-boost" element={<Dota2MMRBoostPage />} />
          <Route path="/game/dota-2/lp-removal" element={<Dota2LPRemovalPage />} />
          <Route path="/game/dota-2/rank-tokens" element={<Dota2RankTokensPage />} />
          <Route path="/game/dota-2/coaching" element={<Dota2CoachingPage />} />
          <Route path="/game/dota-2/:serviceId" element={<Dota2ServicePage />} />

          <Route path="/game/rust" element={<Navigate replace to={CANONICAL_PATHS.rustBoosting} />} />
          <Route path="/game/rust/:serviceId" element={<RustServicePage />} />
          <Route path="/game/cs2/:serviceId" element={<Cs2ServicePage />} />
          <Route path="/game/:gameSlug" element={<GamePage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/choose-booster" element={<BoosterSelectionPage />} />
          <Route path="/order/status/:orderId" element={<OrderStatusPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/order/:orderId" element={<AdminOrderDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<UpdatePasswordPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <RouteProgressBar />
    <AnimatedRoutes />
  </>
);

export default AppRoutes;
