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

const fragmentedEvidence = ["Timesheets", "Emails", "ATS records", "Payroll exports", "Client approvals", "Rate cards"];

const SlideProblem = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">The Problem</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
            Temporary staffing fails <span className="text-muted-foreground">quietly.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-base font-semibold mb-4 text-foreground">Every week:</h3>
            <div className="grid grid-cols-2 gap-2">
              {problemItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-card/50 border border-border/50"
                >
                  <div className="w-7 h-7 rounded-md bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-base font-semibold mb-4 text-foreground">Fragmented evidence:</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {fragmentedEvidence.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
                  className="px-2 py-1.5 rounded-md bg-secondary/50 border border-border/50 text-center text-muted-foreground text-xs"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-4 rounded-xl bg-card border border-border card-glow"
            >
              <p className="text-base text-foreground font-medium italic">
                "What actually happened, and can we prove it?"
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Result: margin leakage, cash delay, workforce attrition, erosion of trust.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
};

export default SlideProblem;
