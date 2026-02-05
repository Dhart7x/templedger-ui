 import { useState } from "react";
 import { X, Clock, UserPlus, Car, Bus, MapPin } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Checkbox } from "@/components/ui/checkbox";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { useDemoContext, type ExceptionResolution } from "./DemoContext";
 import { standbyWorkers } from "./standbyWorkersData";
 
 interface ExceptionResolutionModalProps {
   isOpen: boolean;
   onClose: () => void;
   exception: {
     id: string;
     workerId: string;
     workerName: string;
     department: string;
     type: string;
   };
 }
 
 const ExceptionResolutionModal = ({ isOpen, onClose, exception }: ExceptionResolutionModalProps) => {
   const { resolveException } = useDemoContext();
   const [resolutionType, setResolutionType] = useState<"on-the-way" | "replaced" | null>(null);
   const [etaMinutes, setEtaMinutes] = useState<string>("15");
   const [selectedReplacement, setSelectedReplacement] = useState<string>("");
 
   // Get best matches for the department
   const bestMatches = standbyWorkers
     .filter(w => w.bestMatchDepartment.toLowerCase() === exception.department.toLowerCase() || 
                  w.qualifiedDepartments.some(d => d.toLowerCase() === exception.department.toLowerCase()))
     .sort((a, b) => a.distanceToSite - b.distanceToSite)
     .slice(0, 6);
 
   const selectedWorker = bestMatches.find(w => w.id === selectedReplacement);
 
   const handleSubmit = () => {
     if (!resolutionType) return;
 
     const resolution: ExceptionResolution = {
       exceptionId: exception.id,
       workerId: exception.workerId,
       workerName: exception.workerName,
       department: exception.department,
       resolutionType,
       timestamp: new Date().toISOString(),
       acknowledged: false,
     };
 
     if (resolutionType === "on-the-way") {
       resolution.etaMinutes = parseInt(etaMinutes);
     } else if (resolutionType === "replaced" && selectedWorker) {
       resolution.replacementWorkerId = selectedWorker.id;
       resolution.replacementWorkerName = selectedWorker.name;
       resolution.replacementEtaMinutes = selectedWorker.travelTimeCar;
     }
 
     resolveException(resolution);
     onClose();
   };
 
   if (!isOpen) return null;
 
   return (
     <div className="fixed inset-0 z-50 flex items-center justify-center">
       <div className="absolute inset-0 bg-black/60" onClick={onClose} />
       <div className="relative bg-card border border-border rounded-xl w-full max-w-lg mx-4 shadow-2xl">
         {/* Header */}
         <div className="flex items-center justify-between p-4 border-b border-border">
           <div>
             <h2 className="text-lg font-semibold text-foreground">Resolve Exception</h2>
             <p className="text-sm text-muted-foreground">{exception.workerName} • {exception.type}</p>
           </div>
           <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
             <X className="w-5 h-5 text-muted-foreground" />
           </button>
         </div>
 
         {/* Body */}
         <div className="p-4 space-y-4">
           {/* Resolution Type Selection */}
           <div className="space-y-3">
             <label className="text-sm font-medium text-foreground">Resolution Type</label>
             
             {/* On the Way Option */}
             <div 
               className={`p-4 rounded-lg border cursor-pointer transition-all ${
                 resolutionType === "on-the-way" 
                   ? "border-primary bg-primary/5" 
                   : "border-border hover:border-muted-foreground/50"
               }`}
               onClick={() => setResolutionType("on-the-way")}
             >
               <div className="flex items-start gap-3">
                 <Checkbox 
                   checked={resolutionType === "on-the-way"}
                   className="mt-0.5"
                 />
                 <div className="flex-1">
                   <div className="flex items-center gap-2">
                     <Clock className="w-4 h-4 text-amber-500" />
                     <span className="font-medium text-foreground">On the Way</span>
                   </div>
                   <p className="text-xs text-muted-foreground mt-1">
                     Worker is running late but confirmed arriving
                   </p>
                   
                   {resolutionType === "on-the-way" && (
                     <div className="mt-3 flex items-center gap-2">
                       <span className="text-sm text-muted-foreground">ETA:</span>
                       <Select value={etaMinutes} onValueChange={setEtaMinutes}>
                         <SelectTrigger className="w-28 h-8">
                           <SelectValue />
                         </SelectTrigger>
                         <SelectContent className="bg-card border-border">
                           <SelectItem value="5">5 mins</SelectItem>
                           <SelectItem value="10">10 mins</SelectItem>
                           <SelectItem value="15">15 mins</SelectItem>
                           <SelectItem value="20">20 mins</SelectItem>
                           <SelectItem value="30">30 mins</SelectItem>
                           <SelectItem value="45">45 mins</SelectItem>
                           <SelectItem value="60">1 hour</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                   )}
                 </div>
               </div>
             </div>
 
             {/* Replace Option */}
             <div 
               className={`p-4 rounded-lg border cursor-pointer transition-all ${
                 resolutionType === "replaced" 
                   ? "border-primary bg-primary/5" 
                   : "border-border hover:border-muted-foreground/50"
               }`}
               onClick={() => setResolutionType("replaced")}
             >
               <div className="flex items-start gap-3">
                 <Checkbox 
                   checked={resolutionType === "replaced"}
                   className="mt-0.5"
                 />
                 <div className="flex-1">
                   <div className="flex items-center gap-2">
                     <UserPlus className="w-4 h-4 text-emerald-500" />
                     <span className="font-medium text-foreground">Replace Worker</span>
                   </div>
                   <p className="text-xs text-muted-foreground mt-1">
                     Send a replacement from standby pool
                   </p>
                   
                   {resolutionType === "replaced" && (
                     <div className="mt-3 space-y-2">
                       <span className="text-sm text-muted-foreground">Best matches for {exception.department}:</span>
                       <div className="space-y-2 max-h-48 overflow-y-auto">
                         {bestMatches.map((worker) => (
                           <div
                             key={worker.id}
                             className={`p-3 rounded-lg border cursor-pointer transition-all ${
                               selectedReplacement === worker.id
                                 ? "border-primary bg-primary/10"
                                 : "border-border/50 hover:border-muted-foreground/50"
                             }`}
                             onClick={(e) => {
                               e.stopPropagation();
                               setSelectedReplacement(worker.id);
                             }}
                           >
                             <div className="flex items-center justify-between">
                               <div>
                                 <span className="font-medium text-sm text-foreground">{worker.name}</span>
                                 <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                   <MapPin className="w-3 h-3" />
                                   <span>{worker.distanceToSite} miles</span>
                                 </div>
                               </div>
                               <div className="text-right">
                                 <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                   <Car className="w-3 h-3" />
                                   <span>{worker.travelTimeCar} min</span>
                                 </div>
                                 <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                   <Bus className="w-3 h-3" />
                                   <span>{worker.travelTimePublic} min</span>
                                 </div>
                               </div>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             </div>
           </div>
         </div>
 
         {/* Footer */}
         <div className="flex items-center justify-end gap-3 p-4 border-t border-border">
           <Button variant="outline" onClick={onClose}>
             Cancel
           </Button>
           <Button 
             onClick={handleSubmit}
             disabled={!resolutionType || (resolutionType === "replaced" && !selectedReplacement)}
           >
             Notify Client
           </Button>
         </div>
       </div>
     </div>
   );
 };
 
 export default ExceptionResolutionModal;