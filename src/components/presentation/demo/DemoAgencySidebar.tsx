import { 
  LayoutDashboard, Users, Calendar, AlertTriangle, FileText, 
  ClipboardList, UserCheck, Clock, Bell, Briefcase, DollarSign 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDemoContext } from "./DemoContext";

interface DemoAgencySidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navSections = [
  {
    title: "Operations",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
      { id: "live-workers", label: "Live Deployments", icon: UserCheck, badge: "8", badgeType: "success" as const },
      { id: "allocations", label: "Bookings", icon: ClipboardList, badge: "5", badgeType: "warning" as const },
    ]
  },
  {
    title: "Workforce",
    items: [
      { id: "workers", label: "Workers", icon: Users, badge: null },
      { id: "standby", label: "Standby Pool", icon: Clock, badge: "37", badgeType: "muted" as const },
      { id: "deployments", label: "Shift Schedule", icon: Calendar, badge: null },
    ]
  },
  {
    title: "Compliance",
    items: [
      { id: "issues", label: "Issues & Approvals", icon: AlertTriangle, badge: "4", badgeType: "error" as const },
      { id: "documents", label: "Documents", icon: FileText, badge: null },
      { id: "payroll", label: "Payroll & Billing", icon: DollarSign, badge: null },
    ]
  }
];

const badgeStyles = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
  muted: "bg-muted text-muted-foreground border-border",
};

const DemoAgencySidebar = ({ activeView, onViewChange }: DemoAgencySidebarProps) => {
  const { notifications } = useDemoContext();
  const unreadCount = notifications.filter(n => !n.read && (n.targetView === "agency" || n.targetView === "both")).length;

  const isItemActive = (itemId: string) => {
    if (activeView === itemId) return true;
    if (activeView === "worker-detail" && itemId === "workers") return true;
    if (activeView === "standby-detail" && itemId === "standby") return true;
    if (activeView === "live-detail" && itemId === "live-workers") return true;
    return false;
  };

  return (
    <div className="w-52 md:w-60 bg-[hsl(222,47%,6%)] border-r border-[hsl(217,33%,12%)] flex flex-col">
      {/* Agency Header */}
      <div className="p-4 border-b border-[hsl(217,33%,12%)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Staffline</div>
            <div className="text-[10px] text-muted-foreground">Agency Portal</div>
          </div>
        </div>
        {/* Client indicator */}
        <div className="flex items-center gap-2 mt-3 px-2 py-1.5 rounded-md bg-primary/10 border border-primary/20">
          <span className="text-[10px] text-muted-foreground">Client:</span>
          <span className="text-[10px] font-medium text-primary">Clipper Logistics</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
              {section.title}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = isItemActive(item.id);
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onViewChange(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all",
                        isActive
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-[hsl(217,33%,10%)] border border-transparent"
                      )}
                    >
                      <item.icon className={cn(
                        "w-4 h-4 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "flex-1 text-sm",
                        isActive ? "text-foreground font-medium" : "text-muted-foreground"
                      )}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={cn(
                          "text-[10px] font-medium px-1.5 py-0.5 rounded border",
                          badgeStyles[item.badgeType || "muted"]
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
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
          Ledger-driven execution
        </div>
      </div>
    </div>
  );
};

export default DemoAgencySidebar;
