import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Eye, Users, ClipboardCheck, BarChart3, Calendar, BookOpen } from "lucide-react";
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

  const howItWorks = [
    "Labour users mandate Temp Ledger as the execution layer",
    "Agencies operate through a client-specific front end",
    "Worker data, shifts, and exceptions are handled there",
    "On-site Time & Attendance is deployed",
    "Attendance syncs directly into the execution ledger",
  ];

  const outputForUser = [
    "One real-time operational view",
    "Live status by department and location",
    "Fulfilment and exceptions across agencies",
    "Payroll and invoicing readiness before billing",
    "Objective, ledger-derived agency performance",
  ];


  if (!showDemo) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-background px-4 md:px-16 lg:px-20 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl w-full"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-foreground text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 max-w-3xl mx-auto">
            {/* How It Works Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-card/50 border border-border rounded-lg p-4"
            >
              <h3 className="text-xs md:text-sm font-semibold text-primary mb-3">Process</h3>
              <ul className="space-y-2">
                {howItWorks.map((item, index) => (
                  <li key={index} className="text-[11px] md:text-sm text-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Output Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-card/50 border border-border rounded-lg p-4"
            >
              <h3 className="text-xs md:text-sm font-semibold text-primary mb-3">Output for the Labour User</h3>
              <ul className="space-y-2">
                {outputForUser.map((item, index) => (
                  <li key={index} className="text-[11px] md:text-sm text-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Principles Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-card/50 border border-border rounded-lg p-4"
            >
              <h3 className="text-xs md:text-sm font-semibold text-primary mb-3">Principles</h3>
              <ul className="space-y-2">
                {principles.map((item, index) => (
                  <li key={index} className="text-[11px] md:text-sm text-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-sm md:text-base font-semibold trust-gradient-text mb-6 md:mb-8"
          >
            Execution is visible as it happens.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              onClick={() => setShowDemo(true)}
              className="text-base px-8 py-6 rounded-xl trust-gradient hover:opacity-90 transition-opacity group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Demo
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
