import { motion } from "framer-motion";
import { Clock, CheckCircle } from "lucide-react";
import Slide from "../presentation/Slide";

const ensures = [
  "Hours are real",
  "Exceptions surface immediately",
  "Downstream systems can trust the data",
];

const SlideITimeAttendance = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
            <Clock className="w-7 h-7 text-foreground" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Ground Truth at the Source
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground mb-8"
        >
          Controlled attendance capture ensures:
        </motion.p>

        <div className="max-w-md mx-auto mb-10">
          {ensures.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 p-4 mb-3 rounded-xl bg-card border border-border"
            >
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-lg font-bold text-foreground"
        >
          This is what makes the ledger defensible.
        </motion.p>
      </div>
    </Slide>
  );
};

export default SlideITimeAttendance;