import { motion } from "framer-motion";
import { HelpCircle, ShieldCheck, DollarSign, FileCheck, Users, CheckCircle, XCircle } from "lucide-react";
import Slide from "./Slide";

const questions = [
  { icon: ShieldCheck, text: "Are my temps compliant?" },
  { icon: DollarSign, text: "Have they been paid correctly?" },
  { icon: FileCheck, text: "Is this invoice accurate?" },
  { icon: Users, text: "Are my departments adequately staffed right now?" },
];

const noMores = [
  "No waiting for shift managers to report missing headcount.",
  "No fingers crossed on compliance audits.",
  "No surprise attendance or billing issues.",
  "No self-reported agency performance.",
];

const SlideReactive = () => {
  return (
    <Slide className="relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <p className="text-sm md:text-base text-muted-foreground mb-2">
            Operational uncertainty is not a cost of contingent labour.
          </p>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            It's a cost of reactive systems.
          </h2>
        </motion.div>

        {/* Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <p className="text-xs md:text-sm text-muted-foreground text-center mb-4">
            With Temp Ledger, you never have to ask:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            {questions.map((q, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-lg bg-card/50 border border-border/50"
              >
                <HelpCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs md:text-sm text-foreground">{q.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Explanation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xs md:text-sm text-muted-foreground text-center mb-4 md:mb-6"
        >
          Those questions only exist in reactive systems.<br />
          Temp Ledger makes execution explicit, enforced, and visible in real time.
        </motion.p>

        {/* No Mores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8"
        >
          {noMores.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.08, duration: 0.3 }}
              className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-destructive/10 border border-destructive/20"
            >
              <XCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-destructive flex-shrink-0" />
              <span className="text-[10px] md:text-xs text-foreground">{text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-primary/10 border border-primary/30">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
            <p className="text-xs md:text-sm font-medium text-foreground">
              What used to be checked after the fact is now known as it happens.
            </p>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideReactive;