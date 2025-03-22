import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function PortfolioSummary() {
  const { portfolio } = useAppStore();

  if (!portfolio) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">No portfolio data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isPositive = portfolio.returnsPercentage >= 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">
              ${portfolio.totalValue.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Invested</p>
            <p className="text-2xl font-bold">
              ${portfolio.totalInvested.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Returns</p>
            <p className="text-2xl font-bold">
              ${portfolio.returns.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Returns %</p>
            <div className="flex items-center">
              <p
                className={cn(
                  "text-2xl font-bold",
                  isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {isPositive ? "+" : ""}
                {portfolio.returnsPercentage.toFixed(2)}%
              </p>
              <span
                className={cn(
                  "ml-2 rounded-full p-1",
                  isPositive ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                )}
              >
                {isPositive ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Last updated: {portfolio.lastUpdated.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}