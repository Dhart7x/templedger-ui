import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Slide from "./Slide";

const SlideDefensibility = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Defensibility</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">The Moat</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 md:p-8 rounded-2xl bg-card border border-border card-glow"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl trust-gradient mb-4">
            <Lock className="w-7 h-7 text-foreground" />
          </div>
          <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Owning the canonical, auditable execution record of contingent labour.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-4 p-3 rounded-lg bg-secondary/30 border border-border"
        >
          <p className="text-xs text-muted-foreground">
            Once payroll, billing, and disputes depend on Temp Ledger's proof chain, <span className="text-foreground font-medium">replacement becomes operationally prohibitive</span>.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideDefensibility;
