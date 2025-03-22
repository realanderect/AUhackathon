import { useState } from "react";
import { Navigate } from "react-router";
import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ArrowRight, Brain, ChevronDown, Filter, Search, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarketTrendsList } from "@/components/dashboard/MarketTrendsList";

export default function InsightsPage() {
  const { isAuthenticated, marketTrends } = useAppStore();
  const [activeTab, setActiveTab] = useState("market-trends");

  // Sample data for charts
  const sectorPerformanceData = [
    { name: "Technology", value: 12.5 },
    { name: "Healthcare", value: 8.3 },
    { name: "Financial", value: -2.1 },
    { name: "Energy", value: -5.4 },
    { name: "Consumer", value: 3.7 },
    { name: "Industrial", value: 1.2 },
    { name: "Materials", value: -0.8 },
    { name: "Utilities", value: 2.5 },
  ];

  const marketIndexData = [
    { date: "Jan", S_P500: 4500, Nasdaq: 14000, Dow: 35000 },
    { date: "Feb", S_P500: 4550, Nasdaq: 14200, Dow: 35200 },
    { date: "Mar", S_P500: 4600, Nasdaq: 14500, Dow: 35400 },
    { date: "Apr", S_P500: 4650, Nasdaq: 14300, Dow: 35600 },
    { date: "May", S_P500: 4700, Nasdaq: 14600, Dow: 35800 },
    { date: "Jun", S_P500: 4750, Nasdaq: 14800, Dow: 36000 },
  ];

  const sentimentData = [
    { name: "Bullish", value: 45 },
    { name: "Neutral", value: 30 },
    { name: "Bearish", value: 25 },
  ];

  const SENTIMENT_COLORS = ["#10b981", "#6b7280", "#ef4444"];

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Market Insights</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button>
              <Brain className="mr-2 h-4 w-4" />
              Generate AI Analysis
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market-trends">Market Trends</TabsTrigger>
            <TabsTrigger value="sector-analysis">Sector Analysis</TabsTrigger>
            <TabsTrigger value="sentiment-analysis">Sentiment Analysis</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="market-trends">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Market Indices Performance</CardTitle>
                    <CardDescription>
                      6-month performance of major market indices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={marketIndexData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="S_P500"
                            name="S&P 500"
                            stroke="hsl(var(--chart-1))"
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="Nasdaq"
                            stroke="hsl(var(--chart-2))"
                          />
                          <Line
                            type="monotone"
                            dataKey="Dow"
                            name="Dow Jones"
                            stroke="hsl(var(--chart-3))"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Market Sentiment</CardTitle>
                    <CardDescription>
                      Current market sentiment analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sentimentData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => 
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {sentimentData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <MarketTrendsList />
              </div>
            </TabsContent>
            
            <TabsContent value="sector-analysis">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sector Performance</CardTitle>
                    <CardDescription>
                      Monthly performance by sector
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={sectorPerformanceData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                          <YAxis type="category" dataKey="name" width={100} />
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Bar
                            dataKey="value"
                            name="Performance"
                            fill="hsl(var(--primary))"
                            radius={[0, 4, 4, 0]}
                            label={{ 
                              position: 'right',
                              formatter: (value: number) => `${value > 0 ? '+' : ''}${value}%` 
                            }}
                          >
                            {sectorPerformanceData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.value >= 0 ? "#10b981" : "#ef4444"}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sector Insights</CardTitle>
                    <CardDescription>
                      AI-generated sector analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <h3 className="font-medium">Technology Sector</h3>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          The technology sector continues to show strong growth, driven by AI advancements and cloud computing demand. Companies with strong AI capabilities are outperforming peers.
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline" className="bg-green-100 text-green-700">
                            +12.5% MTD
                          </Badge>
                          <Button variant="link" size="sm" className="p-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-4 w-4 text-red-500" />
                          <h3 className="font-medium">Energy Sector</h3>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          The energy sector is facing headwinds due to global supply chain disruptions and regulatory changes. Renewable energy companies are showing more resilience than traditional energy.
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline" className="bg-red-100 text-red-700">
                            -5.4% MTD
                          </Badge>
                          <Button variant="link" size="sm" className="p-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <h3 className="font-medium">Healthcare Sector</h3>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Healthcare is showing strong performance with biotech and pharmaceutical companies leading the growth. Innovation in treatment methods and increased healthcare spending are key drivers.
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline" className="bg-green-100 text-green-700">
                            +8.3% MTD
                          </Badge>
                          <Button variant="link" size="sm" className="p-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline" className="w-full">
                        View All Sector Insights
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="sentiment-analysis">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Sentiment Analysis</CardTitle>
                  <CardDescription>
                    Analysis of market sentiment based on news, social media, and analyst reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold text-green-500">45%</div>
                        <div className="mt-1 text-sm font-medium">Bullish</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          +5% from last week
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold">30%</div>
                        <div className="mt-1 text-sm font-medium">Neutral</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          -2% from last week
                        </div>
                      </div>
                      <div className="rounded-lg border p-4 text-center">
                        <div className="text-2xl font-bold text-red-500">25%</div>
                        <div className="mt-1 text-sm font-medium">Bearish</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          -3% from last week
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">Key Sentiment Drivers</h3>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Strong Earnings Reports</h4>
                            <p className="text-sm text-muted-foreground">
                              Major tech companies have reported better-than-expected earnings, driving positive sentiment across the market. Analysts are revising growth forecasts upward.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-green-100 p-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Favorable Economic Data</h4>
                            <p className="text-sm text-muted-foreground">
                              Recent economic indicators show controlled inflation and steady job growth, reducing fears of aggressive interest rate hikes.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-red-100 p-2">
                            <TrendingDown className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Supply Chain Concerns</h4>
                            <p className="text-sm text-muted-foreground">
                              Ongoing global supply chain disruptions continue to impact manufacturing sectors, creating uncertainty for industrial companies.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">AI Sentiment Prediction</h3>
                      <p className="mt-2 text-muted-foreground">
                        Based on current trends and historical patterns, our AI model predicts:
                      </p>
                      <div className="mt-4 rounded-lg bg-muted p-4">
                        <p className="font-medium">
                          Market sentiment is likely to remain cautiously optimistic over the next 30 days, with technology and healthcare sectors continuing to lead positive sentiment. Watch for potential volatility around upcoming Federal Reserve announcements.
                        </p>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Confidence: 78%</span>
                          <span className="text-muted-foreground">Updated: {new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}