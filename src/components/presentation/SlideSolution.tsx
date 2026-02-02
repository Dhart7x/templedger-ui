import { motion } from "framer-motion";
import { Shield, Link, CheckCircle2 } from "lucide-react";

const transformations = [
  { from: "Pay queries", to: "Resolvable facts" },
  { from: "Invoice disputes", to: "Auditable records" },
  { from: "Credit notes", to: "Preventable events" },
  { from: "Uncertainty", to: "Confidence-driven processes" },
];

const SlideSolution = () => {
  return (
    <section className="slide-section relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">The Solution</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Temp Ledger
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A single, authoritative execution record for contingent labour — linking eligibility, 
            attendance, approvals, payroll, and billing into one immutable chain of facts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl trust-gradient flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Immutable Records</h3>
            <p className="text-muted-foreground">
              Every transaction is timestamped, attributed, and permanently linked to the execution chain.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
              <Link className="w-7 h-7 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Verified Chain</h3>
            <p className="text-muted-foreground">
              Connect worked hours to payroll and invoicing with audit-grade certainty.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl trust-gradient flex items-center justify-center mb-6">
              <CheckCircle2 className="w-7 h-7 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Provable Execution</h3>
            <p className="text-muted-foreground">
              Replaces fragmented verification with defensible, auditable proof.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="p-8 rounded-2xl bg-card/50 border border-border"
        >
          <h3 className="text-xl font-semibold mb-8 text-center">This turns:</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {transformations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-muted-foreground line-through mb-2">{item.from}</div>
                <div className="text-2xl text-muted-foreground/50 mb-2">↓</div>
                <div className="text-primary font-semibold">{item.to}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SlideSolution;
