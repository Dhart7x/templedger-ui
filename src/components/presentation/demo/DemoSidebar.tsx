import { Eye, Building2, Users, FileCheck, CalendarPlus, BookOpen, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "snapshot", label: "Live Snapshot", icon: Eye },
  { id: "departments", label: "Departments", icon: Building2 },
  { id: "coverage", label: "Shift Coverage", icon: ClipboardCheck },
  { id: "agencies", label: "Agencies", icon: Users },
  { id: "ledger", label: "Execution Ledger", icon: BookOpen },
  { id: "payroll", label: "Payroll & Billing", icon: FileCheck },
  { id: "headcount", label: "Headcount", icon: CalendarPlus },
];

const DemoSidebar = ({ activeView, onViewChange }: DemoSidebarProps) => {
  return (
    <div className="w-48 bg-card border-r border-border flex flex-col">
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
