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
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ArrowRight, 
  Calendar, 
  Download, 
  FileText, 
  HelpCircle, 
  Receipt, 
  Upload 
} from "lucide-react";
import { TaxSummary } from "@/components/dashboard/TaxSummary";
import { cn } from "@/lib/utils";

export default function TaxPage() {
  const { isAuthenticated, portfolio, taxEstimates } = useAppStore();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for tax breakdown
  const taxBreakdownData = [
    { name: "Long-term Capital Gains", value: 7500 },
    { name: "Short-term Capital Gains", value: 5000 },
    { name: "Dividend Income", value: 2000 },
    { name: "Interest Income", value: 800 },
  ];

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ];

  // Sample data for quarterly tax estimates
  const quarterlyTaxData = [
    { name: "Q1", amount: 320 },
    { name: "Q2", amount: 450 },
    { name: "Q3", amount: 280 },
    { name: "Q4", amount: 345 },
  ];

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Tax & Compliance</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Tax Documents
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Tax Report
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calculator">Tax Calculator</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <TaxSummary />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Breakdown</CardTitle>
                    <CardDescription>
                      Breakdown of taxable income by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={taxBreakdownData}
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
                            {taxBreakdownData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quarterly Tax Estimates</CardTitle>
                    <CardDescription>
                      Estimated quarterly tax payments for {new Date().getFullYear()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={quarterlyTaxData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value}`} />
                          <Tooltip formatter={(value) => [`$${value}`, 'Estimated Tax']} />
                          <Bar
                            dataKey="amount"
                            name="Estimated Tax"
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-4 rounded-lg border p-4">
                      <h3 className="font-medium">Important Tax Dates</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Q1 Estimated Payment</span>
                          </div>
                          <span>April 15, {new Date().getFullYear()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Q2 Estimated Payment</span>
                          </div>
                          <span>June 15, {new Date().getFullYear()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Q3 Estimated Payment</span>
                          </div>
                          <span>September 15, {new Date().getFullYear()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Q4 Estimated Payment</span>
                          </div>
                          <span>January 15, {new Date().getFullYear() + 1}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="calculator">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Calculator</CardTitle>
                  <CardDescription>
                    Estimate your investment tax liability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="tax-year">Tax Year</Label>
                          <Select defaultValue="2023">
                            <SelectTrigger id="tax-year">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2023">2023</SelectItem>
                              <SelectItem value="2022">2022</SelectItem>
                              <SelectItem value="2021">2021</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="filing-status">Filing Status</Label>
                          <Select defaultValue="single">
                            <SelectTrigger id="filing-status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Single</SelectItem>
                              <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                              <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                              <SelectItem value="head">Head of Household</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="income">Annual Income</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                            <Input
                              id="income"
                              type="number"
                              placeholder="0.00"
                              className="pl-7"
                              defaultValue="85000"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="long-term-gains">Long-term Capital Gains</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                            <Input
                              id="long-term-gains"
                              type="number"
                              placeholder="0.00"
                              className="pl-7"
                              defaultValue="7500"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="short-term-gains">Short-term Capital Gains</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                            <Input
                              id="short-term-gains"
                              type="number"
                              placeholder="0.00"
                              className="pl-7"
                              defaultValue="5000"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="dividend-income">Dividend Income</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                            <Input
                              id="dividend-income"
                              type="number"
                              placeholder="0.00"
                              className="pl-7"
                              defaultValue="2000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Calculate Tax</Button>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">Tax Estimate Results</h3>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg bg-muted p-3">
                          <div className="text-sm text-muted-foreground">Total Taxable Income</div>
                          <div className="text-2xl font-bold">$99,500.00</div>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <div className="text-sm text-muted-foreground">Estimated Tax Liability</div>
                          <div className="text-2xl font-bold">$18,905.00</div>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <div className="text-sm text-muted-foreground">Effective Tax Rate</div>
                          <div className="text-2xl font-bold">19.0%</div>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <div className="text-sm text-muted-foreground">Marginal Tax Bracket</div>
                          <div className="text-2xl font-bold">24%</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <HelpCircle className="h-4 w-4" />
                          <span>This is an estimate only. Consult a tax professional.</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Export Results
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Documents</CardTitle>
                  <CardDescription>
                    Access and manage your tax documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Annual Tax Report</div>
                          <div className="text-sm text-muted-foreground">
                            Complete tax summary for {new Date().getFullYear() - 1}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Form 1099-B</div>
                          <div className="text-sm text-muted-foreground">
                            Proceeds from broker transactions
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Form 1099-DIV</div>
                          <div className="text-sm text-muted-foreground">
                            Dividends and distributions
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Form 1099-INT</div>
                          <div className="text-sm text-muted-foreground">
                            Interest income
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Quarterly Tax Statement - Q1</div>
                          <div className="text-sm text-muted-foreground">
                            January - March {new Date().getFullYear()}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="compliance">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                  <CardDescription>
                    Stay compliant with financial regulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">Compliance Status</h3>
                      <div className="mt-4 flex items-center gap-2">
                        <div className={cn(
                          "h-3 w-3 rounded-full",
                          "bg-green-500"
                        )} />
                        <span className="font-medium">Your account is currently compliant with all regulations</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Last compliance check: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Compliance Checklist</h3>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Tax Reporting</div>
                              <div className="text-sm text-muted-foreground">
                                All required tax forms have been generated
                              </div>
                            </div>
                          </div>
                          <div className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            "bg-green-100 text-green-700"
                          )}>
                            Compliant
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">KYC Verification</div>
                              <div className="text-sm text-muted-foreground">
                                Know Your Customer verification is complete
                              </div>
                            </div>
                          </div>
                          <div className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            "bg-green-100 text-green-700"
                          )}>
                            Verified
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Wash Sale Rules</div>
                              <div className="text-sm text-muted-foreground">
                                No wash sale violations detected
                              </div>
                            </div>
                          </div>
                          <div className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            "bg-green-100 text-green-700"
                          )}>
                            Compliant
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Foreign Account Reporting</div>
                              <div className="text-sm text-muted-foreground">
                                FBAR compliance status
                              </div>
                            </div>
                          </div>
                          <div className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            "bg-yellow-100 text-yellow-700"
                          )}>
                            Not Applicable
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-medium">Compliance Assistance</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Our AI-powered compliance assistant can help you navigate complex financial regulations and ensure your investments remain compliant.
                      </p>
                      <div className="mt-4">
                        <Button>
                          Get Compliance Assistance
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
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