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

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8"
        >
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Contingent Labour Transaction Integrity Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">Temp</span>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Ledger</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl mx-auto mb-8"
        >
          The Transaction Integrity Layer for Contingent Labour
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A system of record for contingent labour execution. Verifiable, immutable proof chain 
          connecting worked hours to payroll and invoicing with audit-grade certainty.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="inline-flex items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll to explore</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideHero;
