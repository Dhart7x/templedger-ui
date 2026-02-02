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
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">The Problem</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            Temporary staffing fails <span className="text-muted-foreground">quietly.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">Every week:</h3>
            <div className="grid grid-cols-2 gap-3">
              {problemItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">Fragmented evidence:</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {fragmentedEvidence.map((item, index) => (
                <div
                  key={index}
                  className="px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-center text-muted-foreground text-xs"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-card border border-border card-glow">
              <p className="text-lg text-foreground font-medium italic">
                "What actually happened, and can we prove it?"
              </p>
              <p className="text-muted-foreground mt-3 text-sm">
                Result: margin leakage, cash delay, workforce attrition, erosion of trust.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
};

export default SlideProblem;
