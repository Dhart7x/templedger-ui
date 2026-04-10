import { motion } from "framer-motion";
import Slide from "./Slide";

const SlideConclusion = () => {
  return (
    <Slide className="relative overflow-hidden">

      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Temp Ledger doesn't optimise staffing.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6"
        >
          <p className="text-base text-muted-foreground leading-relaxed">
            It <span className="text-foreground font-semibold">prevents failure</span> — pay queries, disputes, credit notes, attrition — by making work <span className="text-primary font-semibold">provable at every step</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-xl bg-card border border-border mb-6"
        >
          <p className="text-lg md:text-xl font-bold text-primary">
            In a market where trust erodes quietly, Temp Ledger turns execution into evidence.
          </p>
        </motion.div>

      </div>
    </Slide>
  );
};

export default SlideConclusion;
