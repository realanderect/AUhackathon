import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { MarketTrend } from "@/lib/types";

export function MarketTrendsList() {
  const { marketTrends } = useAppStore();

  if (!marketTrends || marketTrends.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">No market trends available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getSentimentIcon = (sentiment: MarketTrend['sentiment']) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getImpactBadge = (impact: MarketTrend['impactLevel']) => {
    switch (impact) {
      case 'high':
        return <Badge variant="destructive">High Impact</Badge>;
      case 'medium':
        return <Badge variant="default">Medium Impact</Badge>;
      case 'low':
        return <Badge variant="outline">Low Impact</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketTrends.map((trend) => (
            <div
              key={trend.id}
              className="rounded-lg border p-3 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSentimentIcon(trend.sentiment)}
                  <h3 className="font-medium">{trend.title}</h3>
                </div>
                {getImpactBadge(trend.impactLevel)}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {trend.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {trend.relatedSectors.map((sector) => (
                  <Badge key={sector} variant="secondary">
                    {sector}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{trend.source}</span>
                <span>{new Date(trend.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}