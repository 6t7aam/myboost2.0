import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import StructuredData from "@/components/StructuredData";
import { buildOrganizationSchema } from "@/lib/structuredData";

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
  helmetContext?: Record<string, unknown>;
}

const AppProviders = ({ children, helmetContext }: AppProvidersProps) => (
  <HelmetProvider context={helmetContext}>
    <StructuredData data={buildOrganizationSchema()} />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          {children}
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default AppProviders;
