import { useState } from "react";
import { Navigate } from "react-router";
import { useAppStore } from "@/lib/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RecommendationsList } from "@/components/dashboard/RecommendationsList";
import { Brain, ChevronDown, Filter, Plus, Search } from "lucide-react";

export default function InvestmentsPage() {
  const { isAuthenticated } = useAppStore();
  const [activeTab, setActiveTab] = useState("recommendations");
  const [riskTolerance, setRiskTolerance] = useState(50);

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Investment Planner</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Investment
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="planner">Investment Planner</TabsTrigger>
            <TabsTrigger value="goals">Financial Goals</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="recommendations">
              <RecommendationsList />
            </TabsContent>
            
            <TabsContent value="planner">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Profile</CardTitle>
                    <CardDescription>
                      Customize your investment preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Risk Tolerance</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">Conservative</span>
                          <Slider
                            value={[riskTolerance]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => setRiskTolerance(value[0])}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">Aggressive</span>
                        </div>
                        <div className="text-center text-sm font-medium">
                          {riskTolerance < 30 ? "Conservative" : 
                           riskTolerance < 70 ? "Moderate" : "Aggressive"}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="investment-horizon">Investment Horizon</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="investment-horizon">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short Term (&lt; 2 years)</SelectItem>
                            <SelectItem value="medium">Medium Term (2-5 years)</SelectItem>
                            <SelectItem value="long">Long Term (5+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="investment-amount">Investment Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                          <Input
                            id="investment-amount"
                            type="number"
                            placeholder="0.00"
                            className="pl-7"
                            defaultValue="10000"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Label>Investment Preferences</Label>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="esg-investing">ESG Investing</Label>
                            <p className="text-sm text-muted-foreground">
                              Focus on environmental, social, and governance factors
                            </p>
                          </div>
                          <Switch id="esg-investing" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="dividend-focus">Dividend Focus</Label>
                            <p className="text-sm text-muted-foreground">
                              Prioritize investments with regular dividend payments
                            </p>
                          </div>
                          <Switch id="dividend-focus" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="tech-focus">Technology Focus</Label>
                            <p className="text-sm text-muted-foreground">
                              Emphasize technology sector investments
                            </p>
                          </div>
                          <Switch id="tech-focus" defaultChecked />
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        <Brain className="mr-2 h-4 w-4" />
                        Generate Investment Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Generated Investment Plan</CardTitle>
                    <CardDescription>
                      Personalized investment strategy based on your profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Portfolio Allocation</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Recommended asset allocation based on your risk profile
                        </p>
                        
                        <div className="mt-4 space-y-2">
                          <div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Stocks</span>
                              <span className="font-medium">60%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-primary" style={{ width: "60%" }} />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Bonds</span>
                              <span className="font-medium">20%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-primary" style={{ width: "20%" }} />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between text-sm">
                              <span>ETFs</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-primary" style={{ width: "15%" }} />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Cash</span>
                              <span className="font-medium">5%</span>
                            </div>
                            <div className="mt-1 h-2 w-full rounded-full bg-muted">
                              <div className="h-2 rounded-full bg-primary" style={{ width: "5%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Investment Strategy</h3>
                        <div className="mt-2 space-y-2 text-sm">
                          <p>
                            Based on your moderate risk tolerance and medium-term investment horizon, we recommend a balanced portfolio with a focus on growth and income.
                          </p>
                          <p>
                            Your preference for technology and dividend stocks suggests allocating 40% to quality dividend-paying tech companies, 20% to growth-oriented tech stocks, 20% to bond ETFs for stability, 15% to broad market ETFs, and 5% cash reserve.
                          </p>
                          <p>
                            This strategy aims to provide an estimated annual return of 8-10% with moderate volatility.
                          </p>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium">Recommended Actions</h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>Invest $4,000 in dividend-paying tech stocks (AAPL, MSFT, CSCO)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>Allocate $2,000 to growth tech stocks (NVDA, AMD, CRM)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>Invest $2,000 in bond ETFs (AGG, BND)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>Allocate $1,500 to broad market ETFs (VTI, VOO)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>Maintain $500 in cash reserves</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Save Plan</Button>
                        <Button>Implement Plan</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="goals">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Goals</CardTitle>
                  <CardDescription>
                    Track and manage your financial objectives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Retirement</h3>
                          <p className="text-sm text-muted-foreground">Target: 2050</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">$250,000 / $1,000,000</div>
                          <p className="text-sm text-muted-foreground">25% Complete</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "25%" }} />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">House Down Payment</h3>
                          <p className="text-sm text-muted-foreground">Target: 2025</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">$35,000 / $100,000</div>
                          <p className="text-sm text-muted-foreground">35% Complete</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "35%" }} />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Goal
                      </Button>
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