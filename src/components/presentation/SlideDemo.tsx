import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown, ArrowLeft, Eye, EyeOff, Bell, User } from "lucide-react";
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
import ClientInsights from "./demo/views/ClientInsights";
import ClientTempPerm from "./demo/views/ClientTempPerm";
import ClientExceptions from "./demo/views/ClientExceptions";
import ClientPermissions from "./demo/views/ClientPermissions";

// Agency views
import AgencyLiveSnapshot from "./demo/views/AgencyLiveSnapshot";
import AgencyNewOrder from "./demo/views/AgencyNewOrder";
import AgencySchedule from "./demo/views/AgencySchedule";
import AgencyWorkers from "./demo/views/AgencyWorkers";
import AgencySignals from "./demo/views/AgencySignals";

// Shared views
import DemoChatbot from "./demo/views/DemoChatbot";
import DemoNotifications from "./demo/views/DemoNotifications";

type ViewMode = "client" | "agency";
type DemoState = "login" | "demo";

interface SlideDemoProps {
  onDemoStateChange?: (isInDemo: boolean) => void;
}

const SlideDemoContent = ({ onDemoStateChange }: SlideDemoProps) => {
  const [demoState, setDemoState] = useState<DemoState>("demo");
  const [showPassword, setShowPassword] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("client");
  const [activeClientView, setActiveClientView] = useState("live-snapshot");
  const [activeAgencyView, setActiveAgencyView] = useState("live-snapshot");
  const [selectedWorkerName, setSelectedWorkerName] = useState<string | null>(null);
  const isDarkMode = true;
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
    setDemoState("demo");
    setActiveClientView("live-snapshot");
    setActiveAgencyView("live-snapshot");
    onDemoStateChange?.(false);
  };

  // Login screen
  if (demoState === "login") {
    return (
      <div className="w-full h-full flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">TEMPLEDGER</h1>
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
                      aria-label={showPassword ? "Hide password" : "Show password"}
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
      case "permissions":
        return <ClientPermissions />;
      case "exceptions":
        return <ClientExceptions />;
      case "payroll":
        return <ClientPayroll />;
      case "billing":
        return <ClientBilling onViewChange={setActiveClientView} />;
      case "spend-analysis":
        return <ClientSpendAnalysis onViewWorker={handleViewWorker} />;
      case "insights":
        return <ClientInsights />;
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
      case "signals":
        return <AgencySignals />;
      case "payroll":
        return <ClientPayroll />; // Reuse with different context
      case "billing":
        return <ClientBilling onViewChange={setActiveAgencyView} />;
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
    <div className="demo-theme w-full h-full flex flex-col" style={{ background: "var(--cream)", color: "var(--text-primary)" }}>
      {/* Demo Top Bar */}
      <div
        style={{
          height: 56,
          flexShrink: 0,
          background: "var(--darkest-purple)",
          borderBottom: "1px solid rgba(250, 250, 248, 0.08)",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left — Home button (placeholder spacer; actual Home link lives in SalesDeck) */}
        <div style={{ width: 88 }} />

        {/* Center — segmented view toggle */}
        <div
          role="tablist"
          aria-label="View mode"
          style={{
            display: "inline-flex",
            background: "rgba(250, 250, 248, 0.06)",
            border: "1px solid rgba(250, 250, 248, 0.12)",
            borderRadius: 4,
            padding: 3,
            gap: 3,
          }}
        >
          {([
            { key: "client", label: "CLIENT" },
            { key: "agency", label: "AGENCY" },
          ] as const).map((opt) => {
            const active = viewMode === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setViewMode(opt.key)}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "rgba(250, 250, 248, 0.06)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
                style={{
                  appearance: "none",
                  border: "none",
                  cursor: "pointer",
                  height: 26,
                  padding: "0 14px",
                  borderRadius: 3,
                  fontFamily: "var(--font-mono-headers)",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "background 120ms ease, color 120ms ease",
                  background: active ? "var(--cream)" : "transparent",
                  color: active ? "var(--deep-purple)" : "rgba(250, 250, 248, 0.6)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Right — bell icon button */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => {
              if (viewMode === "client") setActiveClientView("notifications");
              else setActiveAgencyView("notifications");
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(250,250,248,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            style={{
              position: "relative",
              width: 32,
              height: 32,
              background: "transparent",
              border: "1px solid rgba(250, 250, 248, 0.12)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 120ms ease",
            }}
            aria-label="Notifications"
          >
            <Bell size={14} style={{ color: "rgba(250,250,248,0.85)" }} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 16,
                  height: 16,
                  background: "var(--status-red)",
                  border: "2px solid var(--darkest-purple)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono-labels)",
                  fontWeight: 600,
                  fontSize: 9,
                  color: "var(--cream)",
                  lineHeight: 1,
                }}
              >
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
        className="flex-1 flex overflow-hidden"
        style={{ background: "var(--cream)" }}
      >
        {viewMode === "client" ? (
          <>
            <ClientSidebar
              activeView={activeClientView}
              onViewChange={setActiveClientView}
              notificationCount={unreadCount}
            />
            <div
              className="flex-1 overflow-auto"
              style={{ background: "var(--cream)", padding: "28px 36px" }}
            >
              {renderClientView()}
            </div>
          </>
        ) : (
          <>
            <AgencySidebar
              activeView={activeAgencyView}
              onViewChange={setActiveAgencyView}
              notificationCount={unreadCount}
              newOrderCount={pendingBookingsCount}
            />
            <div
              className="flex-1 overflow-auto"
              style={{ background: "var(--cream)", padding: "28px 36px" }}
            >
              {renderAgencyView()}
            </div>
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
