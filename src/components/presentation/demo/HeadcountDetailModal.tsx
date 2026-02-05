 import { X, Users, Clock, CheckCircle, AlertTriangle, Building2 } from "lucide-react";
 
 interface Worker {
   workerId: string;
   workerName: string;
   status: "confirmed" | "pending";
 }
 
 interface HeadcountDetailModalProps {
   isOpen: boolean;
   onClose: () => void;
   request: {
     department: string;
     site: string;
     shift: string;
     date: string;
     required: number;
     fulfilled: number;
     agencies: { name: string; assigned: number; confirmed: number; workers?: Worker[] }[];
     status: string;
   } | null;
 }
 
 const HeadcountDetailModal = ({ isOpen, onClose, request }: HeadcountDetailModalProps) => {
   if (!isOpen || !request) return null;
 
   // Mock confirmed workers based on agency data
   const mockWorkers: Record<string, Worker[]> = {
     "Staffline": [
       { workerId: "W001", workerName: "Sarah Mitchell", status: "confirmed" },
       { workerId: "W002", workerName: "James Cooper", status: "confirmed" },
       { workerId: "W006", workerName: "Michael Brown", status: "confirmed" },
       { workerId: "W007", workerName: "Lisa Anderson", status: "pending" },
     ],
     "Blue Arrow": [
       { workerId: "EXT005", workerName: "Ahmed Khan", status: "confirmed" },
       { workerId: "EXT006", workerName: "Jessica Williams", status: "confirmed" },
       { workerId: "EXT007", workerName: "David Thompson", status: "pending" },
     ],
     "Pertemps": [
       { workerId: "EXT008", workerName: "Maria Santos", status: "confirmed" },
       { workerId: "EXT009", workerName: "Robert Chen", status: "confirmed" },
       { workerId: "EXT010", workerName: "Emma Wilson", status: "confirmed" },
     ],
   };
 
   return (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
       <div 
         className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] overflow-hidden flex flex-col"
         onClick={(e) => e.stopPropagation()}
       >
         {/* Header */}
         <div className="flex items-center justify-between p-4 border-b border-border">
           <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
               request.status === "fulfilled" ? "bg-green-500/10" :
               request.status === "partial" ? "bg-amber-500/10" :
               "bg-destructive/10"
             }`}>
               <Building2 className={`w-5 h-5 ${
                 request.status === "fulfilled" ? "text-green-500" :
                 request.status === "partial" ? "text-amber-500" :
                 "text-destructive"
               }`} />
             </div>
             <div>
               <h3 className="font-semibold text-foreground">{request.department}</h3>
               <p className="text-xs text-muted-foreground">{request.site} • {request.date}</p>
             </div>
           </div>
           <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
             <X className="w-5 h-5" />
           </button>
         </div>
 
         {/* Shift Info */}
         <div className="p-4 border-b border-border bg-muted/30">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Clock className="w-4 h-4" />
               {request.shift}
             </div>
             <div className="flex items-center gap-2">
               <Users className="w-4 h-4 text-muted-foreground" />
               <span className={`font-bold ${
                 request.status === "fulfilled" ? "text-green-500" :
                 request.status === "partial" ? "text-amber-500" :
                 "text-destructive"
               }`}>
                 {request.fulfilled}/{request.required}
               </span>
               <span className="text-sm text-muted-foreground">confirmed</span>
             </div>
           </div>
         </div>
 
         {/* Workers by Agency */}
         <div className="flex-1 overflow-auto p-4 space-y-4">
           {request.agencies.length === 0 ? (
             <div className="text-center py-8 text-muted-foreground">
               <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
               <p className="text-sm">No agencies assigned yet</p>
             </div>
           ) : (
             request.agencies.map((agency) => {
               const workers = mockWorkers[agency.name] || [];
               const displayWorkers = workers.slice(0, agency.confirmed);
               
               return (
                 <div key={agency.name} className="bg-card border border-border rounded-lg overflow-hidden">
                   <div className="px-3 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
                     <span className="text-sm font-medium text-foreground">{agency.name}</span>
                     <span className={`text-xs px-2 py-0.5 rounded-full ${
                       agency.confirmed === agency.assigned 
                         ? "bg-green-500/20 text-green-500" 
                         : "bg-amber-500/20 text-amber-500"
                     }`}>
                       {agency.confirmed}/{agency.assigned} confirmed
                     </span>
                   </div>
                   <div className="divide-y divide-border">
                     {displayWorkers.length > 0 ? displayWorkers.map((worker) => (
                       <div key={worker.workerId} className="px-3 py-2 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                             {worker.workerName.split(" ").map(n => n[0]).join("")}
                           </div>
                           <div>
                             <p className="text-sm font-medium text-foreground">{worker.workerName}</p>
                             <p className="text-xs text-muted-foreground">{worker.workerId}</p>
                           </div>
                         </div>
                         {worker.status === "confirmed" ? (
                           <CheckCircle className="w-4 h-4 text-green-500" />
                         ) : (
                           <AlertTriangle className="w-4 h-4 text-amber-500" />
                         )}
                       </div>
                     )) : (
                       <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                         Awaiting worker assignments
                       </div>
                     )}
                   </div>
                 </div>
               );
             })
           )}
         </div>
 
         {/* Footer */}
         <div className="p-3 border-t border-border bg-muted/30 text-center">
           <p className="text-xs text-muted-foreground">
             Worker assignments sync in real-time from agency portal
           </p>
         </div>
       </div>
     </div>
   );
 };
 
 export default HeadcountDetailModal;