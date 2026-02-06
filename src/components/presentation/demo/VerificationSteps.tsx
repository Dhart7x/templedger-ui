// Verification Step Status Component - Shows the 10 verified execution steps
import { CheckCircle, Circle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const VERIFICATION_STEPS = [
  { id: 1, key: "registered", label: "Worker registered" },
  { id: 2, key: "compliance", label: "Compliance satisfied" },
  { id: 3, key: "contract", label: "Contract / rate confirmed" },
  { id: 4, key: "scheduled", label: "Shift scheduled" },
  { id: 5, key: "clocked-in", label: "Clocked in" },
  { id: 6, key: "clocked-out", label: "Clocked out" },
  { id: 7, key: "approved", label: "Hours approved" },
  { id: 8, key: "pay-verified", label: "Pay verified" },
  { id: 9, key: "charge-verified", label: "Charge verified" },
  { id: 10, key: "invoice-permitted", label: "Invoice permitted" },
] as const;

export type StepKey = typeof VERIFICATION_STEPS[number]["key"];
export type StepStatus = "complete" | "current" | "pending" | "blocked" | "at-risk";

interface VerificationStepsProps {
  currentStep: number;
  stepStatuses?: Record<StepKey, StepStatus>;
  compact?: boolean;
  className?: string;
}

const getStepStatus = (stepIndex: number, currentStep: number): StepStatus => {
  if (stepIndex < currentStep) return "complete";
  if (stepIndex === currentStep) return "current";
  return "pending";
};

const StepIcon = ({ status }: { status: StepStatus }) => {
  switch (status) {
    case "complete":
      return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    case "current":
      return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
    case "blocked":
      return <XCircle className="w-4 h-4 text-destructive" />;
    case "at-risk":
      return <AlertCircle className="w-4 h-4 text-amber-500" />;
    default:
      return <Circle className="w-4 h-4 text-muted-foreground/40" />;
  }
};

export const VerificationSteps = ({ 
  currentStep, 
  stepStatuses, 
  compact = false,
  className 
}: VerificationStepsProps) => {
  if (compact) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {VERIFICATION_STEPS.map((step, idx) => {
          const status = stepStatuses?.[step.key] || getStepStatus(idx, currentStep);
          return (
            <div
              key={step.id}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                status === "complete" && "bg-emerald-500",
                status === "current" && "bg-primary animate-pulse",
                status === "blocked" && "bg-destructive",
                status === "at-risk" && "bg-amber-500",
                status === "pending" && "bg-muted-foreground/30"
              )}
              title={`${step.label}: ${status}`}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      {VERIFICATION_STEPS.map((step, idx) => {
        const status = stepStatuses?.[step.key] || getStepStatus(idx, currentStep);
        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-2 text-xs",
              status === "complete" && "text-emerald-500",
              status === "current" && "text-primary font-medium",
              status === "blocked" && "text-destructive",
              status === "at-risk" && "text-amber-500",
              status === "pending" && "text-muted-foreground/50"
            )}
          >
            <StepIcon status={status} />
            <span>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// Inline step indicator for tables/cards
interface StepBadgeProps {
  step: number;
  status?: StepStatus;
  showLabel?: boolean;
}

export const StepBadge = ({ step, status = "current", showLabel = true }: StepBadgeProps) => {
  const stepInfo = VERIFICATION_STEPS[step - 1];
  if (!stepInfo) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium",
        status === "complete" && "bg-emerald-500/10 text-emerald-500",
        status === "current" && "bg-primary/10 text-primary",
        status === "blocked" && "bg-destructive/10 text-destructive",
        status === "at-risk" && "bg-amber-500/10 text-amber-500",
        status === "pending" && "bg-muted text-muted-foreground"
      )}
    >
      <StepIcon status={status} />
      {showLabel && <span>{stepInfo.label}</span>}
    </div>
  );
};

// Progress bar showing overall completion
interface VerificationProgressProps {
  completedSteps: number;
  totalSteps?: number;
  blockedAt?: number;
  className?: string;
}

export const VerificationProgress = ({ 
  completedSteps, 
  totalSteps = 10, 
  blockedAt,
  className 
}: VerificationProgressProps) => {
  const percentage = (completedSteps / totalSteps) * 100;
  const isBlocked = blockedAt !== undefined && blockedAt <= completedSteps;

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className={cn(
          "font-medium",
          isBlocked ? "text-destructive" : completedSteps === totalSteps ? "text-emerald-500" : "text-foreground"
        )}>
          Step {completedSteps + 1}/{totalSteps}
        </span>
        <span className="text-muted-foreground">
          {isBlocked ? "Blocked" : completedSteps === totalSteps ? "Complete" : VERIFICATION_STEPS[completedSteps]?.label}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            isBlocked ? "bg-destructive" : "bg-emerald-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default VerificationSteps;
