import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { InvestmentRecommendation } from "@/lib/types";

export function RecommendationsList() {
  const { recommendations } = useAppStore();

  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Investment Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">No recommendations available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getRecommendationBadge = (type: InvestmentRecommendation['recommendationType']) => {
    switch (type) {
      case 'buy':
        return <Badge className="bg-green-500">Buy</Badge>;
      case 'sell':
        return <Badge variant="destructive">Sell</Badge>;
      case 'hold':
        return <Badge variant="outline">Hold</Badge>;
      default:
        return null;
    }
  };

  const getRiskBadge = (risk: InvestmentRecommendation['riskLevel']) => {
    switch (risk) {
      case 'high':
        return <Badge variant="outline" className="border-red-500 text-red-500">High Risk</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-500">Low Risk</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Investment Recommendations</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="rounded-lg border p-3 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{recommendation.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {recommendation.symbol}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1).replace('_', ' ')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    ${recommendation.currentPrice.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    {recommendation.potentialReturn >= 0 ? (
                      <>
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-green-500">
                          +{recommendation.potentialReturn.toFixed(1)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-3 w-3 text-red-500" />
                        <span className="text-sm text-red-500">
                          {recommendation.potentialReturn.toFixed(1)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {getRecommendationBadge(recommendation.recommendationType)}
                {getRiskBadge(recommendation.riskLevel)}
                <Badge variant="secondary">
                  {recommendation.timeHorizon.charAt(0).toUpperCase() + recommendation.timeHorizon.slice(1)} Term
                </Badge>
              </div>
              
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Confidence</span>
                  <span className="font-medium">{recommendation.confidence}%</span>
                </div>
                <Progress
                  value={recommendation.confidence}
                  className={cn(
                    recommendation.confidence > 75 ? "bg-green-100" : "",
                    recommendation.confidence > 50 && recommendation.confidence <= 75 ? "bg-yellow-100" : "",
                    recommendation.confidence <= 50 ? "bg-red-100" : ""
                  )}
                />
              </div>
              
              <p className="mt-3 text-sm">
                {recommendation.reasoning}
              </p>
              
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm">
                  {recommendation.recommendationType === 'buy' ? 'Buy Now' : 
                   recommendation.recommendationType === 'sell' ? 'Sell Now' : 'View'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}