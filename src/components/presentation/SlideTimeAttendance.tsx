import { motion } from "framer-motion";
import { ScanFace, Activity, AlertTriangle, Clock, BarChart3 } from "lucide-react";
import Slide from "./Slide";

const features = [
  { icon: ScanFace, text: "Facial recognition, enforced capture" },
  { icon: Activity, text: "Verified attendance updates worker state in real time and governs execution" },
  { icon: AlertTriangle, text: "Issues are flagged immediately, while they can still be resolved" },
  { icon: Clock, text: "Failures surface before pay or invoicing" },
  { icon: BarChart3, text: "Real-time capture enables objective agency performance reporting" },
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

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 md:mb-10"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Time & Attendance
          </h2>
        </motion.div>

        {/* Features List */}
        <div className="space-y-2 md:space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-2 md:gap-3 p-2 md:p-4 rounded-lg bg-card/50 border border-border/50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 300 }}
                className="w-7 h-7 md:w-9 md:h-9 rounded-full trust-gradient flex items-center justify-center flex-shrink-0"
              >
                <feature.icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-foreground" />
              </motion.div>
              <p className="text-xs md:text-sm text-foreground font-medium leading-relaxed pt-1 md:pt-1.5">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default SlideTimeAttendance;
