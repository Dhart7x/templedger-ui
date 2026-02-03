import { motion } from "framer-motion";
import { ScanFace, Clock, AlertTriangle, Users, UserX, Link, Bell, Shield } from "lucide-react";
import Slide from "./Slide";

const taEnforces = [
  { icon: ScanFace, text: "Only scheduled workers can clock in", detail: "Facial recognition. Unscheduled clock-ins flagged immediately." },
  { icon: Clock, text: "Missed clock-ins/outs detected", detail: "Incomplete attendance cannot silently pass through." },
  { icon: AlertTriangle, text: "Overtime flagged in real time", detail: "Hours beyond schedule surfaced before approval." },
  { icon: Users, text: "Live view of who is on site", detail: "Supervisors see workforce presence as it happens." },
  { icon: UserX, text: "No-shows identified automatically", detail: "Attendance gaps captured, not inferred later." },
];

const platformConnections = [
  "Clock data gates every downstream step",
  "Exceptions flow directly into the platform",
  "T&A visible inside the Temp Ledger UI",
  "Every anomaly creates a traceable event",
];

const exceptionExamples = [
  "Worker clocked in but not scheduled",
  "Missed clock-in or clock-out",
  "Overtime hours exceeded schedule",
  "Right-to-work expired",
  "Worker on site without active contract",
  "Duplicate or conflicting clock events",
];

const SlideTimeAttendance = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2 md:mb-3"
        >
          <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">Time & Attendance</span>
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mt-1">
            The Ground Truth Layer
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          {/* Left: What T&A Enforces */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 md:mb-2">
              Real-Time Enforcement
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2">
              {taEnforces.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="p-1.5 md:p-2 rounded-lg bg-card/50 border border-border/50"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded trust-gradient flex items-center justify-center">
                      <item.icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-foreground" />
                    </div>
                    <span className="text-[9px] md:text-[11px] font-medium text-foreground leading-tight">
                      {item.text}
                    </span>
                  </div>
                  <p className="text-[8px] md:text-[10px] text-muted-foreground leading-tight pl-5 md:pl-6">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Platform Connections */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-2 md:mt-3"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Link className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                <span className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Feeds Execution Control
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 md:gap-1.5">
                {platformConnections.map((point, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-[9px] md:text-[11px] text-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Admin Exception Queue */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1"
          >
            <div className="p-2 md:p-3 rounded-lg bg-primary/10 border border-primary/30 h-full">
              <div className="flex items-center gap-1.5 mb-1.5 md:mb-2">
                <Bell className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                <span className="text-[10px] md:text-xs font-bold text-foreground uppercase tracking-wider">
                  Admin Exception Queue
                </span>
              </div>
              <div className="space-y-1 md:space-y-1.5">
                {exceptionExamples.map((example, index) => (
                  <div key={index} className="flex items-start gap-1.5 text-[8px] md:text-[10px] text-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary mt-1 flex-shrink-0" />
                    <span>{example}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-1.5 border-t border-primary/20">
                <p className="text-[7px] md:text-[9px] text-muted-foreground leading-tight">
                  Each shows what triggered it, when it occurred, and where it must be resolved.
                </p>
                <div className="flex items-start gap-1.5 mt-1 text-[8px] md:text-[10px] text-foreground">
                  <Shield className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary mt-0.5 flex-shrink-0" />
                  <span>Exceptions assigned to correct team with named ownership</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-2 md:mt-4"
        >
          <p className="text-xs md:text-base font-semibold text-foreground">
            If attendance isn't right, nothing else moves forward.
          </p>
          <p className="text-[10px] md:text-sm text-muted-foreground mt-0.5">
            That's how execution stays controlled — not corrected later.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideTimeAttendance;
