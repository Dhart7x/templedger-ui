 import { motion } from "framer-motion";
 import { Shield, Globe, Presentation, TrendingUp } from "lucide-react";
 import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

   const experiences = [
     {
       id: "website",
       icon: Globe,
       title: "Website",
       path: "/website",
     },
     {
       id: "sales-deck",
       icon: Presentation,
       title: "Sales Deck",
       path: "/sales-deck",
     },
     {
       id: "investor-deck",
       icon: TrendingUp,
       title: "Investor Deck",
       path: "/investor-deck",
     },
   ];
 
   return (
     <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
       {/* Background gradient */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1.2 }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
         />
       </div>
 
       {/* Logo */}
       <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         className="flex items-center gap-3 mb-16 relative z-10"
       >
         <div className="w-10 h-10 rounded-lg trust-gradient flex items-center justify-center">
           <Shield className="w-5 h-5 text-foreground" />
         </div>
         <span className="text-xl font-semibold text-foreground">Temp Ledger</span>
       </motion.div>
 
       {/* Experience Cards */}
       <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative z-10">
         {experiences.map((exp, i) => (
           <motion.button
             key={exp.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
             onClick={() => navigate(exp.path)}
             className="group w-full md:w-48 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-center"
           >
             <div className="w-12 h-12 rounded-lg trust-gradient flex items-center justify-center mb-4 mx-auto group-hover:scale-105 transition-transform">
               <exp.icon className="w-6 h-6 text-foreground" />
             </div>
             <h2 className="text-lg font-semibold text-foreground mb-1">
               {exp.title}
             </h2>
           </motion.button>
         ))}
       </div>
     </div>
  );
};

export default Landing;