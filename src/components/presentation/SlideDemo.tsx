import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronDown, ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import DemoHeadcountRequests from "./demo/DemoHeadcountRequests";
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

type ViewMode = "labour-user" | "agency";
type DemoState = "intro" | "login" | "demo";

interface SlideDemoProps {
  onDemoStateChange?: (isInDemo: boolean) => void;
}

const SlideDemo = ({ onDemoStateChange }: SlideDemoProps) => {
  const [demoState, setDemoState] = useState<DemoState>("intro");
  const [showPassword, setShowPassword] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("labour-user");
  const [activeLabourView, setActiveLabourView] = useState("snapshot");
  const [activeAgencyView, setActiveAgencyView] = useState("dashboard");
  const [selectedWorker, setSelectedWorker] = useState<AgencyWorker | null>(null);

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
  };

  const processSteps = [
    "Agencies operate through a client-specific front end",
    "Worker data, shifts, and exceptions are handled there",
    "On-site Time & Attendance is deployed",
    "Attendance syncs directly into system",
  ];

  const outputs = [
    "One real-time operational view",
    "Live status by department and location",
    "Fulfilment and exceptions across agencies",
    "Payroll and invoicing readiness before billing",
    "Objective, ledger-derived agency performance",
  ];

  // Intro slide (How It Works)
  if (demoState === "intro") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-background px-4 md:px-12 pt-14 pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl w-full relative z-10"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8 text-foreground text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6 md:mb-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card/60 border border-border rounded-xl p-4 md:p-6"
            >
              <h3 className="text-sm md:text-base font-bold text-primary mb-3 md:mb-4">Process</h3>
              <div className="space-y-2 md:space-y-3">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full trust-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[9px] md:text-[10px] font-bold text-foreground">{index + 1}</span>
                    </div>
                    <span className="text-sm md:text-base text-foreground leading-relaxed">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card/60 border border-border rounded-xl p-4 md:p-6"
            >
              <h3 className="text-sm md:text-base font-bold text-primary mb-3 md:mb-4">Output for Labour User</h3>
              <div className="space-y-2 md:space-y-3">
                {outputs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5 md:mt-2" />
                    <span className="text-sm md:text-base text-foreground leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center mb-4 md:mb-6"
          >
            <p className="text-sm md:text-lg font-bold trust-gradient-text">
              Execution is visible as it happens.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              onClick={handleLaunchDemo}
              className="text-sm md:text-base px-6 py-4 md:px-8 md:py-6 rounded-xl trust-gradient hover:opacity-90 transition-opacity group"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
              Launch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Login screen
  if (demoState === "login") {
    return (
      <div className="w-full h-full flex flex-col bg-background">
        {/* Back button */}
        <div className="absolute top-20 left-6 z-30">
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
      case "headcount":
        return <DemoHeadcountRequests />;
      default:
        return <DemoLiveSnapshot />;
    }
  };

  const renderAgencyView = () => {
    switch (activeAgencyView) {
      case "dashboard":
        return <DemoAgencyDashboard />;
      case "workers":
        return <DemoAgencyWorkers onSelectWorker={handleSelectWorker} />;
      case "worker-detail":
        return selectedWorker ? (
          <DemoAgencyWorkerDetail worker={selectedWorker} onBack={handleBackToWorkers} />
        ) : (
          <DemoAgencyWorkers onSelectWorker={handleSelectWorker} />
        );
      case "deployments":
        return <DemoAgencyDeployments />;
      case "issues":
        return <DemoAgencyIssues />;
      case "documents":
        return <DemoAgencyDocuments />;
      default:
        return <DemoAgencyDashboard />;
    }
  };

  // Main demo UI
  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Demo Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExitDemo}
          className="gap-2 bg-card/80 border-border hover:border-primary/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Slides
        </Button>
        
        {/* View Mode Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {viewMode === "labour-user" ? "Labour User View" : "Agency View"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-card border border-border">
            <DropdownMenuItem 
              onClick={() => setViewMode("labour-user")}
              className={viewMode === "labour-user" ? "bg-primary/10 text-primary" : ""}
            >
              Labour User View
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setViewMode("agency")}
              className={viewMode === "agency" ? "bg-primary/10 text-primary" : ""}
            >
              Agency View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="text-xs text-muted-foreground w-[140px] text-right">
          {viewMode === "labour-user" ? "Operations View" : "Client-specific execution"}
        </div>
      </div>

      {/* Demo Container */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex overflow-hidden m-4 rounded-lg border border-border shadow-xl"
      >
        {viewMode === "labour-user" ? (
          <>
            <DemoSidebar activeView={activeLabourView} onViewChange={setActiveLabourView} />
            <div className="flex-1 overflow-auto bg-background">
              {renderLabourUserView()}
            </div>
          </>
        ) : (
          <>
            <DemoAgencySidebar activeView={activeAgencyView} onViewChange={handleAgencyViewChange} />
            <div className="flex-1 overflow-auto bg-background">
              {renderAgencyView()}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SlideDemo;
