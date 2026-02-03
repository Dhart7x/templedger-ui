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
  { action: "Eligibility is enforced first", detail: "A worker cannot be scheduled unless compliance and right-to-work checks are complete." },
  { action: "Work cannot be approved unless it actually happened", detail: "Clock-in/out data must exist before hours can move forward." },
  { action: "Client approval is a required gate", detail: "Hours cannot progress to payroll or billing without explicit approval." },
  { action: "Pay and charge rates are validated automatically", detail: "Overtime, premiums, and exceptions are checked against agreed terms." },
  { action: "Pay queries are resolved in-flow", detail: "Discrepancies are routed to the correct team and resolved with named human approval." },
  { action: "Nothing is paid or billed until exceptions are closed", detail: "No silent fixes, no downstream surprises." },
  { action: "Every decision is attributed and logged", detail: "Who approved what, when, and why — permanently." },
  { action: "Invoices are issued with full backup by default", detail: "Approved hours, exceptions, and approvals travel together." },
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
          className="text-center mb-2 md:mb-4"
        >
          <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mt-1">
            Controlled Execution
          </h2>
        </motion.div>

        {/* Compact Chain - Single row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-0.5 md:gap-1 mb-3 md:mb-6 overflow-x-auto py-1"
        >
          {chainSteps.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-5 h-5 md:w-7 md:h-7 rounded-md trust-gradient flex items-center justify-center shadow-sm">
                <item.icon className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-foreground" />
              </div>
              {index < chainSteps.length - 1 && (
                <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary/60 mx-0.5" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Bullet Points - Two columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 max-w-5xl mx-auto">
          {bulletPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="flex items-start gap-2 p-1.5 md:p-2 rounded-lg bg-card/50 border border-border/50"
            >
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0" />
              <div>
                <span className="text-[10px] md:text-xs font-medium text-foreground leading-tight block">
                  {point.action}
                </span>
                <span className="text-[8px] md:text-[10px] text-muted-foreground leading-tight hidden md:block">
                  {point.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

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
