 import { ArrowLeft, MapPin, Phone, Mail, Clock, Star, Car, Train, Bus, CheckCircle, AlertTriangle, XCircle, Calendar, Shield, FileText, User } from "lucide-react";
 import { StandbyWorker } from "./standbyWorkersData";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 
 interface DemoStandbyWorkerDetailProps {
   worker: StandbyWorker;
   onBack: () => void;
 }
 
 const DemoStandbyWorkerDetail = ({ worker, onBack }: DemoStandbyWorkerDetailProps) => {
   const getComplianceIcon = (status: string) => {
     switch (status) {
       case "verified":
       case "signed":
         return <CheckCircle className="w-4 h-4 text-green-500" />;
       case "pending":
         return <AlertTriangle className="w-4 h-4 text-amber-500" />;
       case "expired":
         return <XCircle className="w-4 h-4 text-destructive" />;
       default:
         return null;
     }
   };
 
   const getComplianceBadge = (status: string) => {
     switch (status) {
       case "verified":
       case "signed":
         return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">Verified</Badge>;
       case "pending":
         return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30">Pending</Badge>;
       case "expired":
         return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">Expired</Badge>;
       case "not-required":
         return <Badge variant="outline" className="bg-muted text-muted-foreground">N/A</Badge>;
       default:
         return null;
     }
   };
 
   const transportIcon = {
     car: Car,
     public: Train,
     bicycle: Bus,
     walking: User,
   };
   const TransportIcon = transportIcon[worker.preferences.transportMode];
 
   return (
     <div className="p-4 md:p-6 space-y-4 overflow-auto">
       {/* Header */}
       <div className="flex items-center gap-3">
         <button
           onClick={onBack}
           className="p-2 rounded-lg hover:bg-muted transition-colors"
         >
           <ArrowLeft className="w-4 h-4" />
         </button>
         <div className="flex-1">
           <h1 className="text-lg md:text-xl font-bold text-foreground">{worker.name}</h1>
           <div className="flex items-center gap-2 text-xs text-muted-foreground">
             <span>{worker.id}</span>
             <span>•</span>
             <span className={worker.status === "live" ? "text-green-500" : "text-primary"}>
               {worker.status === "live" ? "Currently Deployed" : "Available"}
             </span>
           </div>
         </div>
         <div className="flex items-center gap-2">
           <Star className="w-4 h-4 text-amber-500" />
           <span className="font-bold text-foreground">{worker.rating}</span>
         </div>
       </div>
 
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {/* Personal Information */}
         <div className="bg-card border border-border rounded-lg p-4 space-y-3">
           <h3 className="font-semibold text-foreground flex items-center gap-2">
             <User className="w-4 h-4 text-primary" />
             Personal Information
           </h3>
           <div className="space-y-2 text-sm">
             <div className="flex items-center gap-2 text-muted-foreground">
               <Mail className="w-4 h-4" />
               <span>{worker.email}</span>
             </div>
             <div className="flex items-center gap-2 text-muted-foreground">
               <Phone className="w-4 h-4" />
               <span>{worker.phone}</span>
             </div>
             <div className="flex items-center gap-2 text-muted-foreground">
               <MapPin className="w-4 h-4" />
               <span>{worker.address}, {worker.postcode}</span>
             </div>
             <div className="pt-2 border-t border-border">
               <p className="text-xs text-muted-foreground">Date of Birth</p>
               <p className="text-foreground">{worker.dateOfBirth}</p>
             </div>
             <div>
               <p className="text-xs text-muted-foreground">National Insurance</p>
               <p className="text-foreground">{worker.nationalInsurance}</p>
             </div>
           </div>
         </div>
 
         {/* Distance & Travel */}
         <div className="bg-card border border-border rounded-lg p-4 space-y-3">
           <h3 className="font-semibold text-foreground flex items-center gap-2">
             <MapPin className="w-4 h-4 text-primary" />
             Distance to Site
           </h3>
           <div className="text-center py-4">
             <div className="text-3xl font-bold text-foreground">{worker.distance.miles} miles</div>
             <p className="text-sm text-muted-foreground">from Alo Clothing - Baltimore, MD</p>
           </div>
           <div className="grid grid-cols-2 gap-3">
             <div className="bg-muted/30 rounded-lg p-3 text-center">
               <Car className="w-5 h-5 text-primary mx-auto mb-1" />
               <div className="text-lg font-bold text-foreground">{worker.distance.carTime}</div>
               <p className="text-xs text-muted-foreground">by car (live traffic)</p>
             </div>
             <div className="bg-muted/30 rounded-lg p-3 text-center">
               <Train className="w-5 h-5 text-primary mx-auto mb-1" />
               <div className="text-lg font-bold text-foreground">{worker.distance.publicTransportTime}</div>
               <p className="text-xs text-muted-foreground">public transport</p>
             </div>
           </div>
           <div className="text-center pt-2 border-t border-border">
             <div className="flex items-center justify-center gap-2 text-sm">
               <TransportIcon className="w-4 h-4 text-muted-foreground" />
               <span className="text-muted-foreground">Prefers:</span>
               <span className="text-foreground capitalize">{worker.preferences.transportMode}</span>
             </div>
           </div>
         </div>
 
         {/* Preferences */}
         <div className="bg-card border border-border rounded-lg p-4 space-y-3">
           <h3 className="font-semibold text-foreground flex items-center gap-2">
             <Clock className="w-4 h-4 text-primary" />
             Shift Preferences
           </h3>
           <div className="space-y-3">
             <div>
               <p className="text-xs text-muted-foreground mb-1">Preferred Shifts</p>
               <div className="flex flex-wrap gap-1">
                 {worker.preferences.preferredShifts.map((shift) => (
                   <Badge key={shift} variant="outline" className="text-xs">{shift}</Badge>
                 ))}
               </div>
             </div>
             <div>
               <p className="text-xs text-muted-foreground mb-1">Available Days</p>
               <div className="flex flex-wrap gap-1">
                 {worker.preferences.availableDays.map((day) => (
                   <Badge key={day} variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">{day}</Badge>
                 ))}
               </div>
             </div>
             <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
               <div>
                 <p className="text-xs text-muted-foreground">Max Hours/Week</p>
                 <p className="text-sm font-medium text-foreground">{worker.preferences.maxHoursPerWeek} hours</p>
               </div>
               <div>
                 <p className="text-xs text-muted-foreground">Notice Period</p>
                 <p className="text-sm font-medium text-foreground">{worker.preferences.noticePeriod}</p>
               </div>
             </div>
           </div>
         </div>
 
         {/* Compliance */}
         <div className="bg-card border border-border rounded-lg p-4 space-y-3">
           <h3 className="font-semibold text-foreground flex items-center gap-2">
             <Shield className="w-4 h-4 text-primary" />
             Compliance Status
           </h3>
           <div className="space-y-2">
             <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
               <div className="flex items-center gap-2">
                 {getComplianceIcon(worker.compliance.rightToWork.status)}
                 <span className="text-sm">Right to Work</span>
               </div>
               <div className="flex items-center gap-2">
                 {getComplianceBadge(worker.compliance.rightToWork.status)}
                 <span className="text-xs text-muted-foreground">Exp: {worker.compliance.rightToWork.expiry}</span>
               </div>
             </div>
             <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
               <div className="flex items-center gap-2">
                 {getComplianceIcon(worker.compliance.healthAndSafety.status)}
                 <span className="text-sm">Health & Safety</span>
               </div>
               <div className="flex items-center gap-2">
                 {getComplianceBadge(worker.compliance.healthAndSafety.status)}
                 <span className="text-xs text-muted-foreground">Exp: {worker.compliance.healthAndSafety.expiry}</span>
               </div>
             </div>
             <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
               <div className="flex items-center gap-2">
                 {getComplianceIcon(worker.compliance.contract.status)}
                 <span className="text-sm">Employment Contract</span>
               </div>
               {getComplianceBadge(worker.compliance.contract.status)}
             </div>
             <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
               <div className="flex items-center gap-2">
                 {worker.compliance.dbs.status !== "not-required" && getComplianceIcon(worker.compliance.dbs.status)}
                 <span className="text-sm">DBS Check</span>
               </div>
               {getComplianceBadge(worker.compliance.dbs.status)}
             </div>
           </div>
         </div>
 
         {/* Experience & Stats */}
         <div className="bg-card border border-border rounded-lg p-4 space-y-3">
           <h3 className="font-semibold text-foreground flex items-center gap-2">
             <FileText className="w-4 h-4 text-primary" />
             Experience & Performance
           </h3>
           <div className="space-y-3">
             <div>
               <p className="text-xs text-muted-foreground mb-1">Department Experience</p>
               <div className="space-y-1">
                 {worker.experience.map((exp) => (
                   <div key={exp.role} className="flex items-center justify-between text-sm">
                     <span className="text-foreground">{exp.role}</span>
                     <span className="text-muted-foreground">{exp.years} {exp.years === 1 ? "year" : "years"}</span>
                   </div>
                 ))}
               </div>
             </div>
             <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
               <div className="text-center p-2 bg-muted/30 rounded">
                 <div className="text-lg font-bold text-foreground">{worker.completedShifts}</div>
                 <p className="text-xs text-muted-foreground">Completed Shifts</p>
               </div>
               <div className="text-center p-2 bg-muted/30 rounded">
                 <div className="text-lg font-bold text-green-500">{worker.punctualityScore}%</div>
                 <p className="text-xs text-muted-foreground">Punctuality</p>
               </div>
             </div>
           </div>
         </div>
 
         {/* Emergency Contact & Bank */}
         <div className="bg-card border border-border rounded-lg p-4 space-y-3">
           <h3 className="font-semibold text-foreground flex items-center gap-2">
             <Phone className="w-4 h-4 text-primary" />
             Emergency & Payment
           </h3>
           <div className="space-y-3">
             <div>
               <p className="text-xs text-muted-foreground mb-1">Emergency Contact</p>
               <p className="text-sm text-foreground">{worker.emergencyContact.name}</p>
               <p className="text-xs text-muted-foreground">{worker.emergencyContact.relationship} • {worker.emergencyContact.phone}</p>
             </div>
             <div className="pt-2 border-t border-border">
               <p className="text-xs text-muted-foreground mb-1">Bank Details</p>
               <p className="text-sm text-foreground">{worker.bankDetails.bankName}</p>
               <p className="text-xs text-muted-foreground">
                 Sort Code: {worker.bankDetails.sortCode} • Account: ****{worker.bankDetails.accountNumber.slice(-4)}
               </p>
             </div>
           </div>
         </div>
       </div>
 
       {/* Actions */}
       <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
         <Button variant="outline" onClick={onBack}>Back to List</Button>
         <Button className="trust-gradient">Deploy to Shift</Button>
       </div>
     </div>
   );
 };
 
 export default DemoStandbyWorkerDetail;