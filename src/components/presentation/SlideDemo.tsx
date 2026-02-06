import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown, ArrowLeft, Shield, Eye, EyeOff, Bell, RefreshCw } from "lucide-react";
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
import DemoSidebar from "./demo/DemoSidebar";
import DemoLiveSnapshot from "./demo/DemoLiveSnapshot";
import DemoDepartments from "./demo/DemoDepartments";
import DemoAgenciesPerformance from "./demo/DemoAgenciesPerformance";
import DemoPayrollBilling from "./demo/DemoPayrollBilling";
import DemoExecutionLedger from "./demo/DemoExecutionLedger";
import DemoShiftCoverage from "./demo/DemoShiftCoverage";
import DemoAgencySidebar from "./demo/DemoAgencySidebar";
import DemoAgencyDashboard from "./demo/DemoAgencyDashboard";
import DemoAgencyWorkers from "./demo/DemoAgencyWorkers";
import DemoAgencyWorkerDetail from "./demo/DemoAgencyWorkerDetail";
import DemoAgencyDeployments from "./demo/DemoAgencyDeployments";
import DemoAgencyIssues from "./demo/DemoAgencyIssues";
import DemoAgencyDocuments from "./demo/DemoAgencyDocuments";
import DemoAgencyAllocations from "./demo/DemoAgencyAllocations";
import { AgencyWorker } from "./demo/agencyDemoData";
import { DemoProvider, useDemoContext } from "./demo/DemoContext";
import DemoStandbyWorkers from "./demo/DemoStandbyWorkers";
import DemoStandbyWorkerDetail from "./demo/DemoStandbyWorkerDetail";
import { StandbyWorker } from "./demo/standbyWorkersData";

type ViewMode = "labour-user" | "agency";
type DemoState = "intro" | "login" | "demo";

interface SlideDemoProps {
  onDemoStateChange?: (isInDemo: boolean) => void;
}

const SlideDemoContent = ({ onDemoStateChange }: SlideDemoProps) => {
  const [demoState, setDemoState] = useState<DemoState>("intro");
  const [showPassword, setShowPassword] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("labour-user");
  const [activeLabourView, setActiveLabourView] = useState("snapshot");
  const [activeAgencyView, setActiveAgencyView] = useState("dashboard");
  const [selectedWorker, setSelectedWorker] = useState<AgencyWorker | null>(null);
  const [selectedStandbyWorker, setSelectedStandbyWorker] = useState<StandbyWorker | null>(null);
  const { notifications } = useDemoContext();
  
  const unreadCount = notifications.filter(n => !n.read && (n.targetView === viewMode || n.targetView === "both")).length;

  const handleLaunchDemo = () => {
    setDemoState("login");
    onDemoStateChange?.(true);
  };

  const handleEnterDemo = () => {
    setDemoState("demo");
  };

  const handleExitDemo = () => {
    setDemoState("intro");
    setActiveLabourView("snapshot");
    setActiveAgencyView("dashboard");
    setSelectedWorker(null);
    setSelectedStandbyWorker(null);
    onDemoStateChange?.(false);
  };

  const handleSelectWorker = (worker: AgencyWorker) => {
    setSelectedWorker(worker);
    setActiveAgencyView("worker-detail");
  };

  const handleBackToWorkers = () => {
    setSelectedWorker(null);
    setActiveAgencyView("workers");
  };

  const handleAgencyViewChange = (view: string) => {
    setActiveAgencyView(view);
    if (view !== "worker-detail") {
      setSelectedWorker(null);
    }
    if (view !== "standby-detail" && view !== "live-detail") {
      setSelectedStandbyWorker(null);
    }
  };

  const handleSelectStandbyWorker = (worker: StandbyWorker) => {
    setSelectedStandbyWorker(worker);
    setActiveAgencyView(worker.status === "live" ? "live-detail" : "standby-detail");
  };
 
  const handleBackToStandby = () => {
    const wasLive = selectedStandbyWorker?.status === "live";
    setSelectedStandbyWorker(null);
    setActiveAgencyView(wasLive ? "live-workers" : "standby");
  };
 
  const orchestrationPoints = [
    "Agencies operate through a dedicated, client-specific interface",
    "Labour users see a unified, real-time view across all agencies",
    "Both views connect to the same underlying record",
    "Actions on one side are immediately visible on the other",
    "Orchestration happens through shared visibility, not coordination calls",
  ];

  // Intro slide - content + Demo button
  if (demoState === "intro") {
    return (
      <Slide className="relative md:justify-start md:pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto w-full"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-3"
          >
            How Orchestration Happens
          </motion.h2>

          {/* Spacer to match slide 4 */}
          <div className="mb-16 md:mb-20" />

          {/* Points */}
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
                <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>

          {/* Demo Button - centered at bottom */}
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
        {/* Back button */}
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
            {/* Logo/Brand */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Temp Ledger</h1>
              <p className="text-sm text-muted-foreground mt-1">Demo Environment</p>
            </div>

            {/* Login Card */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-foreground mb-6 text-center">Sign in to Demo</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground">Username</Label>
                  <Input
                    id="username"
                    value="TempLedgerDemo"
                    readOnly
                    className="bg-muted/50 border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
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
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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

  const renderLabourUserView = () => {
    switch (activeLabourView) {
      case "snapshot":
        return <DemoLiveSnapshot />;
      case "departments":
        return <DemoDepartments />;
      case "coverage":
        return <DemoShiftCoverage />;
      case "agencies":
        return <DemoAgenciesPerformance />;
      case "ledger":
        return <DemoExecutionLedger />;
      case "payroll":
        return <DemoPayrollBilling />;
      default:
        return <DemoLiveSnapshot />;
    }
  };

  const renderAgencyView = () => {
    switch (activeAgencyView) {
      case "dashboard":
        return <DemoAgencyDashboard />;
      case "live-workers":
        return <DemoStandbyWorkers onSelectWorker={handleSelectStandbyWorker} showLive={true} />;
      case "live-detail":
        return selectedStandbyWorker ? (
          <DemoStandbyWorkerDetail worker={selectedStandbyWorker} onBack={handleBackToStandby} />
        ) : (
          <DemoStandbyWorkers onSelectWorker={handleSelectStandbyWorker} showLive={true} />
        );
      case "allocations":
        return <DemoAgencyAllocations />;
      case "workers":
        return <DemoAgencyWorkers onSelectWorker={handleSelectWorker} />;
      case "worker-detail":
        return selectedWorker ? (
          <DemoAgencyWorkerDetail worker={selectedWorker} onBack={handleBackToWorkers} />
        ) : (
          <DemoAgencyWorkers onSelectWorker={handleSelectWorker} />
        );
      case "standby":
        return <DemoStandbyWorkers onSelectWorker={handleSelectStandbyWorker} showLive={false} />;
      case "standby-detail":
        return selectedStandbyWorker ? (
          <DemoStandbyWorkerDetail worker={selectedStandbyWorker} onBack={handleBackToStandby} />
        ) : (
          <DemoStandbyWorkers onSelectWorker={handleSelectStandbyWorker} showLive={false} />
        );
      case "deployments":
        return <DemoAgencyDeployments />;
      case "issues":
        return <DemoAgencyIssues />;
      case "documents":
        return <DemoAgencyDocuments />;
      case "payroll":
        return <DemoPayrollBilling />;
      default:
        return <DemoAgencyDashboard />;
    }
  };

  // Main demo UI
  return (
    <div className="w-full h-full flex flex-col bg-[hsl(222,47%,4%)]">
      {/* Demo Header - Distinctive design */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(217,33%,12%)] bg-[hsl(222,47%,6%)]">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExitDemo}
            className="gap-2 text-muted-foreground hover:text-foreground hover:bg-[hsl(217,33%,12%)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Exit Demo</span>
          </Button>
          
          {/* Sync indicator */}
          <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
            <RefreshCw className="w-3 h-3 text-emerald-500" />
            <span className="text-[10px] font-medium text-emerald-500">Live Sync</span>
          </div>
          
          {/* Notifications indicator */}
          {unreadCount > 0 && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 border border-primary/20 rounded-md">
              <Bell className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-medium text-primary">{unreadCount}</span>
            </div>
          )}
        </div>
        
        {/* Center - Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Temp Ledger</span>
          <span className="text-xs text-muted-foreground hidden md:inline">• Demo Environment</span>
        </div>
        
        {/* View Mode Selector - Tab style */}
        <div className="flex items-center gap-1 p-1 bg-[hsl(217,33%,10%)] rounded-lg">
          <button
            onClick={() => setViewMode("labour-user")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === "labour-user"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Labour User
          </button>
          <button
            onClick={() => setViewMode("agency")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === "agency"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Agency
          </button>
        </div>
      </div>

      {/* Demo Container */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex-1 flex overflow-hidden"
      >
        {viewMode === "labour-user" ? (
          <>
            <DemoSidebar activeView={activeLabourView} onViewChange={setActiveLabourView} />
            <div className="flex-1 overflow-auto bg-[hsl(222,47%,4%)]">
              {renderLabourUserView()}
            </div>
          </>
        ) : (
          <>
            <DemoAgencySidebar activeView={activeAgencyView} onViewChange={handleAgencyViewChange} />
            <div className="flex-1 overflow-auto bg-[hsl(222,47%,4%)]">
              {renderAgencyView()}
            </div>
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
