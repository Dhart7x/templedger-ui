 import { useState } from "react";
 import { MapPin, Clock, AlertTriangle, CheckCircle, Users, Building2, Bell, Filter } from "lucide-react";
 import { useDemoContext } from "./DemoContext";
 
 interface Worker {
   id: string;
   name: string;
   department: string;
   site: string;
   status: "on-site" | "late" | "no-show" | "overtime";
   clockIn?: string;
   shift: string;
 }
 
 const workers: Worker[] = [
   { id: "W001", name: "Sarah Mitchell", department: "Picking", site: "Heathrow DC", status: "on-site", clockIn: "06:02", shift: "Morning" },
   { id: "W002", name: "James Cooper", department: "Packing", site: "Heathrow DC", status: "on-site", clockIn: "06:00", shift: "Morning" },
   { id: "W007", name: "Lisa Anderson", department: "Goods In", site: "Heathrow DC", status: "late", clockIn: "06:15", shift: "Morning" },
   { id: "W003", name: "Rico Fernandez", department: "Goods In", site: "Heathrow DC", status: "on-site", clockIn: "05:58", shift: "Morning" },
   { id: "W005", name: "Emma Wilson", department: "Returns", site: "Heathrow DC", status: "on-site", clockIn: "14:01", shift: "Afternoon" },
   { id: "W006", name: "Michael Brown", department: "Packing", site: "Heathrow DC", status: "on-site", clockIn: "06:00", shift: "Morning" },
 ];
 
 const departmentSummary = [
   { name: "Picking", required: 4, actual: 2, status: "at-risk" as const },
   { name: "Packing", required: 2, actual: 2, status: "on-track" as const },
   { name: "Goods In", required: 2, actual: 2, status: "on-track" as const },
   { name: "Returns", required: 1, actual: 1, status: "on-track" as const },
   { name: "Loading", required: 3, actual: 0, status: "failing" as const },
 ];
 
 const DemoAgencyLiveSnapshot = () => {
   const [siteFilter, setSiteFilter] = useState<string>("all");
   const { notifications, workerActions } = useDemoContext();
 
   const sites = [...new Set(workers.map(w => w.site))];
   const filteredWorkers = siteFilter === "all" ? workers : workers.filter(w => w.site === siteFilter);
 
   const counts = {
     total: workers.length,
     onSite: workers.filter(w => w.status === "on-site").length,
     late: workers.filter(w => w.status === "late").length,
     noShow: workers.filter(w => w.status === "no-show").length,
     overtime: workers.filter(w => w.status === "overtime").length,
   };
 
   // Actions from Labour User
   const pendingActions = workerActions.filter(a => a.status === "pending" && a.fromView === "labour-user");
 
   const issues = [
     { type: "headcount", text: "Loading department needs 3 workers - no assignments", urgent: true },
     { type: "late", text: "Lisa Anderson (Goods In) - 15 min late", urgent: false },
     { type: "allocation", text: "2 unfilled shifts for tomorrow's morning", urgent: true },
   ];
 
   return (
     <div className="p-6 space-y-6">
       {/* Header with filters */}
       <div className="flex items-center justify-between">
         <div>
           <h2 className="text-xl font-bold">Live Snapshot</h2>
           <p className="text-sm text-muted-foreground">Real-time view of your deployed workers</p>
         </div>
         <div className="flex items-center gap-2">
           <Filter className="w-4 h-4 text-muted-foreground" />
           <select 
             value={siteFilter}
             onChange={(e) => setSiteFilter(e.target.value)}
             className="text-sm bg-card border border-border rounded px-3 py-1.5"
           >
             <option value="all">All Sites</option>
             {sites.map(site => (
               <option key={site} value={site}>{site}</option>
             ))}
           </select>
         </div>
       </div>
 
       {/* Pending Actions from Labour User */}
       {pendingActions.length > 0 && (
         <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
           <div className="flex items-center gap-2 mb-3">
             <Bell className="w-4 h-4 text-primary" />
             <span className="font-semibold text-foreground">Actions from Labour User</span>
             <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{pendingActions.length}</span>
           </div>
           <div className="space-y-2">
             {pendingActions.map((action) => (
               <div key={action.id} className="bg-card border border-border rounded p-3 flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-foreground">
                     {action.type === "approve" && "✓ Approved: "}
                     {action.type === "reject" && "✗ Rejected: "}
                     {action.type === "request-info" && "? Info Requested: "}
                     {action.workerName}
                   </p>
                   {action.message && <p className="text-xs text-muted-foreground">{action.message}</p>}
                 </div>
                 <span className="text-xs text-muted-foreground">Just now</span>
               </div>
             ))}
           </div>
         </div>
       )}
 
       {/* Status cards */}
       <div className="grid grid-cols-5 gap-3">
         <div className="bg-card border border-border rounded-lg p-4">
           <div className="flex items-center gap-2 mb-1">
             <Users className="w-4 h-4 text-muted-foreground" />
             <span className="text-xs text-muted-foreground">Total</span>
           </div>
           <p className="text-2xl font-bold">{counts.total}</p>
         </div>
         <div className="bg-card border border-border rounded-lg p-4">
           <div className="flex items-center gap-2 mb-1">
             <CheckCircle className="w-4 h-4 text-green-500" />
             <span className="text-xs text-muted-foreground">On Site</span>
           </div>
           <p className="text-2xl font-bold text-green-500">{counts.onSite}</p>
         </div>
         <div className="bg-card border border-border rounded-lg p-4">
           <div className="flex items-center gap-2 mb-1">
             <Clock className="w-4 h-4 text-amber-500" />
             <span className="text-xs text-muted-foreground">Late</span>
           </div>
           <p className="text-2xl font-bold text-amber-500">{counts.late}</p>
         </div>
         <div className="bg-card border border-border rounded-lg p-4">
           <div className="flex items-center gap-2 mb-1">
             <AlertTriangle className="w-4 h-4 text-destructive" />
             <span className="text-xs text-muted-foreground">No-Show</span>
           </div>
           <p className="text-2xl font-bold text-destructive">{counts.noShow}</p>
         </div>
         <div className="bg-card border border-border rounded-lg p-4">
           <div className="flex items-center gap-2 mb-1">
             <Clock className="w-4 h-4 text-primary" />
             <span className="text-xs text-muted-foreground">Overtime</span>
           </div>
           <p className="text-2xl font-bold text-primary">{counts.overtime}</p>
         </div>
       </div>
 
       <div className="grid grid-cols-3 gap-6">
         {/* Department summary */}
         <div className="col-span-1">
           <h3 className="text-sm font-semibold mb-3">Department Status</h3>
           <div className="space-y-2">
             {departmentSummary.map((dept) => (
               <div key={dept.name} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium">{dept.name}</p>
                   <p className="text-xs text-muted-foreground">{dept.actual}/{dept.required} workers</p>
                 </div>
                 <span className={`px-2 py-1 rounded text-xs font-medium ${
                   dept.status === "on-track" ? "bg-green-500/10 text-green-500" :
                   dept.status === "at-risk" ? "bg-amber-500/10 text-amber-500" :
                   "bg-destructive/10 text-destructive"
                 }`}>
                   {dept.status === "on-track" ? "On Track" : dept.status === "at-risk" ? "At Risk" : "Failing"}
                 </span>
               </div>
             ))}
           </div>
         </div>
 
         {/* Issues requiring attention */}
         <div className="col-span-1">
           <h3 className="text-sm font-semibold mb-3">Requires Attention</h3>
           <div className="space-y-2">
             {issues.map((issue, idx) => (
               <div key={idx} className={`border rounded-lg p-3 ${
                 issue.urgent ? "bg-destructive/5 border-destructive/20" : "bg-card border-border"
               }`}>
                 <div className="flex items-start gap-2">
                   <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${
                     issue.urgent ? "text-destructive" : "text-amber-500"
                   }`} />
                   <p className="text-sm">{issue.text}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
 
         {/* Recent clock-ins */}
         <div className="col-span-1">
           <h3 className="text-sm font-semibold mb-3">Recent Clock-ins</h3>
           <div className="space-y-2">
             {filteredWorkers.filter(w => w.clockIn).slice(0, 5).map((worker) => (
               <div key={worker.id} className="bg-card border border-border rounded-lg p-3 flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium">{worker.name}</p>
                   <p className="text-xs text-muted-foreground">{worker.department} • {worker.site}</p>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className={`w-2 h-2 rounded-full ${
                     worker.status === "on-site" ? "bg-green-500" :
                     worker.status === "late" ? "bg-amber-500" :
                     worker.status === "overtime" ? "bg-primary" :
                     "bg-destructive"
                   }`} />
                   <span className="text-xs text-muted-foreground">{worker.clockIn}</span>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default DemoAgencyLiveSnapshot;