import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Slide from "./Slide";

const SlideConclusion = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Temp Ledger doesn't optimise staffing.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6"
        >
          <p className="text-base text-muted-foreground leading-relaxed">
            It <span className="text-foreground font-semibold">prevents failure</span> — pay queries, disputes, credit notes, attrition — by making work <span className="text-primary font-semibold">provable at every step</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-xl bg-card border border-border card-glow mb-6"
        >
          <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            In a market where trust erodes quietly, Temp Ledger turns execution into evidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="inline-flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center">
            <Shield className="w-6 h-6 text-foreground" />
          </div>
          <div className="text-left">
            <div className="text-xl font-bold text-foreground">Temp Ledger</div>
            <div className="text-xs text-muted-foreground">Transaction Integrity Platform</div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideConclusion;
