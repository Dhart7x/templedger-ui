import { useState } from "react";
import { motion } from "framer-motion";
import DemoSidebar from "./demo/DemoSidebar";
import DemoOverview from "./demo/DemoOverview";
import DemoLiveLabour from "./demo/DemoLiveLabour";
import DemoAgencies from "./demo/DemoAgencies";
import DemoPerformance from "./demo/DemoPerformance";
import DemoExceptionsQueue from "./demo/DemoExceptionsQueue";
import DemoSpend from "./demo/DemoSpend";
import DemoSettings from "./demo/DemoSettings";

const SlideDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [activeView, setActiveView] = useState("overview");

  const handleExitDemo = () => {
    setShowDemo(false);
    setActiveView("overview");
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            See It Live
          </h2>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Launch Interactive Demo
          </motion.button>
          <p className="text-xs text-muted-foreground mt-4 max-w-sm mx-auto">
            Explore the labour user dashboard, performance views, and live site data.
          </p>
        </motion.div>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "overview":
        return <DemoOverview />;
      case "live-labour":
        return <DemoLiveLabour />;
      case "agencies":
        return <DemoAgencies />;
      case "performance":
        return <DemoPerformance />;
      case "exceptions":
        return <DemoExceptionsQueue />;
      case "spend":
        return <DemoSpend />;
      case "settings":
        return <DemoSettings />;
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
          <span className="text-muted-foreground">Labour User Dashboard</span>
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
