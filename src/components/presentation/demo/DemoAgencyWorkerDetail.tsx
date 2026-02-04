import { ArrowLeft, CheckCircle, Clock, AlertTriangle, XCircle, FileText } from "lucide-react";
import { AgencyWorker, agencyDocuments, agencyIssues } from "./agencyDemoData";

interface DemoAgencyWorkerDetailProps {
  worker: AgencyWorker;
  onBack: () => void;
}

const executionSteps = [
  { id: 1, name: "Registered", key: "registered" },
  { id: 2, name: "Contract", key: "contract" },
  { id: 3, name: "Compliance", key: "compliance" },
  { id: 4, name: "Scheduled", key: "scheduled" },
  { id: 5, name: "Clocked In", key: "clockedIn" },
  { id: 6, name: "Clocked Out", key: "clockedOut" },
  { id: 7, name: "Approved", key: "approved" },
  { id: 8, name: "Pay Rate", key: "payRate" },
  { id: 9, name: "Charge Rate", key: "chargeRate" },
  { id: 10, name: "Invoice Ready", key: "invoice" },
];

const DemoAgencyWorkerDetail = ({ worker, onBack }: DemoAgencyWorkerDetailProps) => {
  const workerDocs = agencyDocuments.filter((d) => d.workerId === worker.id);
  const workerIssues = agencyIssues.filter((i) => i.workerId === worker.id);

  // Simulate execution status based on worker state
  const getStepStatus = (stepId: number) => {
    if (worker.executionStatus === "blocked") {
      if (stepId <= 2) return "complete";
      if (stepId === 3) return "failed";
      return "pending";
    }
    if (worker.executionStatus === "at-risk") {
      if (stepId <= 4) return "complete";
      if (stepId === 5) return "warning";
      return "pending";
    }
    if (worker.status === "deployed") {
      if (stepId <= 5) return "complete";
      return "pending";
    }
    if (stepId <= 3) return "complete";
    return "pending";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <Clock className="w-4 h-4 text-amber-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />;
    }
  };

  const getDocStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-600">Verified</span>;
      case "pending":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-600">Pending</span>;
      case "expired":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-destructive/20 text-destructive">Expired</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">{worker.name}</h1>
          <p className="text-xs text-muted-foreground">{worker.id} • Registered {worker.registeredDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Worker Details */}
          <div className="bg-card border border-border rounded-lg">
            <div className="p-3 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Worker Details</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Department</span>
                <span className="text-sm text-foreground">{worker.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Location</span>
                <span className="text-sm text-foreground">{worker.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Status</span>
                <span className={`text-sm font-medium capitalize ${
                  worker.status === "deployed" ? "text-green-600" :
                  worker.status === "blocked" ? "text-destructive" : "text-foreground"
                }`}>{worker.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Current Shift</span>
                <span className="text-sm text-foreground">{worker.currentShift || "Not deployed"}</span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-card border border-border rounded-lg">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Documents</h2>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border">
              {workerDocs.length > 0 ? workerDocs.map((doc) => (
                <div key={doc.id} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-foreground">{doc.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{doc.type.replace("-", " ")}</div>
                  </div>
                  {getDocStatusBadge(doc.status)}
                </div>
              )) : (
                <div className="p-4 text-xs text-muted-foreground text-center">No documents on file</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Execution Status */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg">
            <div className="p-3 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Execution Status</h2>
              <p className="text-xs text-muted-foreground">Current position in the execution chain</p>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {executionSteps.map((step) => {
                  const status = getStepStatus(step.id);
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        status === "failed" ? "bg-destructive/10" :
                        status === "warning" ? "bg-amber-500/10" : ""
                      }`}
                    >
                      {getStatusIcon(status)}
                      <span className={`text-sm ${
                        status === "complete" ? "text-foreground" :
                        status === "failed" ? "text-destructive font-medium" :
                        status === "warning" ? "text-amber-600 font-medium" :
                        "text-muted-foreground"
                      }`}>{step.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Issues */}
          {workerIssues.length > 0 && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg">
              <div className="p-3 border-b border-destructive/20 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <h2 className="text-sm font-semibold text-destructive">Blocking Issues</h2>
              </div>
              <div className="p-4 space-y-3">
                {workerIssues.map((issue) => (
                  <div key={issue.id}>
                    <div className="text-sm font-medium text-foreground">{issue.failedStep}</div>
                    <p className="text-xs text-muted-foreground mb-1">{issue.reason}</p>
                    <p className="text-xs text-primary">→ {issue.requiredAction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoAgencyWorkerDetail;
