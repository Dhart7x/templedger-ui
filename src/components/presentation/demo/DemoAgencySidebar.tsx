import { LayoutDashboard, Users, Calendar, AlertTriangle, FileText, ClipboardList, Eye, UserCheck, Clock } from "lucide-react";

interface DemoAgencySidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "live-snapshot", label: "Live Snapshot", icon: Eye },
  { id: "allocations", label: "Allocations", icon: ClipboardList, badge: "5" },
  { id: "live-workers", label: "Live Workers", icon: UserCheck },
  { id: "standby", label: "Standby Pool", icon: Clock },
  { id: "workers", label: "Workers", icon: Users },
  { id: "deployments", label: "Deployments", icon: Calendar },
  { id: "issues", label: "Issues", icon: AlertTriangle },
  { id: "documents", label: "Documents", icon: FileText },
];

const DemoAgencySidebar = ({ activeView, onViewChange }: DemoAgencySidebarProps) => {
  return (
    <div className="w-48 md:w-56 bg-card border-r border-border flex flex-col">
      {/* Agency Header */}
      <div className="p-4 border-b border-border">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Agency Portal</div>
        <div className="text-sm font-semibold text-foreground">Workforce Direct</div>
        <div className="text-xs text-muted-foreground">Client: Apex Distribution Ltd</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id || 
              (activeView === "worker-detail" && item.id === "workers") ||
              (activeView === "standby-detail" && item.id === "standby") ||
              (activeView === "live-detail" && item.id === "live-workers");
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.id === "issues" && (
                    <span className="ml-auto text-xs bg-destructive/20 text-destructive px-1.5 py-0.5 rounded">4</span>
                  )}
                  {item.id === "allocations" && (
                    <span className="ml-auto text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">5</span>
                  )}
                  {item.id === "standby" && (
                    <span className="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">37</span>
                  )}
                  {item.id === "live-workers" && (
                    <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">8</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Ledger-driven execution
        </div>
      </div>
    </div>
  );
};

export default DemoAgencySidebar;
