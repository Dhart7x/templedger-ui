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
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Exit Profile</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
            Infrastructure-Grade
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Adjacent to:</h3>
          <div className="grid md:grid-cols-3 gap-3 max-w-lg mx-auto">
            {adjacentTo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                className="p-4 rounded-lg bg-card border border-border text-center hover:border-primary/30 transition-all"
              >
                <div className="w-8 h-8 rounded-md trust-gradient flex items-center justify-center mx-auto mb-2">
                  <item.icon className="w-4 h-4 text-foreground" />
                </div>
                <span className="text-xs font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-xl bg-gradient-to-br from-card to-secondary/30 border border-border"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            8×–15× ARR
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Expected exit multiples, with upside as <span className="text-foreground">finance-grade labour integrity infrastructure</span>.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideExit;
