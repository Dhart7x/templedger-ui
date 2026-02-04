import { motion } from "framer-motion";
import { Zap, X, CheckCircle } from "lucide-react";
import Slide from "../presentation/Slide";

const SlideICompetition = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 rounded-xl trust-gradient flex items-center justify-center mx-auto mb-6">
            <Zap className="w-7 h-7 text-foreground" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Automation Isn't Orchestration
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-xl bg-destructive/5 border border-destructive/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <X className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-foreground">RPA</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Automates broken processes. Makes silos run faster, but doesn't connect them.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-xl bg-primary/5 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Temp Ledger</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Enforces execution. Creates a single source of truth across organisational boundaries.
            </p>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
};

export default SlideICompetition;