import { motion } from "framer-motion";
import { Building2, Users, Clock, AlertTriangle, UserX, Eye, CheckCircle } from "lucide-react";
import Slide from "./Slide";

const feedsTo = [
  { icon: Building2, label: "Labour User", text: "Who is on site, now" },
  { icon: Users, label: "Agency", text: "What is approved, at risk, or blocked" },
];

const ledgerEnforces = [
  { icon: CheckCircle, text: "Enforces who can clock in and when" },
  { icon: Clock, text: "Flags lateness, no-shows, and overtime in real time" },
  { icon: AlertTriangle, text: "Surfaces exceptions while they can still be resolved" },
];

const SlideTimeAttendance = () => {
  return (
    <Slide className="relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5 md:mb-6"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
            Time & Attendance
          </h2>
          <p className="text-sm md:text-base text-foreground max-w-2xl mx-auto">
            Temp Ledger operates its own T&A — including on-site capture — so attendance is verified, not assumed.
          </p>
        </motion.div>

        {/* Clock-in feeds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-5 md:mb-6"
        >
          <p className="text-xs md:text-sm text-muted-foreground text-center mb-3">
            Each clock-in updates the worker's live state in the ledger and immediately feeds:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            {feedsTo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex-1 p-3 md:p-4 rounded-xl bg-card border border-border text-center"
              >
                <item.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-primary" />
                <h4 className="text-sm md:text-base font-bold text-foreground mb-1">{item.label}</h4>
                <p className="text-xs md:text-sm text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* As attendance is captured, the ledger: */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto mb-5 md:mb-6"
        >
          <p className="text-xs md:text-sm text-muted-foreground text-center mb-3">
            As attendance is captured, the ledger:
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {ledgerEnforces.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-lg bg-primary/10 border border-primary/30"
              >
                <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                <span className="text-xs md:text-sm text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live operational view */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-4 md:mb-5"
        >
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm text-foreground font-medium">
              This produces a live operational view for both parties — not retrospective reports.
            </span>
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            No verified attendance → no approval → no pay → no invoice.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Hardware is part of enforcement, not a standalone product.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideTimeAttendance;
