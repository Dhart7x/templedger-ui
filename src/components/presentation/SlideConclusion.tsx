import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Slide from "./Slide";

const SlideConclusion = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Temp Ledger doesn't optimise staffing.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            It <span className="text-foreground font-semibold">prevents failure</span> — pay queries, disputes, credit notes, attrition — by making work <span className="text-primary font-semibold">provable at every step</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-2xl bg-card border border-border card-glow mb-8"
        >
          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            In a market where trust erodes quietly, Temp Ledger turns execution into evidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="inline-flex items-center gap-3"
        >
          <div className="w-14 h-14 rounded-2xl trust-gradient flex items-center justify-center">
            <Shield className="w-7 h-7 text-foreground" />
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-foreground">Temp Ledger</div>
            <div className="text-sm text-muted-foreground">Transaction Integrity Platform</div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideConclusion;
