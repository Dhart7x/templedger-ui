import { motion } from "framer-motion";
import { Database, Layers, ArrowRightLeft, CheckCircle, AlertCircle } from "lucide-react";
import Slide from "./Slide";

const problemItems = [
  { 
    icon: Database, 
    title: "CRMs store data but don't execute",
    description: "They record information, but don't control what happens next."
  },
  { 
    icon: Layers, 
    title: "Compliance, payroll, and billing operate in silos",
    description: "Each function runs independently, with no enforced coordination."
  },
  { 
    icon: ArrowRightLeft, 
    title: "No enforced sequence from hours to pay to invoice",
    description: "Events happen out of order, or without dependency."
  },
  { 
    icon: CheckCircle, 
    title: "Approvals are disconnected from downstream consequences",
    description: "What gets approved isn't always what gets paid or billed."
  },
  { 
    icon: AlertCircle, 
    title: "Truth is reconstructed after failure",
    description: "By the time someone checks, trust is already lost."
  },
];

const SlideRootCause = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header - Centered at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-8"
        >
          <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">The Problem</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-1 md:mt-2">
            The Root Cause
          </h2>
        </motion.div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-2 md:space-y-3">
            {problemItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.08 }}
                className="flex items-start gap-3 md:gap-4 p-2 md:p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm md:text-base text-foreground font-medium block">{item.title}</span>
                  <span className="text-xs md:text-sm text-muted-foreground hidden md:block">{item.description}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom quote */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-muted-foreground mt-4 md:mt-8 text-xs md:text-lg"
          >
            When execution isn't controlled, everyone argues after the fact.
          </motion.p>
        </div>
      </div>
    </Slide>
  );
};

export default SlideRootCause;
