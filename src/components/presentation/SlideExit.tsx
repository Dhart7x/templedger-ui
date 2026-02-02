import { motion } from "framer-motion";
import { Wallet, Scale, Database, TrendingUp } from "lucide-react";

const adjacentTo = [
  { icon: Wallet, label: "Payments" },
  { icon: Scale, label: "Audit & Compliance" },
  { icon: Database, label: "Financial Data & Risk Systems" },
];

const SlideExit = () => {
  return (
    <section className="slide-section relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Exit Profile</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Infrastructure-Grade Positioning
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold mb-6 text-center text-muted-foreground">Adjacent to:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {adjacentTo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border text-center hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg trust-gradient flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-foreground" />
                </div>
                <span className="font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-card to-secondary/30 border border-border text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-accent" />
          </div>
          <div className="text-5xl md:text-6xl font-bold trust-gradient bg-clip-text text-transparent mb-4">
            8×–15× ARR
          </div>
          <p className="text-muted-foreground text-lg">
            Expected exit multiples, with upside if positioned as <span className="text-foreground">finance-grade labour integrity infrastructure</span> rather than staffing tech.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SlideExit;
