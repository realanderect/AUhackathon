import { Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/lib/store";

export function TaxSummary() {
  const { taxEstimates } = useAppStore();

  if (!taxEstimates) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tax Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">No tax data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const netGainPercentage = (taxEstimates.netTaxableGain / taxEstimates.totalGains) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          <span>Tax Summary {taxEstimates.year}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Gains</p>
              <p className="text-xl font-bold text-green-500">
                ${taxEstimates.totalGains.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Losses</p>
              <p className="text-xl font-bold text-red-500">
                ${taxEstimates.totalLosses.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Net Taxable Gain</p>
              <p className="text-sm font-medium">
                ${taxEstimates.netTaxableGain.toLocaleString()}
              </p>
            </div>
            <Progress value={netGainPercentage} className="h-2" />
            <p className="mt-1 text-xs text-muted-foreground">
              {netGainPercentage.toFixed(0)}% of total gains
            </p>
          </div>

          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center justify-between">
              <p className="font-medium">Estimated Tax</p>
              <p className="font-bold">${taxEstimates.estimatedTax.toLocaleString()}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {taxEstimates.taxRate}% tax rate
            </p>
          </div>

          <div className="flex justify-end">
            <a href="/tax" className="text-sm font-medium text-primary hover:underline">
              View detailed tax report
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}