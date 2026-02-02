import { motion } from "framer-motion";
import { Wallet, Scale, Database, TrendingUp } from "lucide-react";
import Slide from "./Slide";

const adjacentTo = [
  { icon: Wallet, label: "Payments" },
  { icon: Scale, label: "Audit & Compliance" },
  { icon: Database, label: "Financial Data" },
];

const SlideExit = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Exit Profile</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            Infrastructure-Grade
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Adjacent to:</h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {adjacentTo.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border text-center hover:border-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg trust-gradient flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-card to-secondary/30 border border-border"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-accent" />
          </div>
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
            8×–15× ARR
          </div>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Expected exit multiples, with upside as <span className="text-foreground">finance-grade labour integrity infrastructure</span>.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideExit;
