import { 
  BarChart3,
  CircleDollarSign,
  FileText,
  Home,
  LineChart,
  Mail,
  Settings,
  TrendingUp,
  User,
  Wallet
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navigationItems = {
  main: [
    {
      title: "Overview",
      href: "/",
      icon: Home,
      description: "Dashboard overview"
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      icon: Wallet,
      description: "View your investments"
    },
    {
      title: "Market Analysis",
      href: "/insights",
      icon: TrendingUp,
      description: "Market insights and trends"
    }
  ],
  investment: [
    {
      title: "Investments",
      href: "/investments",
      icon: CircleDollarSign,
      description: "Manage investments"
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      description: "Performance metrics"
    }
  ],
  management: [
    {
      title: "Tax Reports",
      href: "/tax",
      icon: FileText,
      description: "Tax and documents"
    },
    {
      title: "Alerts",
      href: "/alerts",
      icon: Mail,
      badge: "3",
      description: "Notifications center"
    }
  ],
  account: [
    {
      title: "Profile",
      href: "/profile",
      icon: User,
      description: "Your account settings"
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      description: "Preferences"
    }
  ]
};

function NavItem({ item }: { item: any }) {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-accent/50",
          isActive && "bg-accent text-accent-foreground"
        )
      }
    >
      <div className="flex items-center gap-3">
        <item.icon className="h-4 w-4" />
        <span>{item.title}</span>
      </div>
      {item.badge && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {item.badge}
        </span>
      )}
      <div className="absolute left-0 right-0 -bottom-px h-px bg-accent/50 opacity-0 transition-opacity group-hover:opacity-100" />
    </NavLink>
  );
}

function NavGroup({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="space-y-1">
      <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      <nav className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </nav>
    </div>
  );
}

export function AppSidebar() {
  const { sidebarOpen, user } = useAppStore();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r bg-card transition-transform duration-300 ease-in-out lg:translate-x-0",
        !sidebarOpen && "-translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="rounded-xl bg-primary p-2">
          <div className="h-5 w-5 rounded-lg bg-primary-foreground flex items-center justify-center">
            <span className="text-primary font-bold text-sm">FG</span>
          </div>
        </div>
        <span className="font-semibold tracking-tight">FinGaze</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-6">
          <NavGroup title="Overview" items={navigationItems.main} />
          <NavGroup title="Investment" items={navigationItems.investment} />
          <NavGroup title="Management" items={navigationItems.management} />
          <Separator className="my-4" />
          <NavGroup title="Account" items={navigationItems.account} />
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
            <span className="font-medium">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </span>
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-medium">{user?.name || 'User'}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[160px]">
              {user?.email || 'user@example.com'}
            </span>
          </div>
        </Button>
      </div>
    </aside>
  );
}
