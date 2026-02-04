import { motion } from "framer-motion";
import { Users, MapPin, Clock, Building2 } from "lucide-react";
import Slide from "./Slide";

const benefits = [
  "The platform shows what is happening in real time",
  "Issues surface automatically — no chasing, no reporting",
  "Performance is visible without manual input",
];

const inputs = [
  { icon: Users, text: "Required headcount" },
  { icon: MapPin, text: "Where and when it's needed" },
  { icon: Building2, text: "Which agency should fill it" },
];

const SlideMinimalChange = () => {
  return (
    <Slide className="relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-14 lg:mb-16"
        >
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
            Minimal Change. Maximum Control.
          </h2>
          <p className="text-xs md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Temp Ledger does not ask you to run staffing differently.
          </p>
        </motion.div>

        {/* No change required */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-[10px] md:text-base lg:text-lg text-muted-foreground text-center mb-4 md:mb-12 lg:mb-14"
        >
          It does not replace your workflows, retrain your teams, or require daily system interaction.
        </motion.p>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 lg:gap-20 mb-4 md:mb-14 lg:mb-16">
          {/* Left: For the labour user */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <p className="text-[10px] md:text-sm text-muted-foreground mb-2 md:mb-5">For the labour user:</p>
            <div className="space-y-1.5 md:space-y-5">
              {benefits.map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                  className="flex items-start gap-2 md:gap-3 px-2 md:px-5 py-1.5 md:py-3 rounded-lg bg-primary/5 border border-primary/20"
                >
                  <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-base lg:text-lg text-foreground">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Your only active input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <p className="text-[10px] md:text-sm text-muted-foreground mb-2 md:mb-5">Your only active input is what you already know:</p>
            <div className="space-y-1.5 md:space-y-5">
              {inputs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-2 md:gap-3 px-2 md:px-5 py-1.5 md:py-3 rounded-lg bg-card/50 border border-border/50"
                >
                  <item.icon className="w-3 h-3 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-[11px] md:text-base lg:text-lg text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center space-y-1 md:space-y-3"
        >
          <p className="text-[10px] md:text-base lg:text-lg text-muted-foreground">
            Everything else is enforced, captured, and resolved through the ledger.
          </p>
          <p className="text-xs md:text-lg lg:text-xl font-semibold trust-gradient-text">
            Control without complexity.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideMinimalChange;
