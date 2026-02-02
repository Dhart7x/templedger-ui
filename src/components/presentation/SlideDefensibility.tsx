import { motion } from "framer-motion";
import { Shield, Lock, TrendingUp } from "lucide-react";

const SlideDefensibility = () => {
  return (
    <section className="slide-section relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Defensibility</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            The Moat
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="p-8 md:p-12 rounded-2xl bg-card border border-border card-glow text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl trust-gradient mb-8">
              <Lock className="w-10 h-10 text-foreground" />
            </div>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-4">
              The moat is <span className="line-through text-muted-foreground">not UI, workflow, or adoption claims</span>.
            </p>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              The moat is owning the canonical, auditable execution record of contingent labour.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-6 rounded-xl bg-secondary/30 border border-border text-center"
        >
          <p className="text-muted-foreground">
            Once payroll, billing, dispute resolution, and reputation depend on Temp Ledger's proof chain, 
            <span className="text-foreground font-medium"> replacement becomes operationally prohibitive</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SlideDefensibility;
