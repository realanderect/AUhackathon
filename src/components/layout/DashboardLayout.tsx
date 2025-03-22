import { AppSidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <AppSidebar />
        <main
          className={cn(
            "flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6",
            sidebarOpen ? "lg:ml-72" : ""
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
