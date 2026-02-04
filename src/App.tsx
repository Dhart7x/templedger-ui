import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Website from "./pages/Website";
import HowItWorks from "./pages/website/HowItWorks";
import Performance from "./pages/website/Performance";
import TimeAndAttendance from "./pages/website/TimeAndAttendance";
import ForLabourUsers from "./pages/website/ForLabourUsers";
import ForAgencies from "./pages/website/ForAgencies";
import SecurityAndAudit from "./pages/website/SecurityAndAudit";
import SalesDeck from "./pages/SalesDeck";
import InvestorDeck from "./pages/InvestorDeck";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/website" element={<Website />} />
          <Route path="/website/how-it-works" element={<HowItWorks />} />
          <Route path="/website/performance" element={<Performance />} />
          <Route path="/website/time-and-attendance" element={<TimeAndAttendance />} />
          <Route path="/website/for-labour-users" element={<ForLabourUsers />} />
          <Route path="/website/for-agencies" element={<ForAgencies />} />
          <Route path="/website/security-and-audit" element={<SecurityAndAudit />} />
          <Route path="/sales-deck" element={<SalesDeck />} />
          <Route path="/investor-deck" element={<InvestorDeck />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;