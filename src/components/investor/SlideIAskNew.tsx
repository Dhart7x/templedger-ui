 import { motion } from "framer-motion";
 import { DollarSign, Rocket, Building, Target } from "lucide-react";
 import Slide from "@/components/presentation/Slide";
 
 const SlideIAskNew = () => {
   const useOfFunds = [
     { icon: Rocket, label: "Product build and hardening" },
     { icon: Building, label: "Initial enterprise deployments" },
     { icon: Target, label: "Go-to-market execution" },
   ];
 
   return (
     <Slide className="md:justify-center">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="max-w-3xl mx-auto w-full text-center"
       >
         <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
           <DollarSign className="w-7 h-7 text-foreground" />
         </div>
 
         <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">The Ask</h2>
         <p className="text-xl md:text-2xl font-semibold text-primary mb-10">
           We are raising $5m Seed.
         </p>
 
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="mb-12"
         >
           <p className="text-sm text-muted-foreground mb-4">Use of funds:</p>
           <div className="flex flex-col sm:flex-row gap-3 justify-center">
             {useOfFunds.map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 + i * 0.1 }}
                 className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border"
               >
                 <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                 <span className="text-sm text-foreground">{item.label}</span>
               </motion.div>
             ))}
           </div>
         </motion.div>
 
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.7 }}
           className="p-6 rounded-xl bg-primary/5 border border-primary/20 max-w-xl mx-auto"
         >
           <p className="text-muted-foreground mb-2">
             TEMPLEDGER is building the control layer contingent labour has always lacked.
           </p>
           <p className="text-foreground font-medium mb-1">This is a systems problem.</p>
           <p className="text-lg font-semibold text-foreground">The solution is inevitable.</p>
         </motion.div>
       </motion.div>
     </Slide>
   );
 };
 
 export default SlideIAskNew;