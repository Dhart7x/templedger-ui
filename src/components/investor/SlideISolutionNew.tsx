 import { motion } from "framer-motion";
 import { CheckCircle, Shield } from "lucide-react";
 import Slide from "@/components/presentation/Slide";
 
 const SlideISolutionNew = () => {
   const mechanics = [
     "Every worker follows the same verified sequence",
     "Each step must be confirmed before the next proceeds",
     "Issues surface early, not after payroll or billing",
   ];
 
   const outcomes = [
     "Errors are prevented, not reconciled",
     "Visibility is real-time and reliable",
     "Performance becomes measurable by default",
   ];
 
   return (
     <Slide className="md:justify-start md:pt-20">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="max-w-4xl mx-auto w-full"
       >
         <div className="flex items-center justify-center gap-3 mb-3">
           <div className="w-10 h-10 rounded-lg trust-gradient flex items-center justify-center">
             <Shield className="w-5 h-5 text-foreground" />
           </div>
           <h2 className="text-2xl md:text-4xl font-bold text-foreground">Temp Ledger</h2>
         </div>
         <p className="text-primary font-medium text-center mb-10">
           The Operating System for Labour Users
         </p>
 
         <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="text-muted-foreground text-center mb-8 max-w-xl mx-auto"
         >
           Temp Ledger introduces a single shared system between labour users and agencies.
         </motion.p>
 
         <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-3xl mx-auto">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="space-y-3"
           >
             {mechanics.map((item, i) => (
               <div
                 key={i}
                 className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50"
               >
                 <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                 <span className="text-sm text-foreground">{item}</span>
               </div>
             ))}
           </motion.div>
 
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="p-5 rounded-xl bg-primary/5 border border-primary/20"
           >
             <p className="text-xs text-muted-foreground mb-4">
               Because checks happen as work occurs:
             </p>
             <div className="space-y-2">
               {outcomes.map((item, i) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                   <span className="text-sm text-foreground">{item}</span>
                 </div>
               ))}
             </div>
           </motion.div>
         </div>
       </motion.div>
     </Slide>
   );
 };
 
 export default SlideISolutionNew;