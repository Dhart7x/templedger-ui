import { motion } from "framer-motion";
import { UserCheck, FileCheck, FileSignature, CreditCard, Calendar, Clock, UserCircle, Calculator, CheckCircle, Wallet, Percent, FileText, ChevronRight } from "lucide-react";
import Slide from "./Slide";

const chainSteps = [
  { icon: UserCheck, title: "Registered" },
  { icon: FileCheck, title: "Verified" },
  { icon: FileSignature, title: "Contract" },
  { icon: CreditCard, title: "Bank" },
  { icon: Calendar, title: "Scheduled" },
  { icon: Clock, title: "Clocked" },
  { icon: UserCircle, title: "Approved" },
  { icon: Calculator, title: "Validated" },
  { icon: CheckCircle, title: "Payroll" },
  { icon: Wallet, title: "Paid" },
  { icon: Percent, title: "Charged" },
  { icon: FileText, title: "Invoiced" },
];

const bulletPoints = [
  "Eligibility first — no compliance, no scheduling",
  "No hours, no approval",
  "No approval, no pay or invoice",
  "Rates checked automatically",
  "Exceptions resolved before anything moves",
  "Every decision logged",
  "Invoices sent with full backup",
  "Credit control workflow initiated",
];

const SlideChain = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-3 md:mb-6"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Controlled Execution
          </h2>
        </motion.div>

        {/* Bullet Points - Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-4xl mx-auto mb-4 md:mb-8">
          {bulletPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="flex items-center gap-2 p-2 md:p-3 rounded-lg bg-card/50 border border-border/50"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-[10px] md:text-xs font-medium text-foreground leading-tight">
                {point}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Chain Graphic - at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-0.5 md:gap-1 overflow-x-auto py-2"
        >
          {chainSteps.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 md:w-9 md:h-9 rounded-md trust-gradient flex items-center justify-center shadow-sm">
                  <item.icon className="w-3 h-3 md:w-4 md:h-4 text-foreground" />
                </div>
                <span className="text-[7px] md:text-[9px] text-muted-foreground font-medium">
                  {item.title}
                </span>
              </div>
              {index < chainSteps.length - 1 && (
                <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary/60 mx-0.5" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Bottom Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-3 md:mt-6"
        >
          <p className="text-xs md:text-base font-semibold text-foreground">
            If a step isn't true, the next step can't happen.
          </p>
          <p className="text-[10px] md:text-sm text-muted-foreground mt-0.5 md:mt-1">
            That's how pay queries and disputes are stopped — not managed.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideChain;
