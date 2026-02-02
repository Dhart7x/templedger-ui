import { useState } from "react";
import { motion } from "framer-motion";
import DemoSidebar from "./demo/DemoSidebar";
import DemoClientsView from "./demo/DemoClientsView";
import DemoClientDetail from "./demo/DemoClientDetail";
import DemoAuditModal from "./demo/DemoAuditModal";
import DemoAuditLogView from "./demo/DemoAuditLogView";
import DemoExceptionsView from "./demo/DemoExceptionsView";
import DemoReportsView from "./demo/DemoReportsView";
import DemoSettingsView from "./demo/DemoSettingsView";
import { type Client } from "./demo/demoData";

const SlideDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [activeView, setActiveView] = useState("clients");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
  };

  const handleBack = () => {
    setSelectedClient(null);
  };

  const handleSendAudit = () => {
    setShowAuditModal(true);
  };

  const handleExitDemo = () => {
    setShowDemo(false);
    setSelectedClient(null);
    setActiveView("clients");
  };

  const handleNavigateToWorker = (workerId: string, clientId: string) => {
    // Navigate to clients view and select the relevant client
    const client = { id: clientId, name: "", agencies: 0, status: "green" as const };
    setActiveView("clients");
    setSelectedClient(client);
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
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Interactive Demo</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-8">
            See How Temp Ledger Works
          </h2>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => setShowDemo(true)}
            className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Launch Demo
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "clients":
        if (selectedClient) {
          return (
            <DemoClientDetail
              client={selectedClient}
              onBack={handleBack}
              onSendAudit={handleSendAudit}
            />
          );
        }
        return <DemoClientsView onSelectClient={handleSelectClient} />;
      
      case "audit":
        return <DemoAuditLogView onNavigateToWorker={handleNavigateToWorker} />;
      
      case "exceptions":
        return <DemoExceptionsView />;
      
      case "reports":
        return <DemoReportsView />;
      
      case "settings":
        return <DemoSettingsView />;
      
      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-muted-foreground text-sm mb-1">
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)} View
              </div>
            </div>
          </div>
        );
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
          <span className="text-muted-foreground">Interactive Demo</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-primary font-medium">See how it works</span>
        </div>
        <div className="w-[140px]" /> {/* Spacer for centering */}
      </div>

      {/* Demo Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 flex overflow-hidden m-4 rounded-lg border border-border shadow-xl"
      >
        <DemoSidebar activeView={activeView} onViewChange={setActiveView} />
        {renderActiveView()}
      </motion.div>

      {/* Hint */}
      <div className="text-center pb-3">
        <span className="text-xs text-muted-foreground">
          {activeView === "clients" && "Click on clients and workers to explore the audit workflow"}
          {activeView === "audit" && "Click on events to view details and linked chain context"}
          {activeView === "exceptions" && "Click on exceptions to open the resolution workflow"}
          {activeView === "reports" && "Click on reports to view trends and drill-down data"}
          {activeView === "settings" && "Configure users, rules, approvals, and integrations"}
        </span>
      </div>

      <DemoAuditModal
        open={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        client={selectedClient}
      />
    </div>
  );
};

export default SlideDemo;
