import { motion } from "framer-motion";
import { AlertTriangle, Users, Receipt, Clock, UserMinus, HelpCircle } from "lucide-react";

const problemItems = [
  { icon: HelpCircle, text: "Workers raise pay queries" },
  { icon: AlertTriangle, text: "Clients challenge invoices" },
  { icon: Receipt, text: "Agencies issue credit notes to move on" },
  { icon: Clock, text: "Finance teams spend hours re-verifying data" },
  { icon: UserMinus, text: "Recruiters absorb reputational damage" },
  { icon: Users, text: "Reliable workers disengage and churn" },
];

const fragmentedEvidence = [
  "Timesheets",
  "Emails",
  "ATS records",
  "Payroll exports",
  "Client approvals",
  "Rate cards",
];

const SlideProblem = () => {
  return (
    <section id="problem" className="slide-section relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">The Problem</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Temporary staffing fails<br />
            <span className="text-muted-foreground">quietly, not catastrophically.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-foreground">Every week, across high-volume temp operations:</h3>
            <div className="space-y-4">
              {problemItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-foreground">Failures emerge from fragmented evidence:</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {fragmentedEvidence.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-center text-muted-foreground text-sm"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-card border border-border card-glow">
              <p className="text-lg text-foreground font-medium italic">
                "What actually happened, and can we prove it?"
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                The result is margin leakage, cash delay, workforce attrition, and erosion of trust with both workers and clients.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SlideProblem;
