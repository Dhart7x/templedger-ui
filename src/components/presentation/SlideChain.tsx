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
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">The Process</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-2">
            Verified Chain of Events
          </h2>
          <p className="text-base text-muted-foreground">
            Each step timestamped, attributed, immutably linked — shift to invoice.
          </p>
        </motion.div>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {chainSteps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="relative p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-all text-center"
            >
              <div className="w-8 h-8 rounded-md trust-gradient flex items-center justify-center mx-auto mb-1.5">
                <item.icon className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-xs text-primary font-bold mb-0.5">{item.step}</div>
              <div className="text-[10px] font-medium text-muted-foreground leading-tight">{item.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default SlideChain;
