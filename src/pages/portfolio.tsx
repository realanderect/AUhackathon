import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Download, Filter, Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { Investment } from "@/lib/types";

export default function PortfolioPage() {
  const { isAuthenticated, portfolio } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Investment;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    if (portfolio?.investments) {
      let filtered = [...portfolio.investments];
      
      if (searchTerm) {
        filtered = filtered.filter(
          (investment) =>
            investment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            investment.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (sortConfig) {
        filtered.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        });
      }
      
      setFilteredInvestments(filtered);
    }
  }, [portfolio, searchTerm, sortConfig]);

  const handleSort = (key: keyof Investment) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Generate performance data for chart
  const generatePerformanceData = () => {
    if (!portfolio) return [];
    
    // This would normally come from real historical data
    // For demo purposes, we're generating random data
    const today = new Date();
    const data = [];
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Generate a somewhat realistic growth curve
      const baseValue = portfolio.totalInvested;
      const growthFactor = 1 + (portfolio.returnsPercentage / 100) * (30 - i) / 30;
      const randomVariation = 0.99 + Math.random() * 0.02; // Small random variation
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(baseValue * growthFactor * randomVariation),
      });
    }
    
    return data;
  };

  const performanceData = generatePerformanceData();

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Investment
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(tick) => {
                      const date = new Date(tick);
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={(tick) => `$${tick.toLocaleString()}`}
                    tick={{ fontSize: 12 }}
                  />
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      });
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="stocks">Stocks</TabsTrigger>
                  <TabsTrigger value="etfs">ETFs</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search investments..."
                      className="pl-8 w-full sm:w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center gap-1">
                            Name
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead 
                          className="cursor-pointer text-right"
                          onClick={() => handleSort('purchasePrice')}
                        >
                          <div className="flex items-center justify-end gap-1">
                            Purchase Price
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer text-right"
                          onClick={() => handleSort('currentPrice')}
                        >
                          <div className="flex items-center justify-end gap-1">
                            Current Price
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead 
                          className="cursor-pointer text-right"
                          onClick={() => handleSort('returnsPercentage')}
                        >
                          <div className="flex items-center justify-end gap-1">
                            Return %
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvestments.length > 0 ? (
                        filteredInvestments.map((investment) => (
                          <TableRow key={investment.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{investment.name}</div>
                                <div className="text-sm text-muted-foreground">{investment.symbol}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {investment.type.charAt(0).toUpperCase() + investment.type.slice(1).replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              ${investment.purchasePrice.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              ${investment.currentPrice.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              {investment.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              <span
                                className={cn(
                                  "font-medium",
                                  investment.returnsPercentage && investment.returnsPercentage >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                )}
                              >
                                {investment.returnsPercentage && investment.returnsPercentage >= 0 ? "+" : ""}
                                {investment.returnsPercentage?.toFixed(2)}%
                              </span>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${(investment.currentPrice * investment.quantity).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No investments found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="stocks">
                <div className="rounded-md border">
                  <Table>
                    {/* Same structure as "all" tab but filtered for stocks */}
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead className="text-right">Purchase Price</TableHead>
                        <TableHead className="text-right">Current Price</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Return %</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvestments
                        .filter((investment) => investment.type === "stock")
                        .map((investment) => (
                          <TableRow key={investment.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{investment.name}</div>
                                <div className="text-sm text-muted-foreground">{investment.symbol}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{investment.sector || "N/A"}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              ${investment.purchasePrice.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              ${investment.currentPrice.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              {investment.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              <span
                                className={cn(
                                  "font-medium",
                                  investment.returnsPercentage && investment.returnsPercentage >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                                )}
                              >
                                {investment.returnsPercentage && investment.returnsPercentage >= 0 ? "+" : ""}
                                {investment.returnsPercentage?.toFixed(2)}%
                              </span>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${(investment.currentPrice * investment.quantity).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              {/* Similar structure for other tabs */}
              <TabsContent value="etfs">
                <div className="p-8 text-center text-muted-foreground">
                  ETF investments will be displayed here
                </div>
              </TabsContent>
              
              <TabsContent value="crypto">
                <div className="p-8 text-center text-muted-foreground">
                  Crypto investments will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}