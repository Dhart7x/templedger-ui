import { useState } from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, FileSignature, Shield, Calendar, LogIn, LogOut, 
  CheckSquare, DollarSign, Receipt, FileCheck, 
  CheckCircle, AlertCircle, Clock, ChevronRight, AlertTriangle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data
const departments = ["All Departments", "Warehouse", "Production", "Logistics"];
const agencies = ["All Agencies", "Staffmark", "Blue Arrow", "Adecco", "Reed", "Manpower", "Hays"];
const payPeriods = ["Week 5 (Jan 27 - Feb 2)", "Week 4 (Jan 20 - 26)", "Week 3 (Jan 13 - 19)"];

const workers = [
  // Warehouse workers
  { id: "W001", name: "James Wilson", department: "Warehouse", agency: "Staffmark" },
  { id: "W004", name: "Emma Davis", department: "Warehouse", agency: "Staffmark" },
  { id: "W006", name: "Daniel Martinez", department: "Warehouse", agency: "Blue Arrow" },
  { id: "W007", name: "Sophie Turner", department: "Warehouse", agency: "Adecco" },
  { id: "W008", name: "Ryan O'Brien", department: "Warehouse", agency: "Reed" },
  { id: "W009", name: "Olivia Johnson", department: "Warehouse", agency: "Manpower" },
  { id: "W010", name: "Jack Thompson", department: "Warehouse", agency: "Hays" },
  { id: "W011", name: "Chloe Anderson", department: "Warehouse", agency: "Staffmark" },
  { id: "W012", name: "Liam Patel", department: "Warehouse", agency: "Blue Arrow" },
  { id: "W013", name: "Grace Murphy", department: "Warehouse", agency: "Reed" },
  { id: "W014", name: "Nathan Clarke", department: "Warehouse", agency: "Manpower" },
  { id: "W015", name: "Mia Robinson", department: "Warehouse", agency: "Hays" },
  { id: "W016", name: "Oscar Bennett", department: "Warehouse", agency: "Adecco" },
  { id: "W017", name: "Isla Cooper", department: "Warehouse", agency: "Staffmark" },
  
  // Production workers
  { id: "W002", name: "Sarah Chen", department: "Production", agency: "Blue Arrow" },
  { id: "W005", name: "Robert Taylor", department: "Production", agency: "Blue Arrow" },
  { id: "W018", name: "Ethan Wright", department: "Production", agency: "Staffmark" },
  { id: "W019", name: "Ava Hughes", department: "Production", agency: "Adecco" },
  { id: "W020", name: "Noah Mitchell", department: "Production", agency: "Reed" },
  { id: "W021", name: "Isabella Scott", department: "Production", agency: "Manpower" },
  { id: "W022", name: "George Harris", department: "Production", agency: "Hays" },
  { id: "W023", name: "Amelia Foster", department: "Production", agency: "Staffmark" },
  { id: "W024", name: "Harry Morgan", department: "Production", agency: "Blue Arrow" },
  { id: "W025", name: "Emily Richardson", department: "Production", agency: "Reed" },
  { id: "W026", name: "Alfie Brooks", department: "Production", agency: "Manpower" },
  { id: "W027", name: "Poppy Walker", department: "Production", agency: "Hays" },
  { id: "W028", name: "Charlie Evans", department: "Production", agency: "Adecco" },
  { id: "W029", name: "Jessica Green", department: "Production", agency: "Staffmark" },
  { id: "W030", name: "Thomas King", department: "Production", agency: "Reed" },
  
  // Logistics workers
  { id: "W003", name: "Michael Brown", department: "Logistics", agency: "Adecco" },
  { id: "W031", name: "Ella Baker", department: "Logistics", agency: "Staffmark" },
  { id: "W032", name: "William Adams", department: "Logistics", agency: "Blue Arrow" },
  { id: "W033", name: "Ruby Nelson", department: "Logistics", agency: "Reed" },
  { id: "W034", name: "Henry Carter", department: "Logistics", agency: "Manpower" },
  { id: "W035", name: "Daisy Collins", department: "Logistics", agency: "Hays" },
  { id: "W036", name: "Leo Phillips", department: "Logistics", agency: "Staffmark" },
  { id: "W037", name: "Freya Campbell", department: "Logistics", agency: "Adecco" },
  { id: "W038", name: "Archie Stewart", department: "Logistics", agency: "Blue Arrow" },
  { id: "W039", name: "Lily Sanchez", department: "Logistics", agency: "Reed" },
  { id: "W040", name: "Max Turner", department: "Logistics", agency: "Manpower" },
  { id: "W041", name: "Evie Parker", department: "Logistics", agency: "Hays" },
  { id: "W042", name: "Finn Edwards", department: "Logistics", agency: "Staffmark" },
  { id: "W043", name: "Scarlett Morris", department: "Logistics", agency: "Blue Arrow" },
  { id: "W044", name: "Sebastian Lee", department: "Logistics", agency: "Reed" },
  { id: "W045", name: "Florence Ward", department: "Logistics", agency: "Manpower" },
];

interface ExecutionStep {
  id: number;
  label: string;
  icon: typeof UserPlus;
  status: "verified" | "pending" | "failed";
  timestamp: string | null;
  source: string;
  responsible: string;
}

const getExecutionSteps = (workerId: string): ExecutionStep[] => {
  // Simulate different states for different workers
  const baseSteps: ExecutionStep[] = [
    { id: 1, label: "Worker registered", icon: UserPlus, status: "verified", timestamp: "Jan 15, 09:00", source: "Agency Portal", responsible: "Staffmark" },
    { id: 2, label: "Contract signed", icon: FileSignature, status: "verified", timestamp: "Jan 15, 09:15", source: "DocuSign", responsible: "Worker" },
    { id: 3, label: "Compliance satisfied", icon: Shield, status: "verified", timestamp: "Jan 15, 10:30", source: "Compliance API", responsible: "System" },
    { id: 4, label: "Shift scheduled", icon: Calendar, status: "verified", timestamp: "Jan 26, 14:00", source: "Scheduler", responsible: "Ops Manager" },
    { id: 5, label: "Clocked in", icon: LogIn, status: "verified", timestamp: "Jan 27, 06:58", source: "T&A Terminal", responsible: "Worker" },
    { id: 6, label: "Clocked out", icon: LogOut, status: "verified", timestamp: "Jan 27, 15:02", source: "T&A Terminal", responsible: "Worker" },
    { id: 7, label: "Hours approved", icon: CheckSquare, status: "verified", timestamp: "Jan 27, 16:30", source: "Manager App", responsible: "Shift Manager" },
    { id: 8, label: "Correct pay rate", icon: DollarSign, status: "verified", timestamp: "Jan 27, 16:30", source: "Rate Engine", responsible: "System" },
    { id: 9, label: "Correct charge rate", icon: Receipt, status: "verified", timestamp: "Jan 27, 16:30", source: "Rate Engine", responsible: "System" },
    { id: 10, label: "Invoice permitted", icon: FileCheck, status: "verified", timestamp: "Jan 27, 16:31", source: "Ledger", responsible: "System" },
  ];

  // Worker W003 has a failed step
  if (workerId === "W003") {
    return baseSteps.map((step, idx) => {
      if (idx === 6) return { ...step, status: "failed" as const, timestamp: null, source: "—", responsible: "Shift Manager" };
      if (idx > 6) return { ...step, status: "pending" as const, timestamp: null, source: "—" };
      return step;
    });
  }

  // Worker W005 has pending steps
  if (workerId === "W005") {
    return baseSteps.map((step, idx) => {
      if (idx >= 5) return { ...step, status: "pending" as const, timestamp: null, source: "—" };
      return step;
    });
  }

  return baseSteps;
};

const StatusBadge = ({ status }: { status: "verified" | "pending" | "failed" }) => {
  if (status === "verified") {
    return (
      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/10">
        <CheckCircle className="w-3 h-3 mr-1" />
        Verified
      </Badge>
    );
  }
  if (status === "failed") {
    return (
      <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10">
        <AlertCircle className="w-3 h-3 mr-1" />
        Failed
      </Badge>
    );
  }
  return (
    <Badge className="bg-muted text-muted-foreground border-border hover:bg-muted">
      <Clock className="w-3 h-3 mr-1" />
      Pending
    </Badge>
  );
};

const DemoExecutionLedger = () => {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedAgency, setSelectedAgency] = useState("All Agencies");
  const [selectedPeriod, setSelectedPeriod] = useState(payPeriods[0]);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);

  const filteredWorkers = workers.filter(w => {
    if (selectedDept !== "All Departments" && w.department !== selectedDept) return false;
    if (selectedAgency !== "All Agencies" && w.agency !== selectedAgency) return false;
    return true;
  });

  const executionSteps = selectedWorker ? getExecutionSteps(selectedWorker) : [];
  const selectedWorkerData = workers.find(w => w.id === selectedWorker);
  
  const failedStep = executionSteps.find(s => s.status === "failed");
  const allVerified = executionSteps.every(s => s.status === "verified");
  const invoiceBlocked = !allVerified;

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Execution Ledger</h2>
          <p className="text-sm text-muted-foreground">Verified execution sequence per worker</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Authority for payroll & billing
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Select value={selectedDept} onValueChange={setSelectedDept}>
          <SelectTrigger className="w-[160px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {departments.map(d => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedAgency} onValueChange={setSelectedAgency}>
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {agencies.map(a => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[200px] h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {payPeriods.map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Worker list */}
        <div className="w-64 flex flex-col border border-border rounded-lg overflow-hidden">
          <div className="px-3 py-2 bg-muted/50 border-b border-border">
            <span className="text-xs font-medium text-muted-foreground">
              {filteredWorkers.length} Workers
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            {filteredWorkers.map((worker) => {
              const steps = getExecutionSteps(worker.id);
              const hasFailed = steps.some(s => s.status === "failed");
              const hasPending = steps.some(s => s.status === "pending");
              
              return (
                <button
                  key={worker.id}
                  onClick={() => setSelectedWorker(worker.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left border-b border-border transition-colors ${
                    selectedWorker === worker.id 
                      ? "bg-primary/10" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium">{worker.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {worker.department} • {worker.agency}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasFailed && (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    )}
                    {!hasFailed && hasPending && (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                    {!hasFailed && !hasPending && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Execution chain */}
        <div className="flex-1 flex flex-col min-h-0">
          {!selectedWorker ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Select a worker to view execution state
            </div>
          ) : (
            <>
              {/* Worker header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{selectedWorkerData?.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedWorkerData?.department} • {selectedWorkerData?.agency} • {selectedPeriod}
                  </p>
                </div>
                {invoiceBlocked ? (
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Invoice Blocked
                  </Badge>
                ) : (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/10">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Invoice Permitted
                  </Badge>
                )}
              </div>

              {/* Execution steps */}
              <div className="flex-1 overflow-auto">
                <div className="space-y-1">
                  {executionSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className={`relative flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                        step.status === "verified" 
                          ? "bg-green-500/5 border-green-500/20" 
                          : step.status === "failed"
                          ? "bg-destructive/5 border-destructive/20"
                          : "bg-muted/30 border-border"
                      }`}
                    >
                      {/* Step number */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.status === "verified" 
                          ? "bg-green-500/20 text-green-500" 
                          : step.status === "failed"
                          ? "bg-destructive/20 text-destructive"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {step.id}
                      </div>

                      {/* Icon */}
                      <step.icon className={`w-4 h-4 ${
                        step.status === "verified" 
                          ? "text-green-500" 
                          : step.status === "failed"
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`} />

                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{step.label}</div>
                      </div>

                      {/* Status */}
                      <StatusBadge status={step.status} />

                      {/* Metadata */}
                      <div className="text-right text-xs w-32">
                        <div className="text-foreground">{step.timestamp || "—"}</div>
                        <div className="text-muted-foreground">{step.source}</div>
                      </div>

                      {/* Responsible */}
                      <div className="text-xs text-muted-foreground w-24 text-right">
                        {step.responsible}
                      </div>

                      {/* Connector line */}
                      {index < executionSteps.length - 1 && (
                        <div className={`absolute left-[2.15rem] top-full h-1 w-0.5 ${
                          step.status === "verified" ? "bg-green-500/30" : "bg-border"
                        }`} />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Invoice assurance footer */}
              {failedStep && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-destructive/5 border border-destructive/20"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-destructive">
                        Blocked at Step {failedStep.id}: {failedStep.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Resolve this step to permit invoice. Responsible: {failedStep.responsible}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {allVerified && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-green-500/5 border border-green-500/20"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium text-sm text-green-500">
                        All steps verified — Invoice permitted
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        8.0 hours @ $12.50/hr = $100.00 pay • $156.00 charge
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoExecutionLedger;
