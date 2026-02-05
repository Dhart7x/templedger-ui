 import { motion } from "framer-motion";
 import { AlertTriangle } from "lucide-react";
 import Slide from "@/components/presentation/Slide";
 
 const SlideIProblemNew = () => {
   const symptoms = [
     "Labour users rely on staffing agencies",
     "Agencies and labour users operate in different systems",
     "Information moves via email, phone, and spreadsheets",
     "Critical checks happen late or not at all",
   ];
 
   const results = [
     "Pay queries",
     "Invoice disputes",
     "Compliance risk",
     "Unreliable performance data",
     "High operational overhead",
   ];
 
   return (
     <Slide className="md:justify-start md:pt-24">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="max-w-4xl mx-auto w-full"
       >
         <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8 text-center">
           Contingent labour operations break down at scale.
         </h2>
 
         <div className="space-y-3 mb-8 max-w-xl mx-auto">
           {symptoms.map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 + i * 0.08 }}
               className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50"
             >
               <span className="text-xs text-muted-foreground mt-0.5">{i + 1}</span>
               <span className="text-sm md:text-base text-foreground">{item}</span>
             </motion.div>
           ))}
         </div>
 
         <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="text-sm text-muted-foreground text-center mb-4"
         >
           This results in:
         </motion.p>
 
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.6 }}
           className="flex flex-wrap justify-center gap-2 mb-10 max-w-xl mx-auto"
         >
           {results.map((item, i) => (
             <div
               key={i}
               className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20"
             >
               <AlertTriangle className="w-3 h-3 text-destructive" />
               <span className="text-xs md:text-sm text-foreground">{item}</span>
             </div>
           ))}
         </motion.div>
 
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
           className="text-center space-y-1"
         >
           <p className="text-muted-foreground">This is not a staffing problem.</p>
           <p className="text-lg font-semibold text-foreground">It is a systems problem.</p>
         </motion.div>
       </motion.div>
     </Slide>
   );
 };
 
 export default SlideIProblemNew;