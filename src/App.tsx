import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MechanicalWork from "./pages/MechanicalWork";
import ElectricalWork from "./pages/ElectricalWork";
import DentingPainting from "./pages/DentingPainting";
import OilChangeSetup from "./pages/OilChangeSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mechanical-work" element={<MechanicalWork />} />
          <Route path="/electrical-work" element={<ElectricalWork />} />
          <Route path="/denting-painting" element={<DentingPainting />} />
          <Route path="/oil-change-setup" element={<OilChangeSetup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
