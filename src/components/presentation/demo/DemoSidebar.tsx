import { Eye, Building2, Users, FileCheck, CalendarPlus, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "snapshot", label: "Live Snapshot", icon: Eye },
  { id: "departments", label: "Departments", icon: Building2 },
  { id: "agencies", label: "Agencies", icon: Users },
  { id: "ledger", label: "Execution Ledger", icon: BookOpen },
  { id: "payroll", label: "Payroll & Billing", icon: FileCheck },
  { id: "headcount", label: "Headcount", icon: CalendarPlus },
];

const DemoSidebar = ({ activeView, onViewChange }: DemoSidebarProps) => {
  return (
    <div className="w-48 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <Eye className="w-3 h-3 text-primary" />
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
