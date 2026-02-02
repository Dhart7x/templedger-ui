import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Slide from "./Slide";

const SlideDefensibility = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Defensibility</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">The Moat</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 md:p-10 rounded-2xl bg-card border border-border card-glow"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl trust-gradient mb-6">
            <Lock className="w-8 h-8 text-foreground" />
          </div>
          <p className="text-lg text-foreground mb-4">
            The moat is <span className="line-through text-muted-foreground">not UI, workflow, or adoption claims</span>.
          </p>
          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Owning the canonical, auditable execution record of contingent labour.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border"
        >
          <p className="text-sm text-muted-foreground">
            Once payroll, billing, and disputes depend on Temp Ledger's proof chain, <span className="text-foreground font-medium">replacement becomes operationally prohibitive</span>.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideDefensibility;
