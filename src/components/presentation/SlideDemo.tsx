import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Eye, BarChart3, Clock, FileCheck, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoSidebar from "./demo/DemoSidebar";
import DemoLiveSnapshot from "./demo/DemoLiveSnapshot";
import DemoDepartments from "./demo/DemoDepartments";
import DemoAgenciesPerformance from "./demo/DemoAgenciesPerformance";
import DemoPayrollBilling from "./demo/DemoPayrollBilling";
import DemoHeadcountRequests from "./demo/DemoHeadcountRequests";
import DemoExecutionLedger from "./demo/DemoExecutionLedger";

const SlideDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [activeView, setActiveView] = useState("snapshot");

  const handleExitDemo = () => {
    setShowDemo(false);
    setActiveView("snapshot");
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


  if (!showDemo) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-background px-4 md:px-12 pt-14 pb-20 relative overflow-hidden">
        {/* Background glow */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
            {/* Process Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />
              <h3 className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest mb-2 md:mb-4">Process</h3>
              <div className="space-y-1 md:space-y-2">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.06 }}
                    className="flex items-start gap-2 md:gap-3 group"
                  >
                    <span className="text-[10px] md:text-xs font-bold text-primary/60 mt-0.5 w-4 md:w-5 flex-shrink-0">{step.num}</span>
                    <span className="text-[11px] md:text-sm text-foreground leading-tight">{step.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Output Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />
              <h3 className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest mb-2 md:mb-4">Output for Labour User</h3>
              <div className="space-y-1.5 md:space-y-2.5">
                {outputs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.06 }}
                    className="flex items-center gap-2 md:gap-3 group"
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                    </div>
                    <span className="text-[11px] md:text-sm text-foreground leading-tight">{item.text}</span>
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
              onClick={() => setShowDemo(true)}
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

  const renderActiveView = () => {
    switch (activeView) {
      case "snapshot":
        return <DemoLiveSnapshot />;
      case "departments":
        return <DemoDepartments />;
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

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Demo Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30">
        <button
          onClick={handleExitDemo}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>←</span>
          <span>Back to Presentation</span>
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Temp Ledger — Operations View</span>
        </div>
        <div className="w-[140px]" />
      </div>

      {/* Demo Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 flex overflow-hidden m-4 rounded-lg border border-border shadow-xl"
      >
        <DemoSidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 overflow-auto bg-background">
          {renderActiveView()}
        </div>
      </motion.div>
    </div>
  );
};

export default SlideDemo;
