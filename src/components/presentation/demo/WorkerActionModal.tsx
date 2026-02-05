 import { useState } from "react";
 import { X, CheckCircle, XCircle, MessageSquare, Send } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Textarea } from "@/components/ui/textarea";
 import { useDemoContext } from "./DemoContext";
 
 interface WorkerActionModalProps {
   isOpen: boolean;
   onClose: () => void;
   worker: {
     id: string;
     name: string;
     department: string;
     status: string;
     executionStatus: string;
   };
 }
 
 type ActionType = "approve" | "reject" | "request-info";
 
 const WorkerActionModal = ({ isOpen, onClose, worker }: WorkerActionModalProps) => {
   const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
   const [message, setMessage] = useState("");
   const [submitted, setSubmitted] = useState(false);
   const { addWorkerAction, updateWorkerStatus } = useDemoContext();
 
   if (!isOpen) return null;
 
   const handleSubmit = () => {
     if (!selectedAction) return;
     
     addWorkerAction({
       workerId: worker.id,
       workerName: worker.name,
       type: selectedAction,
       message: message || undefined,
       fromView: "labour-user",
     });
 
     // Update worker status based on action
     if (selectedAction === "approve") {
       updateWorkerStatus(worker.id, "deployed", "on-track");
     } else if (selectedAction === "reject") {
       updateWorkerStatus(worker.id, "blocked", "blocked");
     }
 
     setSubmitted(true);
     setTimeout(() => {
       onClose();
       setSelectedAction(null);
       setMessage("");
       setSubmitted(false);
     }, 1500);
   };
 
   const actions = [
     { id: "approve" as ActionType, label: "Approve", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10 border-green-500/30 hover:bg-green-500/20" },
     { id: "reject" as ActionType, label: "Reject", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10 border-destructive/30 hover:bg-destructive/20" },
     { id: "request-info" as ActionType, label: "Request Info", icon: MessageSquare, color: "text-primary", bg: "bg-primary/10 border-primary/30 hover:bg-primary/20" },
   ];
 
   return (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
       <div 
         className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md mx-4"
         onClick={(e) => e.stopPropagation()}
       >
         {/* Header */}
         <div className="flex items-center justify-between p-4 border-b border-border">
           <div>
             <h3 className="font-semibold text-foreground">Worker Action</h3>
             <p className="text-sm text-muted-foreground">Take action on {worker.name}</p>
           </div>
           <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
             <X className="w-5 h-5" />
           </button>
         </div>
 
         {/* Content */}
         <div className="p-4 space-y-4">
           {/* Worker Info */}
           <div className="bg-muted/30 rounded-lg p-3">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-foreground">{worker.name}</p>
                 <p className="text-xs text-muted-foreground">{worker.id} • {worker.department}</p>
               </div>
               <div className="text-right">
                 <span className={`text-xs px-2 py-1 rounded-full ${
                   worker.executionStatus === "on-track" ? "bg-green-500/20 text-green-500" :
                   worker.executionStatus === "at-risk" ? "bg-amber-500/20 text-amber-500" :
                   "bg-destructive/20 text-destructive"
                 }`}>
                   {worker.executionStatus.replace("-", " ")}
                 </span>
               </div>
             </div>
           </div>
 
           {submitted ? (
             <div className="text-center py-8">
               <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
               <p className="font-semibold text-foreground">Action Submitted</p>
               <p className="text-sm text-muted-foreground">Agency has been notified via ledger</p>
             </div>
           ) : (
             <>
               {/* Action Buttons */}
               <div className="grid grid-cols-3 gap-2">
                 {actions.map((action) => (
                   <button
                     key={action.id}
                     onClick={() => setSelectedAction(action.id)}
                     className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                       selectedAction === action.id ? action.bg + " ring-2 ring-offset-2 ring-offset-background" : "border-border hover:border-primary/30"
                     }`}
                   >
                     <action.icon className={`w-5 h-5 ${action.color}`} />
                     <span className="text-xs font-medium">{action.label}</span>
                   </button>
                 ))}
               </div>
 
               {/* Message Input */}
               {selectedAction && (
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-foreground">
                     {selectedAction === "request-info" ? "Request Details" : "Optional Message"}
                   </label>
                   <Textarea
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     placeholder={
                       selectedAction === "request-info" 
                         ? "What information do you need from the agency?"
                         : "Add a note for the agency (optional)"
                     }
                     className="resize-none"
                     rows={3}
                   />
                 </div>
               )}
             </>
           )}
         </div>
 
         {/* Footer */}
         {!submitted && (
           <div className="flex items-center justify-end gap-2 p-4 border-t border-border">
             <Button variant="outline" onClick={onClose}>Cancel</Button>
             <Button 
               onClick={handleSubmit} 
               disabled={!selectedAction || (selectedAction === "request-info" && !message.trim())}
               className="gap-2"
             >
               <Send className="w-4 h-4" />
               Send to Agency
             </Button>
           </div>
         )}
       </div>
     </div>
   );
 };
 
 export default WorkerActionModal;