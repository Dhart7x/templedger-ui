 import { motion } from "framer-motion";
 import { Shield, ArrowLeft } from "lucide-react";
 import { useNavigate } from "react-router-dom";
 
 const InvestorDeckPlaceholder = () => {
   const navigate = useNavigate();
 
   return (
     <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
       {/* Background gradient */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
       </div>
 
       {/* Back button */}
       <motion.button
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.3 }}
         onClick={() => navigate("/")}
         className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
       >
         <ArrowLeft className="w-4 h-4" />
         Back
       </motion.button>
 
       {/* Content */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         className="text-center relative z-10"
       >
         <div className="w-12 h-12 rounded-lg trust-gradient flex items-center justify-center mb-6 mx-auto">
           <Shield className="w-6 h-6 text-foreground" />
         </div>
         <p className="text-lg text-muted-foreground">
           Investor materials coming soon
         </p>
       </motion.div>
     </div>
   );
 };
 
 export default InvestorDeckPlaceholder;