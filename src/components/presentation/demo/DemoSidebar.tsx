import { Eye, Building2, Users, FileCheck, ClipboardList, BarChart3, Bell, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemoContext } from "./DemoContext";

interface DemoSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "snapshot", label: "Live Snapshot", icon: Eye, description: "What's happening now" },
  { id: "departments", label: "Sites & Departments", icon: Building2, description: "Operational clarity" },
  { id: "agencies", label: "Agencies", icon: Users, description: "Provider performance" },
  { id: "coverage", label: "Bookings", icon: ClipboardList, description: "Demand control" },
  { id: "payroll", label: "Payroll & Invoicing", icon: FileCheck, description: "Assurance" },
  { id: "ledger", label: "Performance", icon: BarChart3, description: "Retrospective" },
];

const DemoSidebar = ({ activeView, onViewChange }: DemoSidebarProps) => {
  const { notifications } = useDemoContext();
  const unreadCount = notifications.filter(n => !n.read && (n.targetView === "labour-user" || n.targetView === "both")).length;

  return (
    <div className="w-52 md:w-60 bg-[hsl(222,47%,6%)] border-r border-[hsl(217,33%,12%)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[hsl(217,33%,12%)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Clipper Logistics</div>
            <div className="text-[10px] text-muted-foreground">Labour User Portal</div>
          </div>
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-2 mt-3 px-2 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium text-emerald-500">LIVE • 67 workers on-site</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all",
                    isActive
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-[hsl(217,33%,10%)] border border-transparent"
                  )}
                >
                  <item.icon className={cn(
                    "w-4 h-4 mt-0.5 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "block text-sm font-medium",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {item.label}
                    </span>
                    <span className="block text-[10px] text-muted-foreground/70 truncate">
                      {item.description}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Notifications */}
      <div className="p-2 border-t border-[hsl(217,33%,12%)]">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[hsl(217,33%,10%)] transition-colors">
          <div className="relative">
            <Bell className="w-4 h-4 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary text-[9px] font-medium flex items-center justify-center text-white">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-sm text-muted-foreground">Notifications</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[hsl(217,33%,12%)] bg-[hsl(222,47%,5%)]">
        <div className="text-[10px] text-muted-foreground/60 text-center">
          Temp Ledger • Unified Record
        </div>
      </div>
    </div>
  );
};

export default DemoSidebar;
