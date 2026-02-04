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
    { num: "01", text: "Labour users mandate Temp Ledger as the execution layer" },
    { num: "02", text: "Agencies operate through a client-specific front end" },
    { num: "03", text: "Worker data, shifts, and exceptions are handled there" },
    { num: "04", text: "On-site Time & Attendance is deployed" },
    { num: "05", text: "Attendance syncs directly into the execution ledger" },
  ];

  const outputs = [
    { icon: Eye, text: "One real-time operational view" },
    { icon: Gauge, text: "Live status by department and location" },
    { icon: BarChart3, text: "Fulfilment and exceptions across agencies" },
    { icon: FileCheck, text: "Payroll and invoicing readiness before billing" },
    { icon: Clock, text: "Objective, ledger-derived agency performance" },
  ];


  if (!showDemo) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-background px-4 md:px-16 lg:px-20 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-10 text-foreground text-center">
            How It Works
          </h2>

          <div className="space-y-6 md:space-y-8 mb-6 md:mb-10">
            {/* Process Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 text-center">Process</h3>
              <div className="space-y-1.5">
                {howItWorks.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                    className="flex items-center gap-3 justify-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Output Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 text-center">Output for the Labour User</h3>
              <div className="space-y-1.5">
                {outputForUser.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.45 + index * 0.05 }}
                    className="flex items-center gap-3 justify-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center text-sm md:text-base font-semibold trust-gradient-text mb-6 md:mb-8"
          >
            Execution is visible as it happens.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
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
