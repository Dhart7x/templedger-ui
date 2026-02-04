import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoSidebar from "./demo/DemoSidebar";
import DemoOverview from "./demo/DemoOverview";
import DemoLiveLabour from "./demo/DemoLiveLabour";
import DemoAgencies from "./demo/DemoAgencies";
import DemoPerformance from "./demo/DemoPerformance";
import DemoExceptionsQueue from "./demo/DemoExceptionsQueue";

const SlideDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [activeView, setActiveView] = useState("ledger");

  const handleExitDemo = () => {
    setShowDemo(false);
    setActiveView("ledger");
  };

  if (!showDemo) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-foreground">
            See the Ledger in Action
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Button
              size="lg"
              onClick={() => setShowDemo(true)}
              className="text-lg px-8 py-6 rounded-xl trust-gradient hover:opacity-90 transition-opacity group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Launch Interactive Demo
            </Button>
          </motion.div>
          <p className="text-sm text-muted-foreground mt-6 max-w-sm mx-auto">
            Follow a worker from registration to invoice.
          </p>
        </motion.div>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "ledger":
        return <DemoOverview />;
      case "attendance":
        return <DemoLiveLabour />;
      case "exceptions":
        return <DemoExceptionsQueue />;
      case "suppliers":
        return <DemoAgencies />;
      case "assurance":
        return <DemoPerformance />;
      default:
        return <DemoOverview />;
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
          <span className="text-muted-foreground">Ledger Dashboard</span>
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
