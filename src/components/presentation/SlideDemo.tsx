import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown, ArrowLeft, Shield, Eye, EyeOff, Bell } from "lucide-react";
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
type DemoState = "intro" | "login" | "demo";

interface SlideDemoProps {
  onDemoStateChange?: (isInDemo: boolean) => void;
}

const SlideDemoContent = ({ onDemoStateChange }: SlideDemoProps) => {
  const [demoState, setDemoState] = useState<DemoState>("intro");
  const [showPassword, setShowPassword] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("client");
  const [activeClientView, setActiveClientView] = useState("live-snapshot");
  const [activeAgencyView, setActiveAgencyView] = useState("live-snapshot");
  const { notifications, bookings } = useDemoContext();

  const unreadCount = notifications.filter(
    (n) => !n.read && (n.targetView === viewMode || n.targetView === "both")
  ).length;

  // Count pending bookings for agency "new order" badge
  const pendingBookingsCount = bookings.filter(b => b.status === "pending").length;

  const handleLaunchDemo = () => {
    setDemoState("login");
    onDemoStateChange?.(true);
  };

  const handleEnterDemo = () => {
    setDemoState("demo");
  };

  const handleExitDemo = () => {
    setDemoState("intro");
    setActiveClientView("live-snapshot");
    setActiveAgencyView("live-snapshot");
    onDemoStateChange?.(false);
  };

  const orchestrationPoints = [
    "Agencies operate through a dedicated, client-specific interface",
    "Labour users see a unified, real-time view across all agencies",
    "Both views connect to the same underlying record",
    "Actions on one side are immediately visible on the other",
    "Orchestration happens through shared visibility, not coordination calls",
  ];

  // Intro slide
  if (demoState === "intro") {
    return (
      <Slide className="relative md:justify-start md:pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto w-full"
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-3"
          >
            How Orchestration Happens
          </motion.h2>

          <div className="mb-16 md:mb-20" />

          <div className="space-y-4 md:space-y-5 mb-16 md:mb-20">
            {orchestrationPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.12 }}
                className="flex items-start gap-3 md:gap-4"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              onClick={handleLaunchDemo}
              className="text-base md:text-lg px-8 py-6 md:px-10 md:py-8 rounded-xl trust-gradient hover:opacity-90 transition-opacity group"
            >
              <Play className="w-5 h-5 md:w-6 md:h-6 mr-3 group-hover:scale-110 transition-transform" />
              Launch Demo
            </Button>
          </motion.div>
        </motion.div>
      </Slide>
    );
  }

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
              <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Temp Ledger</h1>
              <p className="text-sm text-muted-foreground mt-1">Demo Environment</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-xl">
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
                  className="w-full mt-6 trust-gradient hover:opacity-90 transition-opacity"
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
        return <ClientLiveSnapshot />;
      case "schedule":
        return <ClientSchedule />;
      case "bookings":
        return <ClientBookings />;
      case "agencies":
        return <ClientAgencies />;
      case "workers":
        return <ClientWorkers />;
      case "payroll":
        return <ClientPayroll />;
      case "billing":
        return <ClientBilling />;
      case "spend-analysis":
        return <ClientSpendAnalysis />;
      case "temp-perm":
        return <ClientTempPerm />;
      case "notifications":
        return <DemoNotifications onNavigate={setActiveClientView} />;
      case "chatbot":
        return <DemoChatbot />;
      default:
        return <ClientLiveSnapshot />;
    }
  };

  // Render Agency views
  const renderAgencyView = () => {
    switch (activeAgencyView) {
      case "live-snapshot":
        return <AgencyLiveSnapshot />;
      case "new-order":
        return <AgencyNewOrder />;
      case "schedule":
        return <AgencySchedule />;
      case "workers-live":
        return <AgencyWorkers tab="live" />;
      case "workers-standby":
        return <AgencyWorkers tab="standby" />;
      case "workers-new":
        return <AgencyWorkers tab="new" />;
      case "payroll":
        return <ClientPayroll />; // Reuse with different context
      case "billing":
        return <ClientBilling />; // Reuse with different context
      case "notifications":
        return <DemoNotifications onNavigate={setActiveAgencyView} />;
      case "chatbot":
        return <DemoChatbot />;
      default:
        return <AgencyLiveSnapshot />;
    }
  };

  // Main demo UI
  return (
    <div className="w-full h-full flex flex-col bg-background">
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

          {unreadCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg">
              <Bell className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">{unreadCount} new</span>
            </div>
          )}
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
              Client View (Clipper Logistics)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setViewMode("agency")}
              className={viewMode === "agency" ? "bg-primary/10 text-primary" : ""}
            >
              Agency View (Staffline)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-[140px]" />
      </div>

      {/* Demo Container */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex overflow-hidden m-4 rounded-lg border border-border shadow-xl"
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
