import { useState } from "react";
import { Navigate } from "react-router";
import { useAppStore } from "@/lib/store";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function AuthPage() {
  const { isAuthenticated } = useAppStore();
  const [activeTab, setActiveTab] = useState<string>("login");

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      
      <div className="mb-8 flex items-center gap-2">
        <div className="rounded-full bg-primary p-2">
          <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
            <span className="text-primary font-bold text-lg">FG</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold">FinGaze</h1>
      </div>
      
      <Card className="mx-auto w-full max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Welcome to FinGaze</CardTitle>
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>
              AI-powered financial insights for retail investors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="login">
              <LoginForm onSuccess={() => {}} />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm onSuccess={() => setActiveTab("login")} />
            </TabsContent>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <div className="text-center text-sm text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full">
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full">
                Continue with Apple
              </Button>
            </div>
          </CardFooter>
        </Tabs>
      </Card>
      
      <p className="mt-4 text-center text-sm text-muted-foreground">
        FinGaze © {new Date().getFullYear()} | All rights reserved
      </p>
    </div>
  );
}