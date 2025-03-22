import { useEffect } from "react";
import { Navigate } from "react-router";
import { useAppStore } from "@/lib/store";
import { api } from "@/lib/api";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";
import { AssetAllocation } from "@/components/dashboard/AssetAllocation";
import { MarketTrendsList } from "@/components/dashboard/MarketTrendsList";
import { RecommendationsList } from "@/components/dashboard/RecommendationsList";
import { TaxSummary } from "@/components/dashboard/TaxSummary";

export default function DashboardPage() {
  const { 
    isAuthenticated, 
    user, 
    setPortfolio, 
    setMarketTrends, 
    setRecommendations, 
    setAlerts,
    setTaxEstimates
  } = useAppStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch portfolio data
      api.getPortfolio(user.id).then(setPortfolio);
      
      // Fetch market trends
      api.getMarketTrends().then(setMarketTrends);
      
      // Fetch recommendations
      api.getRecommendations(user.id).then(setRecommendations);
      
      // Fetch alerts
      api.getAlerts(user.id).then(setAlerts);
      
      // Fetch tax estimates
      api.getTaxEstimates(user.id, new Date().getFullYear()).then(setTaxEstimates);
    }
  }, [isAuthenticated, user, setPortfolio, setMarketTrends, setRecommendations, setAlerts, setTaxEstimates]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <PortfolioSummary />
          <AssetAllocation />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <MarketTrendsList />
          </div>
          <TaxSummary />
        </div>
        
        <RecommendationsList />
      </div>
    </DashboardLayout>
  );
}