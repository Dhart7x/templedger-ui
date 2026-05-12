import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SalesDeck from "./pages/SalesDeck";
import NewSalesDeck from "./pages/NewSalesDeck";
import InvestorDeck from "./pages/InvestorDeckCapital";
import NotFound from "./pages/NotFound";
import AccessGate from "./components/AccessGate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<AccessGate><SalesDeck /></AccessGate>} />
          <Route path="/sales-deck" element={<AccessGate><NewSalesDeck /></AccessGate>} />
          <Route path="/capital" element={<AccessGate><InvestorDeck /></AccessGate>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
