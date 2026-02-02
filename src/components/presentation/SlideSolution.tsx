import { motion } from "framer-motion";
import { Shield, Link, CheckCircle2 } from "lucide-react";
import Slide from "./Slide";

const transformations = [
  { from: "Pay queries", to: "Resolvable facts" },
  { from: "Invoice disputes", to: "Auditable records" },
  { from: "Credit notes", to: "Preventable events" },
  { from: "Uncertainty", to: "Confidence-driven" },
];

const SlideSolution = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">The Solution</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Temp Ledger
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A single, authoritative execution record — linking eligibility, attendance, approvals, payroll, and billing into one immutable chain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Immutable Records</h3>
            <p className="text-sm text-muted-foreground">Every transaction timestamped and permanently linked.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
              <Link className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Chain</h3>
            <p className="text-sm text-muted-foreground">Audit-grade certainty from hours to invoicing.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Provable Execution</h3>
            <p className="text-sm text-muted-foreground">Fragmented verification becomes auditable proof.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-4 gap-4"
        >
          {transformations.map((item, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-card/50 border border-border">
              <div className="text-sm text-muted-foreground line-through mb-1">{item.from}</div>
              <div className="text-lg text-muted-foreground/50">↓</div>
              <div className="text-sm text-primary font-semibold">{item.to}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideSolution;
