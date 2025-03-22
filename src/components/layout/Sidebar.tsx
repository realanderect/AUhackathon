import { 
  BarChart3, 
  Home, 
  LineChart, 
  Mail, 
  PieChart, 
  Receipt, 
  Settings, 
  TrendingUp, 
  User 
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSection,
} from "@/components/ui/sidebar";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    icon: PieChart,
  },
  {
    title: "Market Insights",
    href: "/insights",
    icon: TrendingUp,
  },
  {
    title: "Investments",
    href: "/investments",
    icon: LineChart,
  },
  {
    title: "Tax & Compliance",
    href: "/tax",
    icon: Receipt,
  },
];

const secondaryNavItems = [
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: Mail,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { sidebarOpen, user } = useAppStore();

  return (
    <Sidebar
      open={sidebarOpen}
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-transform lg:translate-x-0",
        !sidebarOpen && "-translate-x-full"
      )}
    >
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary p-1">
            <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center">
              <span className="text-primary font-bold text-sm">FG</span>
            </div>
          </div>
          <span className="font-bold">FinGaze</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-auto py-2">
        <SidebarSection>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarSection>
        <SidebarSection>
          <div className="px-3 py-2">
            <h3 className="mb-1 text-xs font-medium text-muted-foreground">
              Settings
            </h3>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </SidebarSection>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-muted p-1">
            <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
              <span className="font-medium">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name || 'User'}</span>
            <span className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}