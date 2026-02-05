 import { useState } from "react";
 import { Search, Filter, ChevronRight, MapPin, Clock, Star, Car, Train } from "lucide-react";
 import { standbyOnlyWorkers, liveWorkers, StandbyWorker } from "./standbyWorkersData";
 
 interface DemoStandbyWorkersProps {
   onSelectWorker: (worker: StandbyWorker) => void;
   showLive?: boolean;
 }
 
 const DemoStandbyWorkers = ({ onSelectWorker, showLive = false }: DemoStandbyWorkersProps) => {
   const [searchTerm, setSearchTerm] = useState("");
   const [departmentFilter, setDepartmentFilter] = useState<string>("all");
   
   const workers = showLive ? liveWorkers : standbyOnlyWorkers;
   const departments = ["all", ...Array.from(new Set(workers.map(w => w.bestMatchDepartment)))];
 
   const filteredWorkers = workers.filter((worker) => {
     const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           worker.id.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesDept = departmentFilter === "all" || worker.bestMatchDepartment === departmentFilter;
     return matchesSearch && matchesDept;
   });
 
   return (
     <div className="p-4 md:p-6 space-y-4">
       {/* Header */}
       <div>
         <h1 className="text-lg md:text-xl font-bold text-foreground">
           {showLive ? "Live Workers" : "Standby Pool"}
         </h1>
         <p className="text-xs text-muted-foreground">
           {showLive ? "Currently deployed workers" : `${standbyOnlyWorkers.length} workers available for deployment`}
         </p>
       </div>
 
       {/* Filters */}
       <div className="flex flex-col md:flex-row gap-3">
         <div className="relative flex-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
           <input
             type="text"
             placeholder="Search by name or ID..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
           />
         </div>
         <div className="flex items-center gap-2">
           <Filter className="w-4 h-4 text-muted-foreground" />
           <select
             value={departmentFilter}
             onChange={(e) => setDepartmentFilter(e.target.value)}
             className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground"
           >
             {departments.map(dept => (
               <option key={dept} value={dept}>
                 {dept === "all" ? "All Departments" : dept}
               </option>
             ))}
           </select>
         </div>
       </div>
 
       {/* Workers List */}
       <div className="bg-card border border-border rounded-lg overflow-hidden">
         <div className="grid grid-cols-[1fr_100px_100px_120px_32px] gap-2 px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">
           <span>Worker</span>
           <span>Best Match</span>
           <span>Distance</span>
           <span>Availability</span>
           <span></span>
         </div>
         <div className="divide-y divide-border max-h-[400px] overflow-auto">
           {filteredWorkers.map((worker) => (
             <button
               key={worker.id}
               onClick={() => onSelectWorker(worker)}
               className="w-full grid grid-cols-[1fr_100px_100px_120px_32px] gap-2 px-4 py-3 items-center text-left hover:bg-muted/50 transition-colors"
             >
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                   {worker.name.split(" ").map(n => n[0]).join("")}
                 </div>
                 <div>
                   <div className="text-sm font-medium text-foreground">{worker.name}</div>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <span>{worker.id}</span>
                     <span className="flex items-center gap-0.5">
                       <Star className="w-3 h-3 text-amber-500" />
                       {worker.rating}
                     </span>
                   </div>
                 </div>
               </div>
               <div>
                 <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                   {worker.bestMatchDepartment}
                 </span>
               </div>
               <div className="flex items-center gap-1 text-xs text-muted-foreground">
                 <MapPin className="w-3 h-3" />
                 <span>{worker.distance.miles} mi</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1 text-xs text-muted-foreground">
                   {worker.preferences.transportMode === "car" ? (
                     <Car className="w-3 h-3" />
                   ) : (
                     <Train className="w-3 h-3" />
                   )}
                   <span>{worker.preferences.transportMode === "car" ? worker.distance.carTime : worker.distance.publicTransportTime}</span>
                 </div>
               </div>
               <ChevronRight className="w-4 h-4 text-muted-foreground" />
             </button>
           ))}
         </div>
       </div>
 
       <div className="text-xs text-muted-foreground text-center">
         Showing {filteredWorkers.length} of {workers.length} workers
       </div>
     </div>
   );
 };
 
 export default DemoStandbyWorkers;