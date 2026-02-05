 import { useState } from "react";
 import { AlertTriangle, AlertCircle, ArrowRight, Clock, UserPlus, CheckCircle } from "lucide-react";
import { agencyIssues } from "./agencyDemoData";
 import { useDemoContext } from "./DemoContext";
 import ExceptionResolutionModal from "./ExceptionResolutionModal";

const DemoAgencyIssues = () => {
   const { exceptionResolutions } = useDemoContext();
   const [selectedIssue, setSelectedIssue] = useState<{
     id: string;
     workerId: string;
     workerName: string;
     department: string;
     type: string;
   } | null>(null);

  const criticalIssues = agencyIssues.filter(i => i.severity === "critical");
  const warningIssues = agencyIssues.filter(i => i.severity === "warning");

   const getResolutionStatus = (issueId: string) => {
     return exceptionResolutions[issueId];
   };

  return (
     <>
       <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground">Issues & Exceptions</h1>
        <p className="text-xs text-muted-foreground">Execution failures that require resolution</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Critical</span>
          </div>
          <div className="text-3xl font-bold text-destructive">{criticalIssues.length}</div>
          <p className="text-xs text-muted-foreground mt-1">Blocking pay or invoicing</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-600">Warnings</span>
          </div>
          <div className="text-3xl font-bold text-amber-600">{warningIssues.length}</div>
          <p className="text-xs text-muted-foreground mt-1">Requires review</p>
        </div>
      </div>

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-destructive flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Critical — Must Resolve
          </h2>
          <div className="space-y-2">
            {criticalIssues.map((issue) => (
               <div key={issue.id} className="bg-card border border-destructive/30 rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => {
                 const resolution = getResolutionStatus(issue.id);
                 if (!resolution) {
                   setSelectedIssue({
                     id: issue.id,
                     workerId: issue.workerId,
                     workerName: issue.workerName,
                     department: "Picking",
                     type: issue.failedStep,
                   });
                 }
               }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm font-semibold text-foreground">{issue.workerName}</span>
                    <span className="text-xs text-muted-foreground ml-2">{issue.workerId}</span>
                  </div>
                   {getResolutionStatus(issue.id) ? (
                     <span className="text-xs bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                       <CheckCircle className="w-3 h-3" />
                       Resolved
                     </span>
                   ) : (
                     <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded font-medium">
                       {issue.failedStep}
                     </span>
                   )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{issue.reason}</p>
                 {getResolutionStatus(issue.id) ? (
                   <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                     {getResolutionStatus(issue.id)?.resolutionType === "on-the-way" ? (
                       <div className="flex items-center gap-2 text-sm text-emerald-500">
                         <Clock className="w-4 h-4" />
                         On the way — ETA {getResolutionStatus(issue.id)?.etaMinutes} mins
                       </div>
                     ) : (
                       <div className="flex items-center gap-2 text-sm text-emerald-500">
                         <UserPlus className="w-4 h-4" />
                         Replaced by {getResolutionStatus(issue.id)?.replacementWorkerName} — ETA {getResolutionStatus(issue.id)?.replacementEtaMinutes} mins
                       </div>
                     )}
                   </div>
                 ) : (
                   <div className="flex items-center gap-2 text-sm text-primary font-medium">
                     <ArrowRight className="w-4 h-4" />
                     {issue.requiredAction}
                   </div>
                 )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning Issues */}
      {warningIssues.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-amber-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Warnings — Review Required
          </h2>
          <div className="space-y-2">
            {warningIssues.map((issue) => (
               <div key={issue.id} className="bg-card border border-amber-500/30 rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => {
                 const resolution = getResolutionStatus(issue.id);
                 if (!resolution) {
                   setSelectedIssue({
                     id: issue.id,
                     workerId: issue.workerId,
                     workerName: issue.workerName,
                     department: "Warehouse",
                     type: issue.failedStep,
                   });
                 }
               }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm font-semibold text-foreground">{issue.workerName}</span>
                    <span className="text-xs text-muted-foreground ml-2">{issue.workerId}</span>
                  </div>
                   {getResolutionStatus(issue.id) ? (
                     <span className="text-xs bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                       <CheckCircle className="w-3 h-3" />
                       Resolved
                     </span>
                   ) : (
                     <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-0.5 rounded font-medium">
                       {issue.failedStep}
                     </span>
                   )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{issue.reason}</p>
                 {getResolutionStatus(issue.id) ? (
                   <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                     {getResolutionStatus(issue.id)?.resolutionType === "on-the-way" ? (
                       <div className="flex items-center gap-2 text-sm text-emerald-500">
                         <Clock className="w-4 h-4" />
                         On the way — ETA {getResolutionStatus(issue.id)?.etaMinutes} mins
                       </div>
                     ) : (
                       <div className="flex items-center gap-2 text-sm text-emerald-500">
                         <UserPlus className="w-4 h-4" />
                         Replaced by {getResolutionStatus(issue.id)?.replacementWorkerName} — ETA {getResolutionStatus(issue.id)?.replacementEtaMinutes} mins
                       </div>
                     )}
                   </div>
                 ) : (
                   <div className="flex items-center gap-2 text-sm text-primary font-medium">
                     <ArrowRight className="w-4 h-4" />
                     {issue.requiredAction}
                   </div>
                 )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
        Unresolved issues block execution. Workers cannot be paid or invoiced until all steps are verified.
      </div>
    </div>

       {selectedIssue && (
         <ExceptionResolutionModal
           isOpen={!!selectedIssue}
           onClose={() => setSelectedIssue(null)}
           exception={selectedIssue}
         />
       )}
     </>
  );
};

export default DemoAgencyIssues;
