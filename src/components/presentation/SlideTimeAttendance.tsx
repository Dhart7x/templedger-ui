import { motion } from "framer-motion";
import { ScanFace, Clock, ClockArrowDown, AlertTriangle, UserX } from "lucide-react";
import Slide from "./Slide";

const taEnforces = [
  { icon: ScanFace, label: "Scheduled only" },
  { icon: Clock, label: "Clock-in required" },
  { icon: ClockArrowDown, label: "Clock-out required" },
  { icon: AlertTriangle, label: "Overtime flagged" },
  { icon: UserX, label: "No-shows detected" },
];

const SlideTimeAttendance = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Attendance Is the Gate
          </h2>
        </motion.div>

        {/* T&A Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-3xl mx-auto">
            {taEnforces.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-card/50 border border-border/50"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg trust-gradient flex items-center justify-center">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-foreground text-center leading-tight">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg font-bold text-foreground">
            No attendance, no pay. No pay, no invoice.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideTimeAttendance;
