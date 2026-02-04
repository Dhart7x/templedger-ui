import { LayoutDashboard, Users, Building2, BarChart3, AlertTriangle, DollarSign, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "live-labour", label: "Live Labour", icon: Users },
  { id: "agencies", label: "Agencies", icon: Building2 },
  { id: "performance", label: "Performance", icon: BarChart3 },
  { id: "exceptions", label: "Exceptions", icon: AlertTriangle },
  { id: "spend", label: "Spend & Overtime", icon: DollarSign },
  { id: "settings", label: "Settings", icon: Settings },
];

const DemoSidebar = ({ activeView, onViewChange }: DemoSidebarProps) => {
  return (
    <div className="w-48 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <LayoutDashboard className="w-3 h-3 text-primary" />
          </div>
          <span className="font-semibold text-foreground text-sm">Temp Ledger</span>
        </div>
      </div>
      <nav className="flex-1 p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left",
              activeView === item.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DemoSidebar;
