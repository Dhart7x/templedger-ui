 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Play, ChevronDown, ArrowLeft, Shield, Eye, EyeOff, Bell, CheckCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";
 import DemoSidebar from "@/components/presentation/demo/DemoSidebar";
 import DemoLiveSnapshot from "@/components/presentation/demo/DemoLiveSnapshot";
 import DemoDepartments from "@/components/presentation/demo/DemoDepartments";
 import DemoAgenciesPerformance from "@/components/presentation/demo/DemoAgenciesPerformance";
 import DemoPayrollBilling from "@/components/presentation/demo/DemoPayrollBilling";
 import DemoHeadcountRequests from "@/components/presentation/demo/DemoHeadcountRequests";
 import DemoExecutionLedger from "@/components/presentation/demo/DemoExecutionLedger";
 import DemoShiftCoverage from "@/components/presentation/demo/DemoShiftCoverage";
 import DemoAgencySidebar from "@/components/presentation/demo/DemoAgencySidebar";
 import DemoAgencyDashboard from "@/components/presentation/demo/DemoAgencyDashboard";
 import DemoAgencyWorkers from "@/components/presentation/demo/DemoAgencyWorkers";
 import DemoAgencyWorkerDetail from "@/components/presentation/demo/DemoAgencyWorkerDetail";
 import DemoAgencyDeployments from "@/components/presentation/demo/DemoAgencyDeployments";
 import DemoAgencyIssues from "@/components/presentation/demo/DemoAgencyIssues";
 import DemoAgencyDocuments from "@/components/presentation/demo/DemoAgencyDocuments";
 import DemoAgencyAllocations from "@/components/presentation/demo/DemoAgencyAllocations";
 import { AgencyWorker } from "@/components/presentation/demo/agencyDemoData";
 import { DemoProvider, useDemoContext } from "@/components/presentation/demo/DemoContext";
 import DemoStandbyWorkers from "@/components/presentation/demo/DemoStandbyWorkers";
 import DemoStandbyWorkerDetail from "@/components/presentation/demo/DemoStandbyWorkerDetail";
 import DemoAgencyLiveSnapshot from "@/components/presentation/demo/DemoAgencyLiveSnapshot";
 import { StandbyWorker } from "@/components/presentation/demo/standbyWorkersData";
 
 type ViewMode = "labour-user" | "agency";
 type DemoState = "intro" | "login" | "demo";
 
 interface SlideIHowItWorksProps {
   onDemoStateChange?: (isInDemo: boolean) => void;
 }
 
 const SlideIHowItWorksContent = ({ onDemoStateChange }: SlideIHowItWorksProps) => {
   const [demoState, setDemoState] = useState<DemoState>("intro");
   const [showPassword, setShowPassword] = useState(false);
   const [viewMode, setViewMode] = useState<ViewMode>("labour-user");
   const [activeLabourView, setActiveLabourView] = useState("snapshot");
   const [activeAgencyView, setActiveAgencyView] = useState("dashboard");
   const [selectedWorker, setSelectedWorker] = useState<AgencyWorker | null>(null);
   const [selectedStandbyWorker, setSelectedStandbyWorker] = useState<StandbyWorker | null>(null);
   const { notifications } = useDemoContext();
 
   const unreadCount = notifications.filter(
     (n) => !n.read && (n.targetView === viewMode || n.targetView === "both")
   ).length;
 
   const handleLaunchDemo = () => {
     setDemoState("login");
     onDemoStateChange?.(true);
   };
 
   const handleEnterDemo = () => {
     setDemoState("demo");
   };
 
   const handleExitDemo = () => {
     setDemoState("intro");
     setActiveLabourView("snapshot");
     setActiveAgencyView("dashboard");
     setSelectedWorker(null);
     setSelectedStandbyWorker(null);
     onDemoStateChange?.(false);
   };
 
   const handleSelectWorker = (worker: AgencyWorker) => {
     setSelectedWorker(worker);
     setActiveAgencyView("worker-detail");
   };
 
   const handleBackToWorkers = () => {
     setSelectedWorker(null);
     setActiveAgencyView("workers");
   };
 
   const handleAgencyViewChange = (view: string) => {
     setActiveAgencyView(view);
     if (view !== "worker-detail") {
       setSelectedWorker(null);
     }
     if (view !== "standby-detail" && view !== "live-detail") {
       setSelectedStandbyWorker(null);
     }
   };
 
   const handleSelectStandbyWorker = (worker: StandbyWorker) => {
     setSelectedStandbyWorker(worker);
     setActiveAgencyView(worker.status === "live" ? "live-detail" : "standby-detail");
   };
 
   const handleBackToStandby = () => {
     const wasLive = selectedStandbyWorker?.status === "live";
     setSelectedStandbyWorker(null);
     setActiveAgencyView(wasLive ? "live-workers" : "standby");
   };
 
   const systemModel = [
     "Labour users mandate Temp Ledger as the shared system",
     "Agencies operate through a client-specific front end",
     "Time & Attendance is captured on site",
     "Activity feeds into a single source of truth",
   ];
 
   const labourUserSees = [
     "Live status by department and location",
     "Early visibility into issues",
     "Payroll and invoicing confidence",
     "Objective agency performance",
   ];
 
   // Intro slide (How It Works)
   if (demoState === "intro") {
     return (
       <div className="w-full h-full flex flex-col items-center justify-start bg-background px-4 md:px-12 pt-20 pb-20 relative overflow-auto">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
 
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="max-w-5xl w-full relative z-10"
         >
           <h2 className="text-xl md:text-3xl font-bold mb-8 text-foreground text-center">
             How It Works
           </h2>
 
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 max-w-4xl mx-auto">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="bg-card/60 border border-border rounded-xl p-5"
             >
               <h3 className="text-sm font-bold text-primary mb-4">System Model</h3>
               <div className="space-y-2">
                 {systemModel.map((step, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                     className="flex items-start gap-3"
                   >
                     <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                       <span className="text-[9px] font-bold text-foreground">{index + 1}</span>
                     </div>
                     <span className="text-sm text-foreground">{step}</span>
                   </motion.div>
                 ))}
               </div>
             </motion.div>
 
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="bg-card/60 border border-border rounded-xl p-5"
             >
               <h3 className="text-sm font-bold text-primary mb-4">What the Labour User Sees</h3>
               <div className="space-y-2">
                 {labourUserSees.map((item, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
                     className="flex items-start gap-3"
                   >
                     <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                     <span className="text-sm text-foreground">{item}</span>
                   </motion.div>
                 ))}
               </div>
             </motion.div>
           </div>
 
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.4, delay: 0.7 }}
             className="flex justify-center"
           >
             <Button
               size="lg"
               onClick={handleLaunchDemo}
               className="text-sm px-6 py-4 rounded-xl bg-primary hover:opacity-90 transition-opacity group"
             >
               <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
               Interactive Demo
             </Button>
           </motion.div>
         </motion.div>
       </div>
     );
   }
 
   // Login screen
   if (demoState === "login") {
     return (
       <div className="w-full h-full flex flex-col bg-background">
         <div className="absolute top-6 left-6 z-30">
           <Button
             variant="outline"
             size="sm"
             onClick={handleExitDemo}
             className="gap-2 bg-card/80 border-border hover:border-primary/50"
           >
             <ArrowLeft className="w-4 h-4" />
             Back to Slides
           </Button>
         </div>
 
         <div className="flex-1 flex items-center justify-center px-4">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="w-full max-w-md"
           >
             <div className="flex flex-col items-center mb-8">
               <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mb-4">
                 <Shield className="w-8 h-8 text-foreground" />
               </div>
               <h1 className="text-2xl font-bold text-foreground">Temp Ledger</h1>
               <p className="text-sm text-muted-foreground mt-1">Demo Environment</p>
             </div>
 
             <div className="bg-card border border-border rounded-xl p-6">
               <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
                 Sign in to Demo
               </h2>
 
               <div className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="username" className="text-foreground">
                     Username
                   </Label>
                   <Input
                     id="username"
                     value="TempLedgerDemo"
                     readOnly
                     className="bg-muted/50 border-border text-foreground"
                   />
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="password" className="text-foreground">
                     Password
                   </Label>
                   <div className="relative">
                     <Input
                       id="password"
                       type={showPassword ? "text" : "password"}
                       value="••••••••••••"
                       readOnly
                       className="bg-muted/50 border-border text-foreground pr-10"
                     />
                     <button
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                     >
                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                     </button>
                   </div>
                 </div>
 
                 <Button
                   onClick={handleEnterDemo}
                   className="w-full mt-6 bg-primary hover:opacity-90 transition-opacity"
                   size="lg"
                 >
                   Enter Demo
                 </Button>
               </div>
             </div>
           </motion.div>
         </div>
       </div>
     );
   }
 
   const renderLabourUserView = () => {
     switch (activeLabourView) {
       case "snapshot":
         return <DemoLiveSnapshot />;
       case "departments":
         return <DemoDepartments />;
       case "coverage":
         return <DemoShiftCoverage />;
       case "agencies":
         return <DemoAgenciesPerformance />;
       case "ledger":
         return <DemoExecutionLedger />;
       case "payroll":
         return <DemoPayrollBilling />;
       case "headcount":
         return <DemoHeadcountRequests />;
       default:
         return <DemoLiveSnapshot />;
     }
   };
 
   const renderAgencyView = () => {
     switch (activeAgencyView) {
       case "dashboard":
         return <DemoAgencyDashboard />;
       case "live-snapshot":
         return <DemoAgencyLiveSnapshot />;
       case "allocations":
         return <DemoAgencyAllocations />;
       case "workers":
         return <DemoAgencyWorkers onSelectWorker={handleSelectWorker} />;
       case "worker-detail":
         return selectedWorker ? (
           <DemoAgencyWorkerDetail worker={selectedWorker} onBack={handleBackToWorkers} />
         ) : (
           <DemoAgencyWorkers onSelectWorker={handleSelectWorker} />
         );
       case "standby":
         return <DemoStandbyWorkers onSelectWorker={handleSelectStandbyWorker} showLive={false} />;
       case "standby-detail":
         return selectedStandbyWorker ? (
           <DemoStandbyWorkerDetail worker={selectedStandbyWorker} onBack={handleBackToStandby} />
         ) : (
           <DemoStandbyWorkers onSelectWorker={handleSelectStandbyWorker} showLive={false} />
         );
       case "live-workers":
         return <DemoStandbyWorkers onSelectWorker={handleSelectStandbyWorker} showLive={true} />;
       case "live-detail":
         return selectedStandbyWorker ? (
           <DemoStandbyWorkerDetail worker={selectedStandbyWorker} onBack={handleBackToStandby} />
         ) : (
           <DemoStandbyWorkers onSelectWorker={handleSelectStandbyWorker} showLive={true} />
         );
       case "deployments":
         return <DemoAgencyDeployments />;
       case "issues":
         return <DemoAgencyIssues />;
       case "documents":
         return <DemoAgencyDocuments />;
       default:
         return <DemoAgencyDashboard />;
     }
   };
 
   // Main demo UI
   return (
     <div className="w-full h-full flex flex-col bg-background">
       <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
         <div className="flex items-center gap-3">
           <Button
             variant="outline"
             size="sm"
             onClick={handleExitDemo}
             className="gap-2 bg-card/80 border-border hover:border-primary/50"
           >
             <ArrowLeft className="w-4 h-4" />
             Back to Slides
           </Button>
 
           {unreadCount > 0 && (
             <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg">
               <Bell className="w-4 h-4 text-primary" />
               <span className="text-xs font-medium text-primary">{unreadCount} new</span>
             </div>
           )}
         </div>
 
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="outline" size="sm" className="gap-2 min-w-[160px]">
               {viewMode === "labour-user" ? "Labour User View" : "Agency View"}
               <ChevronDown className="w-4 h-4" />
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="center" className="bg-card border border-border">
             <DropdownMenuItem
               onClick={() => setViewMode("labour-user")}
               className={viewMode === "labour-user" ? "bg-primary/10 text-primary" : ""}
             >
               Labour User View
             </DropdownMenuItem>
             <DropdownMenuItem
               onClick={() => setViewMode("agency")}
               className={viewMode === "agency" ? "bg-primary/10 text-primary" : ""}
             >
               Agency View
             </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
 
         <div className="w-[140px]" />
       </div>
 
       <motion.div
         key={viewMode}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
         className="flex-1 flex overflow-hidden m-4 rounded-lg border border-border"
       >
         {viewMode === "labour-user" ? (
           <>
             <DemoSidebar activeView={activeLabourView} onViewChange={setActiveLabourView} />
             <div className="flex-1 overflow-auto bg-background">{renderLabourUserView()}</div>
           </>
         ) : (
           <>
             <DemoAgencySidebar activeView={activeAgencyView} onViewChange={handleAgencyViewChange} />
             <div className="flex-1 overflow-auto bg-background">{renderAgencyView()}</div>
           </>
         )}
       </motion.div>
     </div>
   );
 };
 
 const SlideIHowItWorks = ({ onDemoStateChange }: SlideIHowItWorksProps) => {
   return (
     <DemoProvider>
       <SlideIHowItWorksContent onDemoStateChange={onDemoStateChange} />
     </DemoProvider>
   );
 };
 
 export default SlideIHowItWorks;