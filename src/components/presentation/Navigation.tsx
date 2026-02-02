import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Navigation = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border/50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
            <Shield className="w-4 h-4 text-foreground" />
          </div>
          <span className="font-semibold text-foreground">Temp Ledger</span>
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          Investor Presentation
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;
