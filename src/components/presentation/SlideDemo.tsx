import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Eye, Users, ClipboardCheck, BarChart3, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoSidebar from "./demo/DemoSidebar";
import DemoLiveSnapshot from "./demo/DemoLiveSnapshot";
import DemoDepartments from "./demo/DemoDepartments";
import DemoAgenciesPerformance from "./demo/DemoAgenciesPerformance";
import DemoPayrollBilling from "./demo/DemoPayrollBilling";
import DemoHeadcountRequests from "./demo/DemoHeadcountRequests";

const SlideDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [activeView, setActiveView] = useState("snapshot");

  const handleExitDemo = () => {
    setShowDemo(false);
    setActiveView("snapshot");
  };

  const features = [
    { icon: Eye, text: "See what is happening right now, by department and location" },
    { icon: Users, text: "Track fulfilment, attendance, overtime, and exceptions across agencies" },
    { icon: ClipboardCheck, text: "Validate payroll and invoicing before they occur" },
    { icon: BarChart3, text: "View objective agency performance, live — not self-reported" },
    { icon: Calendar, text: "Set headcount requirements and assign agencies to fill them" },
  ];

  if (!showDemo) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-background px-4 md:px-16 lg:px-20 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground text-center">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center mb-8 text-sm md:text-base max-w-2xl mx-auto">
            Temp Ledger orchestrates execution by combining ground-truth Time & Attendance 
            with direct integration into agency systems.
          </p>

          <div className="mb-8">
            <p className="text-sm font-medium text-foreground text-center mb-4">
              From one view, the end user can:
            </p>
            <div className="grid gap-3 max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  className="flex items-center gap-3 bg-card/50 border border-border rounded-lg px-4 py-3"
                >
                  <feature.icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-sm md:text-base text-foreground font-medium">
              Execution is visible as it happens.
            </p>
            <p className="text-sm md:text-base trust-gradient-text font-semibold">
              Confidence replaces trust.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
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
