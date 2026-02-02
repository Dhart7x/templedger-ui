import { motion } from "framer-motion";
import { UserCheck, FileCheck, FileSignature, CreditCard, Calendar, Clock, UserCircle, Calculator, CheckCircle, Wallet, Percent, FileText } from "lucide-react";

const chainSteps = [
  { icon: UserCheck, step: 1, title: "Candidate registered" },
  { icon: FileCheck, step: 2, title: "Right to work verified" },
  { icon: FileSignature, step: 3, title: "Contract / terms accepted" },
  { icon: CreditCard, step: 4, title: "Bank details validated" },
  { icon: Calendar, step: 5, title: "Shift scheduled" },
  { icon: Clock, step: 6, title: "Clock-in / clock-out recorded" },
  { icon: UserCircle, step: 7, title: "Client manager approval" },
  { icon: Calculator, step: 8, title: "Overtime validated" },
  { icon: CheckCircle, step: 9, title: "Payroll-approved event" },
  { icon: Wallet, step: 10, title: "Pay executed" },
  { icon: Percent, step: 11, title: "Charge rate applied" },
  { icon: FileText, step: 12, title: "Invoice with full provenance" },
];

const SlideChain = () => {
  return (
    <section className="slide-section relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">The Process</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Verified Chain of Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each step is timestamped, attributed, and immutably linked — producing a 
            defensible proof of work from shift to invoice.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20 hidden lg:block" />

          <div className="grid gap-6">
            {chainSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`flex items-center gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`inline-flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                      <div className="text-xs text-primary font-medium mb-1">Step {item.step}</div>
                      <div className="font-medium text-foreground">{item.title}</div>
                    </div>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className="hidden lg:flex w-4 h-4 rounded-full bg-primary border-4 border-background z-10 flex-shrink-0" />
                
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlideChain;
