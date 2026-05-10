import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import RouteProgressBar from "@/components/RouteProgressBar";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getVariants, reducedVariants } from "@/lib/pageTransitions";
import Index from "./pages/Index.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import BoosterSelectionPage from "./pages/BoosterSelectionPage.tsx";
import OrderStatusPage from "./pages/OrderStatusPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import ArenaBreakoutServicePage from "./pages/ArenaBreakoutServicePage.tsx";
import Dota2ServicePage from "./pages/Dota2ServicePage.tsx";
import ArenaBreakoutInfiniteBoostingPage from "./pages/ArenaBreakoutInfiniteBoostingPage.tsx";
import BuyArenaBreakoutInfiniteKoensPage from "./pages/BuyArenaBreakoutInfiniteKoensPage.tsx";
import ArenaBreakoutInfiniteRaidsBoostPage from "./pages/ArenaBreakoutInfiniteRaidsBoostPage.tsx";
import ArenaBreakoutInfiniteCoachingPage from "./pages/ArenaBreakoutInfiniteCoachingPage.tsx";
import Dota2MMRBoostPage from "./pages/Dota2MMRBoostPage.tsx";
import Dota2LPRemovalPage from "./pages/Dota2LPRemovalPage.tsx";
import Dota2RankTokensPage from "./pages/Dota2RankTokensPage.tsx";
import Dota2CoachingPage from "./pages/Dota2CoachingPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import AdminOrderDetailsPage from "./pages/AdminOrderDetailsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import MyOrdersPage from "./pages/MyOrdersPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import RefundPage from "./pages/RefundPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

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
        style={{ willChange: "transform, opacity, filter" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/arena-breakout-infinite-boosting" element={<ArenaBreakoutInfiniteBoostingPage />} />
          <Route path="/buy-arena-breakout-infinite-koens" element={<BuyArenaBreakoutInfiniteKoensPage />} />
          <Route path="/arena-breakout-infinite-raids-boost" element={<ArenaBreakoutInfiniteRaidsBoostPage />} />
          <Route path="/arena-breakout-infinite-coaching" element={<ArenaBreakoutInfiniteCoachingPage />} />
          <Route path="/game/arena-breakout/:serviceId" element={<ArenaBreakoutServicePage />} />
          <Route path="/game/dota-2/mmr-boost" element={<Dota2MMRBoostPage />} />
          <Route path="/game/dota-2/lp-removal" element={<Dota2LPRemovalPage />} />
          <Route path="/game/dota-2/rank-tokens" element={<Dota2RankTokensPage />} />
          <Route path="/game/dota-2/coaching" element={<Dota2CoachingPage />} />
          <Route path="/game/dota-2/:serviceId" element={<Dota2ServicePage />} />
          <Route path="/game/:gameSlug" element={<GamePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/choose-booster" element={<BoosterSelectionPage />} />
          <Route path="/order/status/:orderId" element={<OrderStatusPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/order/:orderId" element={<AdminOrderDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <RouteProgressBar />
            <AnimatedRoutes />
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
