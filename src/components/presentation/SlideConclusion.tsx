import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";

const SlideConclusion = () => {
  return (
    <section className="slide-section relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Temp Ledger doesn't optimise staffing.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            It <span className="text-foreground font-semibold">prevents failure</span> — pay queries, disputes, credit notes, 
            attrition, and reputational damage — by making work <span className="text-primary font-semibold">provable at every step</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-8 md:p-12 rounded-2xl bg-card border border-border card-glow mb-12"
        >
          <p className="text-2xl md:text-3xl font-bold trust-gradient bg-clip-text text-transparent">
            In a market where trust erodes quietly and expensively, 
            Temp Ledger turns execution into evidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="inline-flex items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center">
            <Shield className="w-8 h-8 text-foreground" />
          </div>
          <div className="text-left">
            <div className="text-3xl font-bold text-foreground">Temp Ledger</div>
            <div className="text-muted-foreground">Transaction Integrity Platform</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SlideConclusion;
