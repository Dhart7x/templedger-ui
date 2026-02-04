import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Slide from "./Slide";

const SlideHero = () => {
  return (
    <Slide className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" 
        />
      </div>

      <div className="flex flex-col items-center justify-center text-center relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl trust-gradient flex items-center justify-center mx-auto shadow-lg">
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-foreground" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
        >
          Temp Ledger
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-2xl text-muted-foreground mb-6"
        >
          The Operating System for Labour Users
        </motion.p>

        {/* Small line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm text-muted-foreground/70"
        >
          Orchestrating labour providers from compliance to invoice.
        </motion.p>
      </div>
    </Slide>
  );
};

export default SlideHero;
