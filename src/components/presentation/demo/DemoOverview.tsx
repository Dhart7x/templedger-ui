import { motion } from "framer-motion";
import { UserPlus, Shield, Calendar, Clock, CheckSquare, CreditCard, FileText, CheckCircle, AlertCircle, Loader2, Users, DollarSign, AlertTriangle } from "lucide-react";

const chainSteps = [
  { 
    id: 1, 
    icon: UserPlus, 
    label: "Worker Registration",
    status: "complete",
    detail: "147 registered this week",
    metric: "100%"
  },
  { 
    id: 2, 
    icon: Shield, 
    label: "Compliance Locked",
    status: "complete",
    detail: "RTW, contracts verified",
    metric: "100%"
  },
  { 
    id: 3, 
    icon: Calendar, 
    label: "Shift Scheduled",
    status: "complete",
    detail: "2,340 shifts this week",
    metric: "98%"
  },
  { 
    id: 4, 
    icon: Clock, 
    label: "Attendance Captured",
    status: "active",
    detail: "342 on site now",
    metric: "94%"
  },
  { 
    id: 5, 
    icon: CheckSquare, 
    label: "Hours Approved",
    status: "pending",
    detail: "Awaiting manager sign-off",
    metric: "—"
  },
  { 
    id: 6, 
    icon: CreditCard, 
    label: "Pay Validated",
    status: "pending",
    detail: "Next run: Friday",
    metric: "—"
  },
  { 
    id: 7, 
    icon: FileText, 
    label: "Invoice Produced",
    status: "pending",
    detail: "After pay validation",
    metric: "—"
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "complete":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "active":
      return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
    case "blocked":
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    default:
      return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />;
  }
};

const getStatusBg = (status: string) => {
  switch (status) {
    case "complete":
      return "bg-green-500/5 border-green-500/20";
    case "active":
      return "bg-primary/10 border-primary/30";
    case "blocked":
      return "bg-destructive/5 border-destructive/20";
    default:
      return "bg-muted/50 border-border";
  }
};

const DemoOverview = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Execution Ledger</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live • Updated just now
        </div>
      </div>
      
      {/* Chain visualization */}
      <div className="space-y-2 mb-8">
        {chainSteps.map((step, index) => (
          <motion.div 
            key={step.id} 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${getStatusBg(step.status)}`}>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">{step.id}</span>
                </div>
                <step.icon className="w-5 h-5 text-foreground" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{step.label}</span>
                  {getStatusIcon(step.status)}
                </div>
                <div className="text-xs text-muted-foreground">{step.detail}</div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className={`text-sm font-bold ${
                  step.status === 'complete' ? 'text-green-500' : 
                  step.status === 'active' ? 'text-primary' : 
                  'text-muted-foreground'
                }`}>
                  {step.metric}
                </div>
              </div>
            </div>
            
            {/* Connector line */}
            {index < chainSteps.length - 1 && (
              <div className="absolute left-7 top-full h-2 w-0.5 bg-border" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="p-4 rounded-lg bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">On Site Now</span>
          </div>
          <div className="text-2xl font-bold">342</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
          className="p-4 rounded-lg bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Open Exceptions</span>
          </div>
          <div className="text-2xl font-bold">5</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="p-4 rounded-lg bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Today's Spend</span>
          </div>
          <div className="text-2xl font-bold">£12.4k</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.55 }}
          className="p-4 rounded-lg bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Overtime Alert</span>
          </div>
          <div className="text-2xl font-bold text-destructive">3</div>
        </motion.div>
      </div>

      {/* Chain integrity summary */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="rounded-lg bg-card border border-border p-4"
      >
        <h3 className="font-semibold mb-4">Chain Integrity</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded bg-green-500/5 border border-green-500/20">
            <div className="text-2xl font-bold text-green-500">3</div>
            <div className="text-xs text-muted-foreground">Steps Complete</div>
          </div>
          <div className="text-center p-3 rounded bg-primary/10 border border-primary/30">
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center p-3 rounded bg-muted/50 border border-border">
            <div className="text-2xl font-bold text-muted-foreground">3</div>
            <div className="text-xs text-muted-foreground">Awaiting</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DemoOverview;