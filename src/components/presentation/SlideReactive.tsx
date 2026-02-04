import { motion } from "framer-motion";
import { HelpCircle, CheckCircle } from "lucide-react";
import Slide from "./Slide";

const questions = [
  "Are my temps compliant?",
  "Have they been paid correctly?",
  "Is this invoice accurate?",
  "Are my departments adequately staffed right now?",
];

const outcomes = [
  "No waiting for shift managers to report missing headcount.",
  "No fingers crossed on compliance audits.",
  "No surprise attendance or billing issues.",
  "No self-reported agency performance.",
];

const SlideReactive = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <p className="text-xs md:text-base text-muted-foreground mb-1 md:mb-2">
            Operational uncertainty is not a cost of contingent labour.
          </p>
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold">
            It's a cost of reactive systems.
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-12"
        >
          {/* Left: Questions */}
          <div className="space-y-2 md:space-y-4">
            <p className="text-[10px] md:text-xs text-muted-foreground mb-2 md:mb-4">
              With Temp Ledger, you never have to ask:
            </p>
            {questions.map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                className="flex items-center gap-2 md:gap-3 px-3 py-2 md:py-3 rounded-lg bg-card/50 border border-border/50"
              >
                <HelpCircle className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs md:text-sm text-foreground">{text}</span>
              </motion.div>
            ))}
          </div>

          {/* Right: Outcomes */}
          <div className="space-y-2 md:space-y-4">
            <p className="text-[10px] md:text-xs text-muted-foreground mb-2 md:mb-4">
              Temp Ledger makes execution explicit, enforced, and visible:
            </p>
            {outcomes.map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
                className="flex items-center gap-2 md:gap-3 px-3 py-2 md:py-3 rounded-lg bg-primary/5 border border-primary/20"
              >
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                <span className="text-xs md:text-sm text-foreground">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            What used to be checked after the fact is now known as it happens.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideReactive;