import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export function AssetAllocation() {
  const { portfolio } = useAppStore();

  if (!portfolio) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground">No portfolio data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group investments by type
  const assetGroups = portfolio.investments.reduce((acc, investment) => {
    const { type, currentPrice, quantity } = investment;
    const value = currentPrice * quantity;
    
    if (!acc[type]) {
      acc[type] = { type, value };
    } else {
      acc[type].value += value;
    }
    
    return acc;
  }, {} as Record<string, { type: string; value: number }>);

  const data = Object.values(assetGroups);
  
  // Format type labels
  const formatType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Define colors for each asset type
  const COLORS = {
    stock: 'hsl(var(--chart-1))',
    etf: 'hsl(var(--chart-2))',
    crypto: 'hsl(var(--chart-3))',
    bond: 'hsl(var(--chart-4))',
    mutual_fund: 'hsl(var(--chart-5))',
    other: '#9CA3AF',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="type"
                label={({ type, percent }) => 
                  `${formatType(type)}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.type as keyof typeof COLORS] || COLORS.other} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                labelFormatter={(label) => formatType(label)}
              />
              <Legend 
                formatter={(value) => formatType(value)} 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}