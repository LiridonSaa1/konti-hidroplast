import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LoadingScreen } from "@/components/loading-screen";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import Home from "@/pages/home";
import AboutUs from "@/pages/about-us";
import ProductsPage from "@/pages/products";
import WaterSupplySystemsPage from "@/pages/water-supply-systems";
import GasPipelineSystemsPage from "@/pages/gas-pipeline-systems";
import CableProtectionPage from "@/pages/cable-protection";
import BrochuresPage from "@/pages/brochures";
import CertificatesPage from "@/pages/certificates";
import NewsPage from "@/pages/news";
import CareerPage from "@/pages/career";
import ManholesPage from "@/pages/manholes";
import KontiKanPipesAndFittingsPage from "@/pages/konti-kan-pipes-and-fittings";
import KontiKanSpiralPipesPage from "@/pages/konti-kan-spiral-pipes";
import PPHMPipesAndFittingsPage from "@/pages/pp-hm-pipes-and-fittings";
import PPHMSmoothODPage from "@/pages/pp-hm-smooth-od";
import NotFound from "@/pages/not-found";

function Router() {
  // Add scroll to top functionality for all route changes
  useScrollToTop();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/water-supply-systems" component={WaterSupplySystemsPage} />
      <Route path="/products/gas-pipeline-systems" component={GasPipelineSystemsPage} />
      <Route path="/products/cable-protection" component={CableProtectionPage} />
      <Route path="/brochures" component={BrochuresPage} />
      <Route path="/certificates" component={CertificatesPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/career" component={CareerPage} />
      <Route path="/manholes" component={ManholesPage} />
      <Route path="/konti-kan-pipes-and-fittings" component={KontiKanPipesAndFittingsPage} />
      <Route path="/konti-kan-spiral-pipes" component={KontiKanSpiralPipesPage} />
      <Route path="/pp-hm-pipes-and-fittings" component={PPHMPipesAndFittingsPage} />
      <Route path="/pp-hm-smooth-od" component={PPHMSmoothODPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
