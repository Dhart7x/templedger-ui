import { motion } from "framer-motion";
import { UserCheck, FileCheck, FileSignature, CreditCard, Calendar, Clock, UserCircle, Calculator, CheckCircle, Wallet, Percent, FileText, ChevronRight } from "lucide-react";
import Slide from "./Slide";

const chainSteps = [
  { icon: UserCheck, title: "Candidate registered" },
  { icon: FileCheck, title: "Right to work verified" },
  { icon: FileSignature, title: "Contract accepted" },
  { icon: CreditCard, title: "Bank details validated" },
  { icon: Calendar, title: "Shift scheduled" },
  { icon: Clock, title: "Clock-in/out recorded" },
  { icon: UserCircle, title: "Manager approval" },
  { icon: Calculator, title: "Overtime validated" },
  { icon: CheckCircle, title: "Payroll approved" },
  { icon: Wallet, title: "Pay executed" },
  { icon: Percent, title: "Charge rate applied" },
  { icon: FileText, title: "Invoice with provenance" },
];

const SlideChain = () => {
  return (
    <Slide className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header - Centered at top */}
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
            Each step executed, attributed, and immutably linked.
          </p>
        </motion.div>

        {/* Flowing timeline - Two rows */}
        <div className="relative space-y-4">
          {/* Row 1: Steps 1-6 */}
          <div className="flex items-center justify-center">
            {chainSteps.slice(0, 6).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="flex items-center"
              >
                {/* Step Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="relative flex flex-col items-center group"
                >
                  {/* Glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.15,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-1 rounded-xl bg-primary/20 blur-md"
                  />
                  
                  {/* Icon container */}
                  <motion.div
                    className="relative w-11 h-11 rounded-xl trust-gradient flex items-center justify-center shadow-lg shadow-primary/20 z-10"
                  >
                    <item.icon className="w-5 h-5 text-foreground" />
                  </motion.div>

                  {/* Title */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="mt-2 text-[10px] font-medium text-center text-foreground leading-tight max-w-[70px]"
                  >
                    {item.title}
                  </motion.p>
                </motion.div>

                {/* Arrow connector */}
                {index < 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="mx-1 flex items-center"
                  >
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>


          {/* Row 2: Steps 7-12 */}
          <div className="flex items-center justify-center">
            {chainSteps.slice(6, 12).map((item, index) => (
              <motion.div
                key={index + 6}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="flex items-center"
              >
                {/* Step Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="relative flex flex-col items-center group"
                >
                  {/* Glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: (index + 6) * 0.15,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-1 rounded-xl bg-primary/20 blur-md"
                  />
                  
                  {/* Icon container */}
                  <motion.div
                    className="relative w-11 h-11 rounded-xl trust-gradient flex items-center justify-center shadow-lg shadow-primary/20 z-10"
                  >
                    <item.icon className="w-5 h-5 text-foreground" />
                  </motion.div>

                  {/* Title */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 + 0.3 }}
                    className="mt-2 text-[10px] font-medium text-center text-foreground leading-tight max-w-[70px]"
                  >
                    {item.title}
                  </motion.p>
                </motion.div>

                {/* Arrow connector */}
                {index < 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 + 0.2 }}
                    className="mx-1 flex items-center"
                  >
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-card border border-border">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-accent" 
            />
            <span className="text-sm text-foreground font-medium">One immutable chain of truth</span>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="w-2 h-2 rounded-full bg-primary" 
            />
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideChain;
