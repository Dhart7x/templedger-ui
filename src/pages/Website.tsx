 import { useState } from "react";
 import { motion } from "framer-motion";
 import { ArrowRight, AlertTriangle, CheckCircle, BarChart3, Shield, ArrowLeft } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useNavigate } from "react-router-dom";
 import BookDemoModal from "@/components/website/BookDemoModal";
 
 const Website = () => {
   const navigate = useNavigate();
   const [demoModalOpen, setDemoModalOpen] = useState(false);
 
   const fadeInUp = {
     initial: { opacity: 0, y: 40 },
     whileInView: { opacity: 1, y: 0 },
     viewport: { once: true, margin: "-100px" },
     transition: { duration: 0.8 },
   };
 
   const staggerChildren = {
     initial: { opacity: 0 },
     whileInView: { opacity: 1 },
     viewport: { once: true },
     transition: { staggerChildren: 0.1 },
   };
 
   const staggerItem = {
     initial: { opacity: 0, y: 20 },
     whileInView: { opacity: 1, y: 0 },
     viewport: { once: true },
     transition: { duration: 0.5 },
   };
 
   return (
     <div className="min-h-screen bg-background">
       {/* Back button */}
       <motion.button
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.3 }}
         onClick={() => navigate("/")}
         className="fixed top-6 left-6 z-50 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
       >
         <ArrowLeft className="w-4 h-4" />
         Back
       </motion.button>
 
       {/* SECTION 1 — HERO */}
       <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden">
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1.2 }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
           />
         </div>
 
         <div className="max-w-3xl mx-auto text-center relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <div className="flex items-center justify-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-lg trust-gradient flex items-center justify-center">
                 <Shield className="w-5 h-5 text-foreground" />
               </div>
               <span className="text-xl font-semibold text-foreground">Temp Ledger</span>
             </div>
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
               The Operating System for Labour Users
             </h1>
             <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
             >
               Staffing breaks down when labour users and agencies operate in different systems.
             </motion.p>
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
             >
               <Button size="lg" className="gap-2" onClick={() => setDemoModalOpen(true)}>
                 Book Demo <ArrowRight className="w-4 h-4" />
               </Button>
             </motion.div>
           </motion.div>
         </div>
       </section>
 
       {/* SECTION 2 — THE PROBLEM: FRAGMENTED SYSTEMS */}
       <section className="min-h-screen flex flex-col justify-center px-6 py-24 border-t border-border/30">
         <div className="max-w-3xl mx-auto">
           <motion.h2
             {...fadeInUp}
             className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
           >
             Fragmented Systems Create Risk
           </motion.h2>
 
           <motion.div {...fadeInUp} className="space-y-4 mb-12">
             {[
               "Labour users and agencies use different systems",
               "Information moves through email, phone, and spreadsheets",
               "Critical checks happen late or inconsistently",
             ].map((item, i) => (
               <p key={i} className="text-muted-foreground text-center">
                 {item}
               </p>
             ))}
           </motion.div>
 
           <motion.p {...fadeInUp} className="text-sm text-muted-foreground text-center mb-6">
             This leads to:
           </motion.p>
 
           <motion.div {...staggerChildren} className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-12">
             {["Pay queries", "Invoice disputes", "Compliance issues", "Unreliable performance data"].map(
               (item, i) => (
                 <motion.div
                   key={i}
                   {...staggerItem}
                   transition={{ delay: i * 0.1 }}
                   className="flex items-center gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                 >
                   <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                   <span className="text-sm text-foreground">{item}</span>
                 </motion.div>
               )
             )}
           </motion.div>
 
           <motion.p {...fadeInUp} className="text-center text-foreground font-medium">
             When systems don't align, issues surface too late.
           </motion.p>
         </div>
       </section>
 
       {/* SECTION 3 — WHAT TEMP LEDGER IS */}
       <section className="min-h-screen flex flex-col justify-center px-6 py-24 bg-card/30 border-t border-border/30">
         <div className="max-w-3xl mx-auto">
           <motion.h2
             {...fadeInUp}
             className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
           >
             What Temp Ledger Is
           </motion.h2>
 
           <motion.p {...fadeInUp} className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
             Temp Ledger provides a single shared system where labour users and agencies operate
             against the same verified steps.
           </motion.p>
 
           <motion.div {...staggerChildren} className="space-y-3 max-w-md mx-auto mb-12">
             {[
               "Worker status is checked continuously",
               "Dependencies between steps are enforced",
               "Problems surface early, not at the end",
             ].map((item, i) => (
               <motion.div
                 key={i}
                 {...staggerItem}
                 transition={{ delay: i * 0.1 }}
                 className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card/50"
               >
                 <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                 <span className="text-foreground">{item}</span>
               </motion.div>
             ))}
           </motion.div>
 
           <motion.p {...fadeInUp} className="text-center text-foreground font-medium">
             Shared checks create real-time, reliable visibility.
           </motion.p>
         </div>
       </section>
 
       {/* SECTION 4 — HOW IT WORKS */}
       <section className="min-h-screen flex flex-col justify-center px-6 py-24 border-t border-border/30">
         <div className="max-w-4xl mx-auto">
           <motion.h2
             {...fadeInUp}
             className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center"
           >
             How It Works
           </motion.h2>
 
           <div className="grid md:grid-cols-2 gap-8 md:gap-12">
             {/* Process */}
             <motion.div {...fadeInUp} className="space-y-6">
               <h3 className="text-lg font-semibold text-primary mb-4">Process</h3>
               <div className="space-y-3">
                 {[
                   "Agencies use a client-specific interface",
                   "Time & Attendance is captured on site",
                   "Data feeds into a shared system",
                 ].map((item, i) => (
                   <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border">
                     <span className="text-xs text-muted-foreground mt-0.5">{i + 1}</span>
                     <span className="text-sm text-foreground">{item}</span>
                   </div>
                 ))}
               </div>
             </motion.div>
 
             {/* Outcome */}
             <motion.div {...fadeInUp} className="space-y-6">
               <h3 className="text-lg font-semibold text-primary mb-4">Outcome for Labour Users</h3>
               <div className="space-y-3">
                 {[
                   "One real-time view across agencies",
                   "Early visibility into issues",
                   "Confidence in payroll and invoicing",
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                     <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                     <span className="text-sm text-foreground">{item}</span>
                   </div>
                 ))}
               </div>
             </motion.div>
           </div>
         </div>
       </section>
 
       {/* SECTION 5 — AGENCY PERFORMANCE VISIBILITY */}
       <section className="min-h-screen flex flex-col justify-center px-6 py-24 bg-card/30 border-t border-border/30">
         <div className="max-w-3xl mx-auto">
           <motion.div {...fadeInUp} className="text-center mb-12">
             <div className="w-14 h-14 rounded-xl trust-gradient flex items-center justify-center mx-auto mb-6">
               <BarChart3 className="w-7 h-7 text-foreground" />
             </div>
             <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
               Agency Performance, Clearly Measured
             </h2>
             <p className="text-muted-foreground max-w-xl mx-auto">
               When agencies and labour users operate in the same system, performance becomes
               visible — not self-reported.
             </p>
           </motion.div>
 
           <motion.p {...fadeInUp} className="text-sm text-muted-foreground text-center mb-6">
             What is available:
           </motion.p>
 
           <motion.div {...staggerChildren} className="space-y-3 max-w-md mx-auto mb-12">
             {[
               "Real-time visibility into fulfilment, attendance, and responsiveness",
               "Retrospective views by week, department, and agency",
               "Metrics derived from actual activity",
             ].map((item, i) => (
               <motion.div
                 key={i}
                 {...staggerItem}
                 transition={{ delay: i * 0.1 }}
                 className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
               >
                 <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                 <span className="text-sm text-foreground">{item}</span>
               </motion.div>
             ))}
           </motion.div>
 
           <motion.p {...fadeInUp} className="text-center text-foreground font-medium">
             Performance reflects what happened.
           </motion.p>
         </div>
       </section>
 
       {/* SECTION 6 — MINIMAL EFFORT FOR LABOUR USERS */}
       <section className="min-h-screen flex flex-col justify-center px-6 py-24 border-t border-border/30">
         <div className="max-w-3xl mx-auto text-center">
           <motion.h2
             {...fadeInUp}
             className="text-3xl md:text-4xl font-bold text-foreground mb-8"
           >
             Minimal Change Required
           </motion.h2>
 
           <motion.div {...fadeInUp} className="space-y-2 mb-12">
             <p className="text-muted-foreground">No daily system management</p>
             <p className="text-muted-foreground">No reporting or chasing</p>
           </motion.div>
 
           <motion.p {...fadeInUp} className="text-sm text-muted-foreground mb-6">
             Labour users only:
           </motion.p>
 
           <motion.div {...staggerChildren} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
             {["Set headcount needs", "Choose agencies"].map((item, i) => (
               <motion.div
                 key={i}
                 {...staggerItem}
                 transition={{ delay: i * 0.1 }}
                 className="px-6 py-4 rounded-xl bg-primary/5 border border-primary/20"
               >
                 <span className="text-foreground font-medium">{item}</span>
               </motion.div>
             ))}
           </motion.div>
 
           <motion.p {...fadeInUp} className="text-foreground font-medium">
             Everything else is handled automatically.
           </motion.p>
         </div>
       </section>
 
       {/* SECTION 7 — CLOSE */}
       <section className="min-h-screen flex flex-col justify-center px-6 py-24 bg-card/30 border-t border-border/30">
         <div className="max-w-3xl mx-auto text-center">
           <motion.h2
             {...fadeInUp}
             className="text-3xl md:text-4xl font-bold text-foreground mb-6"
           >
             Confidence Instead of Guesswork
           </motion.h2>
 
           <motion.p {...fadeInUp} className="text-muted-foreground mb-12 max-w-xl mx-auto">
             Temp Ledger replaces fragmented systems with shared visibility and control.
           </motion.p>
 
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
           >
             <Button size="lg" className="gap-2" onClick={() => setDemoModalOpen(true)}>
               Book Demo <ArrowRight className="w-4 h-4" />
             </Button>
           </motion.div>
         </div>
       </section>
 
       {/* Book Demo Modal */}
       <BookDemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
     </div>
   );
 };
 
 export default Website;