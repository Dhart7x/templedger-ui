import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import Slide from "../presentation/Slide";

const causes = [
  "Labour users and agencies run different systems",
  "Agencies themselves operate in silos",
  "Execution is validated retrospectively",
];

const SlideIRootCause = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            No Operating System for Labour
          </h2>
        </motion.div>

        <div className="max-w-xl mx-auto mb-10">
          {causes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3 p-4 mb-3 rounded-xl bg-card border border-border"
            >
              <Layers className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <span className="text-sm md:text-base text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-lg font-bold text-foreground"
        >
          There is no enforced chain from work to pay to invoice.
        </motion.p>
      </div>
    </Slide>
  );
};

export default SlideIRootCause;