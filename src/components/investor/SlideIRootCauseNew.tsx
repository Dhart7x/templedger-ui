 import { motion } from "framer-motion";
 import Slide from "@/components/presentation/Slide";
 
 const SlideIRootCauseNew = () => {
   const issues = [
     "Agencies manage activity inside their own tools",
     "Labour users validate outcomes after the fact",
   ];
 
   const unverified = ["Attendance", "Rates", "Approvals", "Readiness for pay and invoicing"];
 
   return (
     <Slide className="md:justify-start md:pt-24">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="max-w-3xl mx-auto w-full"
       >
         <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-10 text-center">
           There is no shared system governing what actually happened.
         </h2>
 
         <div className="space-y-3 mb-8 max-w-lg mx-auto">
           {issues.map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 + i * 0.1 }}
               className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card/50"
             >
               <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2" />
               <span className="text-sm md:text-base text-foreground">{item}</span>
             </motion.div>
           ))}
         </div>
 
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="max-w-lg mx-auto mb-10"
         >
           <p className="text-sm text-muted-foreground mb-4">
             Key steps are assumed, not verified:
           </p>
           <div className="flex flex-wrap gap-2">
             {unverified.map((item, i) => (
               <motion.span
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5 + i * 0.08 }}
                 className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground"
               >
                 {item}
               </motion.span>
             ))}
           </div>
         </motion.div>
 
         <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="text-center text-foreground font-medium"
         >
           When validation happens late, disputes are inevitable.
         </motion.p>
       </motion.div>
     </Slide>
   );
 };
 
 export default SlideIRootCauseNew;