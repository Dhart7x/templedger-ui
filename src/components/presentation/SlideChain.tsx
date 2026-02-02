import { motion } from "framer-motion";
import { UserCheck, FileCheck, FileSignature, CreditCard, Calendar, Clock, UserCircle, Calculator, CheckCircle, Wallet, Percent, FileText } from "lucide-react";
import Slide from "./Slide";

const chainSteps = [
  { icon: UserCheck, step: 1, title: "Candidate registered" },
  { icon: FileCheck, step: 2, title: "Right to work verified" },
  { icon: FileSignature, step: 3, title: "Contract accepted" },
  { icon: CreditCard, step: 4, title: "Bank details validated" },
  { icon: Calendar, step: 5, title: "Shift scheduled" },
  { icon: Clock, step: 6, title: "Clock-in/out recorded" },
  { icon: UserCircle, step: 7, title: "Manager approval" },
  { icon: Calculator, step: 8, title: "Overtime validated" },
  { icon: CheckCircle, step: 9, title: "Payroll approved" },
  { icon: Wallet, step: 10, title: "Pay executed" },
  { icon: Percent, step: 11, title: "Charge rate applied" },
  { icon: FileText, step: 12, title: "Invoice with provenance" },
];

const SlideChain = () => {
  return (
    <Slide className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">The Process</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-3">
            Verified Chain of Events
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Each step timestamped, attributed, immutably linked — shift to invoice.
          </p>
        </motion.div>

        {/* Flowing timeline */}
        <div className="relative">
          {/* Connection line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-primary via-accent to-primary origin-left hidden md:block"
            style={{ transform: "translateY(-50%)" }}
          />

          <div className="grid grid-cols-6 gap-x-2 gap-y-6">
            {chainSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative flex flex-col items-center group"
              >
                {/* Pulse ring animation */}
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                  className="absolute w-14 h-14 rounded-full bg-primary/20"
                />
                
                {/* Icon container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-12 h-12 rounded-xl trust-gradient flex items-center justify-center shadow-lg shadow-primary/20 z-10"
                >
                  <item.icon className="w-5 h-5 text-foreground" />
                </motion.div>

                {/* Step number */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="mt-3 w-6 h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-primary">{item.step}</span>
                </motion.div>

                {/* Title */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="mt-2 text-xs font-medium text-center text-foreground leading-tight max-w-[90px]"
                >
                  {item.title}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-foreground font-medium">One immutable chain of truth</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideChain;
