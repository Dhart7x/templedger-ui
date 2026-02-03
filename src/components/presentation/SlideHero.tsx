import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import Slide from "./Slide";

const SlideHero = () => {
  return (
    <Slide className="relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6"
        >
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Post-Hire Orchestration for Temp Staffing</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="text-foreground">Temp</span>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Ledger</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-6"
        >
          The Transaction Integrity Layer for Contingent Labour
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-muted-foreground/80 max-w-xl mx-auto leading-relaxed"
        >
          A system of record for contingent labour execution. Verifiable, immutable proof chain 
          connecting worked hours to payroll and invoicing with audit-grade certainty.
        </motion.p>
      </div>
    </Slide>
  );
};

export default SlideHero;
