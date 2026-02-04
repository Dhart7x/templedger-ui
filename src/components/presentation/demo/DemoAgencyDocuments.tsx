import { useState } from "react";
import { FileText, CheckCircle, Clock, XCircle, Filter } from "lucide-react";
import { agencyDocuments, agencyWorkers } from "./agencyDemoData";

const DemoAgencyDocuments = () => {
  const [filter, setFilter] = useState<"all" | "verified" | "pending" | "expired">("all");

  const filteredDocs = agencyDocuments.filter((doc) => {
    return filter === "all" || doc.status === filter;
  });

  const getWorkerName = (workerId: string) => {
    return agencyWorkers.find(w => w.id === workerId)?.name || workerId;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-500" />;
      case "expired":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
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

  const stats = {
    verified: agencyDocuments.filter(d => d.status === "verified").length,
    pending: agencyDocuments.filter(d => d.status === "pending").length,
    expired: agencyDocuments.filter(d => d.status === "expired").length,
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Documents</h1>
        <p className="text-xs text-muted-foreground">Worker documentation and compliance status</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setFilter("verified")}
          className={`bg-card border rounded-lg p-3 text-center transition-colors ${
            filter === "verified" ? "border-green-500" : "border-border hover:border-green-500/50"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-xl font-bold text-green-600">{stats.verified}</div>
          <div className="text-xs text-muted-foreground">Verified</div>
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`bg-card border rounded-lg p-3 text-center transition-colors ${
            filter === "pending" ? "border-amber-500" : "border-border hover:border-amber-500/50"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600">{stats.pending}</div>
          <div className="text-xs text-muted-foreground">Pending</div>
        </button>
        <button
          onClick={() => setFilter("expired")}
          className={`bg-card border rounded-lg p-3 text-center transition-colors ${
            filter === "expired" ? "border-destructive" : "border-border hover:border-destructive/50"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <XCircle className="w-4 h-4 text-destructive" />
          </div>
          <div className="text-xl font-bold text-destructive">{stats.expired}</div>
          <div className="text-xs text-muted-foreground">Expired</div>
        </button>
      </div>

      {/* Filter indicator */}
      {filter !== "all" && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground capitalize">{filter}</span> documents
          </span>
          <button
            onClick={() => setFilter("all")}
            className="text-xs text-primary hover:underline ml-auto"
          >
            Show all
          </button>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_100px_100px_80px] gap-2 px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">
          <span>Document</span>
          <span>Worker</span>
          <span>Type</span>
          <span>Expiry</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-border">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="grid grid-cols-[1fr_120px_100px_100px_80px] gap-2 px-4 py-3 items-center">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{doc.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{getWorkerName(doc.workerId)}</span>
              <span className="text-xs text-muted-foreground capitalize">{doc.type.replace("-", " ")}</span>
              <span className="text-xs text-muted-foreground">{doc.expiryDate || "—"}</span>
              {getStatusBadge(doc.status)}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        {filteredDocs.length} document{filteredDocs.length !== 1 ? "s" : ""} shown
      </div>
    </div>
  );
};

export default DemoAgencyDocuments;
