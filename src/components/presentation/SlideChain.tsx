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
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">The Process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-2">
            Verified Chain of Events
          </h2>
          <p className="text-lg text-muted-foreground">
            Each step timestamped, attributed, immutably linked — shift to invoice.
          </p>
        </motion.div>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {chainSteps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all text-center"
            >
              <div className="w-10 h-10 rounded-lg trust-gradient flex items-center justify-center mx-auto mb-2">
                <item.icon className="w-5 h-5 text-foreground" />
              </div>
              <div className="text-xs text-primary font-bold mb-1">{item.step}</div>
              <div className="text-xs font-medium text-muted-foreground leading-tight">{item.title}</div>
              
              {index < chainSteps.length - 1 && index % 6 !== 5 && (
                <div className="absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-primary/50 to-transparent hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default SlideChain;
