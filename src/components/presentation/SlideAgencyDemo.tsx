import { useState } from "react";
import { motion } from "framer-motion";
import DemoAgencySidebar from "./demo/DemoAgencySidebar";
import DemoAgencyDashboard from "./demo/DemoAgencyDashboard";
import DemoAgencyWorkers from "./demo/DemoAgencyWorkers";
import DemoAgencyWorkerDetail from "./demo/DemoAgencyWorkerDetail";
import DemoAgencyDeployments from "./demo/DemoAgencyDeployments";
import DemoAgencyIssues from "./demo/DemoAgencyIssues";
import DemoAgencyDocuments from "./demo/DemoAgencyDocuments";
import { AgencyWorker } from "./demo/agencyDemoData";

const SlideAgencyDemo = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedWorker, setSelectedWorker] = useState<AgencyWorker | null>(null);

  const handleSelectWorker = (worker: AgencyWorker) => {
    setSelectedWorker(worker);
    setActiveView("worker-detail");
  };

  const handleBackToWorkers = () => {
    setSelectedWorker(null);
    setActiveView("workers");
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (view !== "worker-detail") {
      setSelectedWorker(null);
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
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

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Demo Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Temp Ledger</span>
          <span className="text-muted-foreground">—</span>
          <span className="font-medium text-foreground">Agency View</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Client-specific execution interface
        </div>
      </div>

      {/* Demo Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 flex overflow-hidden m-4 rounded-lg border border-border shadow-xl"
      >
        <DemoAgencySidebar activeView={activeView} onViewChange={handleViewChange} />
        <div className="flex-1 overflow-auto bg-background">
          {renderActiveView()}
        </div>
      </motion.div>
    </div>
  );
};

export default SlideAgencyDemo;
