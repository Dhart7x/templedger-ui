import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Slide from "../presentation/Slide";

const problems = [
  "Pay disputes",
  "Invoice challenges",
  "Compliance risk",
  "Worker attrition",
  "Subjective agency performance",
];

const SlideIProblem = () => {
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
            Labour Fails Quietly — And Expensively
          </h2>
        </motion.div>

        <div className="max-w-xl mx-auto mb-10">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-destructive/5 border border-destructive/20"
            >
              <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
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
          All discovered after the fact.
        </motion.p>
      </div>
    </Slide>
  );
};

export default SlideIProblem;