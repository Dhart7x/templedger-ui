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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">The Solution</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-3">
            Temp Ledger
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            A single, authoritative execution record — linking eligibility, attendance, approvals, payroll, and billing into one immutable chain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Shield, title: "Immutable Records", desc: "Every transaction timestamped and permanently linked." },
            { icon: Link, title: "Verified Chain", desc: "Audit-grade certainty from hours to invoicing.", accent: true },
            { icon: CheckCircle2, title: "Provable Execution", desc: "Fragmented verification becomes auditable proof." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className={`w-10 h-10 rounded-lg ${item.accent ? 'bg-accent' : 'trust-gradient'} flex items-center justify-center mb-3`}>
                <item.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-base font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-4 gap-3"
        >
          {transformations.map((item, index) => (
            <div key={index} className="text-center p-3 rounded-lg bg-card/50 border border-border">
              <div className="text-xs text-muted-foreground line-through mb-1">{item.from}</div>
              <div className="text-base text-muted-foreground/50">↓</div>
              <div className="text-xs text-primary font-semibold">{item.to}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideSolution;
