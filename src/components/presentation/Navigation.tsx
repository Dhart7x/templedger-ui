import { motion } from "framer-motion";
import { Shield, ChevronUp } from "lucide-react";

const Navigation = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Fixed header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
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

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-colors group"
      >
        <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </motion.button>
    </>
  );
};

export default Navigation;
