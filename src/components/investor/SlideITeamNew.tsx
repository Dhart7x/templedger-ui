 import { motion } from "framer-motion";
 import { Users } from "lucide-react";
 import Slide from "@/components/presentation/Slide";
 
 const SlideITeamNew = () => {
   return (
     <Slide className="md:justify-center">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="max-w-2xl mx-auto w-full text-center"
       >
         <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
           <Users className="w-7 h-7 text-foreground" />
         </div>
         <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Team</h2>
         <p className="text-muted-foreground">Placeholder</p>
       </motion.div>
     </Slide>
   );
 };
 
 export default SlideITeamNew;