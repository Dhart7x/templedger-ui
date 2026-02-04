import { motion } from "framer-motion";
import { ScanFace, Clock, AlertTriangle, UserX } from "lucide-react";
import Slide from "./Slide";

const rules = [
  { icon: ScanFace, text: "Only scheduled workers can clock in" },
  { icon: Clock, text: "Clock-in and clock-out required" },
  { icon: AlertTriangle, text: "Overtime flagged in real time" },
  { icon: UserX, text: "Lateness and no-shows detected immediately" },
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
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
            Time & Attendance
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Temp Ledger runs its own T&A (including facial recognition hardware), because control of the capture point is essential.
          </p>
        </motion.div>

        {/* Rules */}
        <div className="max-w-2xl mx-auto mb-6 md:mb-10">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xs md:text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide text-center"
          >
            Enforcement Rules
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {rules.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-card border border-border"
              >
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0"
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                </motion.div>
                <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            No attendance → no approval → no pay or invoice.
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
