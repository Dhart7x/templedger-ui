import { motion } from "framer-motion";
import { AlertTriangle, Users, Receipt, Clock, UserMinus, HelpCircle } from "lucide-react";
import Slide from "./Slide";

const problemItems = [
  { icon: HelpCircle, text: "Workers raise pay queries" },
  { icon: AlertTriangle, text: "Clients challenge invoices" },
  { icon: Receipt, text: "Agencies issue credit notes" },
  { icon: Clock, text: "Finance re-verifies data" },
  { icon: UserMinus, text: "Recruiters absorb damage" },
  { icon: Users, text: "Workers disengage & churn" },
];

const SlideProblem = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">The Problem</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            Temporary staffing fails <span className="text-muted-foreground">quietly.</span>
          </h2>
        </motion.div>

        {/* Main content - simplified two column */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Problem list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-foreground">Every week:</h3>
            <div className="space-y-3">
              {problemItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-destructive/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="text-base text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Quote and result */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center h-full"
          >
            <div className="p-8 rounded-2xl bg-card border border-border card-glow">
              <p className="text-xl md:text-2xl text-foreground font-medium italic leading-relaxed">
                "What actually happened, and can we prove it?"
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">The Result</p>
                <div className="flex flex-wrap gap-2">
                  {["Margin leakage", "Cash delay", "Workforce attrition", "Erosion of trust"].map((item, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
};

export default SlideProblem;
