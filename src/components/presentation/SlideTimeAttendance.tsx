import { motion } from "framer-motion";
import { ScanFace, Clock, ClockArrowDown, AlertTriangle, Users, UserX, AlertCircle } from "lucide-react";
import Slide from "./Slide";

const taEnforces = [
  { icon: ScanFace, label: "Scheduled only" },
  { icon: Clock, label: "Clock-in required" },
  { icon: ClockArrowDown, label: "Clock-out required" },
  { icon: AlertTriangle, label: "Overtime flagged" },
  { icon: Users, label: "Live on-site view" },
  { icon: UserX, label: "No-shows detected" },
];

const exceptions = [
  "Unscheduled clock-in",
  "Missed clock-in / out",
  "Overtime exceeded",
  "Right-to-work expired",
  "No active contract",
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
          className="text-center mb-4 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Time & Attendance: Ground Truth
          </h2>
        </motion.div>

        {/* Top Row - What T&A Enforces */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 md:mb-10"
        >
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
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

        {/* Bottom Row - Exceptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-center mb-3 md:mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
              <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-destructive" />
              <span className="text-xs md:text-sm font-semibold text-foreground">
                Exceptions Are Created Automatically
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto">
            {exceptions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                className="px-3 py-2 md:px-4 md:py-2.5 rounded-lg bg-card border border-border/50"
              >
                <span className="text-[10px] md:text-xs font-medium text-foreground">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center text-[10px] md:text-sm text-muted-foreground mt-6 md:mt-10"
        >
          Facial recognition · Real-time enforcement · No silent pass-throughs
        </motion.p>
      </div>
    </Slide>
  );
};

export default SlideTimeAttendance;
