import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown, ArrowLeft, Shield, Eye, EyeOff, Bell, User } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Slide from "./Slide";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DemoProvider, useDemoContext } from "./demo/DemoContext";
import WorkerProfileModal from "./demo/WorkerProfileModal";

// New sidebars
import ClientSidebar from "./demo/ClientSidebar";
import AgencySidebar from "./demo/AgencySidebar";

// Client views
import ClientLiveSnapshot from "./demo/views/ClientLiveSnapshot";
import ClientSchedule from "./demo/views/ClientSchedule";
import ClientBookings from "./demo/views/ClientBookings";
import ClientAgencies from "./demo/views/ClientAgencies";
import ClientWorkers from "./demo/views/ClientWorkers";
import ClientPayroll from "./demo/views/ClientPayroll";
import ClientBilling from "./demo/views/ClientBilling";
import ClientSpendAnalysis from "./demo/views/ClientSpendAnalysis";
import ClientTempPerm from "./demo/views/ClientTempPerm";

// Agency views
import AgencyLiveSnapshot from "./demo/views/AgencyLiveSnapshot";
import AgencyNewOrder from "./demo/views/AgencyNewOrder";
import AgencySchedule from "./demo/views/AgencySchedule";
import AgencyWorkers from "./demo/views/AgencyWorkers";

// Shared views
import DemoChatbot from "./demo/views/DemoChatbot";
import DemoNotifications from "./demo/views/DemoNotifications";

type ViewMode = "client" | "agency";
type DemoState = "login" | "demo";

interface SlideDemoProps {
  onDemoStateChange?: (isInDemo: boolean) => void;
}

const SlideDemoContent = ({ onDemoStateChange }: SlideDemoProps) => {
  const [demoState, setDemoState] = useState<DemoState>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("client");
  const [activeClientView, setActiveClientView] = useState("live-snapshot");
  const [activeAgencyView, setActiveAgencyView] = useState("live-snapshot");
  const [selectedWorkerName, setSelectedWorkerName] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("demo-theme");
    return saved ? saved === "dark" : true;
  });
  const { notifications, bookings } = useDemoContext();

  const handleViewWorker = (workerName: string) => {
    setSelectedWorkerName(workerName);
  };

  const unreadCount = notifications.filter(
    (n) => !n.read && (n.targetView === viewMode || n.targetView === "both")
  ).length;

  // Count pending bookings for agency "new order" badge
  const pendingBookingsCount = bookings.filter(b => b.status === "pending").length;

  const handleEnterDemo = () => {
    setDemoState("demo");
    onDemoStateChange?.(true);
  };

  const handleExitDemo = () => {
    setDemoState("login");
    setActiveClientView("live-snapshot");
    setActiveAgencyView("live-snapshot");
    onDemoStateChange?.(false);
  };

  // Login screen
  if (demoState === "login") {
    return (
      <div className="w-full h-full flex flex-col bg-background">
        <div className="absolute top-6 left-6 z-30">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExitDemo}
            className="gap-2 bg-card/80 border-border hover:border-primary/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Slides
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Temp Ledger</h1>
              <p className="text-sm text-muted-foreground mt-1">Demo Environment</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
                Sign in to Demo
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="TempLedgerDemo"
                    readOnly
                    className="bg-muted/50 border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value="••••••••••••"
                      readOnly
                      className="bg-muted/50 border-border text-foreground pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleEnterDemo}
                  className="w-full mt-6 bg-primary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  Enter Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Render Client views
  const renderClientView = () => {
    switch (activeClientView) {
      case "live-snapshot":
        return <ClientLiveSnapshot onViewWorker={handleViewWorker} />;
      case "schedule":
        return <ClientSchedule />;
      case "bookings":
        return <ClientBookings />;
      case "agencies":
        return <ClientAgencies onViewWorker={handleViewWorker} />;
      case "workers":
        return <ClientWorkers onViewWorker={handleViewWorker} />;
      case "payroll":
        return <ClientPayroll />;
      case "billing":
        return <ClientBilling onViewWorker={handleViewWorker} />;
      case "spend-analysis":
        return <ClientSpendAnalysis onViewWorker={handleViewWorker} />;
      case "temp-perm":
        return <ClientTempPerm onViewWorker={handleViewWorker} />;
      case "notifications":
        return <DemoNotifications onNavigate={setActiveClientView} />;
      case "chatbot":
        return <DemoChatbot />;
      default:
        return <ClientLiveSnapshot onViewWorker={handleViewWorker} />;
    }
  };

  // Render Agency views
  const renderAgencyView = () => {
    switch (activeAgencyView) {
      case "live-snapshot":
        return <AgencyLiveSnapshot onViewWorker={handleViewWorker} />;
      case "new-order":
        return <AgencyNewOrder />;
      case "schedule":
        return <AgencySchedule />;
      case "workers-live":
        return <AgencyWorkers tab="live" onViewWorker={handleViewWorker} />;
      case "workers-standby":
        return <AgencyWorkers tab="standby" onViewWorker={handleViewWorker} />;
      case "workers-new":
        return <AgencyWorkers tab="new" onViewWorker={handleViewWorker} />;
      case "payroll":
        return <ClientPayroll />; // Reuse with different context
      case "billing":
        return <ClientBilling onViewWorker={handleViewWorker} />; // Reuse with different context
      case "notifications":
        return <DemoNotifications onNavigate={setActiveAgencyView} />;
      case "chatbot":
        return <DemoChatbot />;
      default:
        return <AgencyLiveSnapshot onViewWorker={handleViewWorker} />;
    }
  };

  // Main demo UI
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
      {/* Demo Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExitDemo}
            className="gap-2 bg-card/80 border-border hover:border-primary/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Slides
          </Button>
        </div>

        {/* View Mode Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 min-w-[160px]">
              {viewMode === "client" ? "Client View" : "Agency View"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-card border border-border">
            <DropdownMenuItem
              onClick={() => setViewMode("client")}
              className={viewMode === "client" ? "bg-primary/10 text-primary" : ""}
            >
              Client View (Alo Clothing)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setViewMode("agency")}
              className={viewMode === "agency" ? "bg-primary/10 text-primary" : ""}
            >
              Agency View (Staffmark)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle onThemeChange={setIsDarkMode} />
          
          {/* Notification Bell */}
          <button
            onClick={() => {
              if (viewMode === "client") {
                setActiveClientView("notifications");
              } else {
                setActiveAgencyView("notifications");
              }
            }}
            className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Demo Container */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex overflow-hidden m-4 rounded-lg border border-border"
      >
        {viewMode === "client" ? (
          <>
            <ClientSidebar
              activeView={activeClientView}
              onViewChange={setActiveClientView}
              notificationCount={unreadCount}
            />
            <div className="flex-1 overflow-auto bg-background">{renderClientView()}</div>
          </>
        ) : (
          <>
            <AgencySidebar
              activeView={activeAgencyView}
              onViewChange={setActiveAgencyView}
              notificationCount={unreadCount}
              newOrderCount={pendingBookingsCount}
            />
            <div className="flex-1 overflow-auto bg-background">{renderAgencyView()}</div>
          </>
        )}
      </motion.div>

      {/* Worker Profile Modal */}
      {selectedWorkerName && (
        <WorkerProfileModal
          workerName={selectedWorkerName}
          onClose={() => setSelectedWorkerName(null)}
        />
      )}
    </div>
  );
};

const SlideDemo = ({ onDemoStateChange }: SlideDemoProps) => {
  return (
    <DemoProvider>
      <SlideDemoContent onDemoStateChange={onDemoStateChange} />
    </DemoProvider>
  );
};

export default SlideDemo;
