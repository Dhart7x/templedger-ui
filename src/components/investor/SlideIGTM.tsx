import { motion } from "framer-motion";
import { Building2, Users, CreditCard, ArrowRight } from "lucide-react";
import Slide from "../presentation/Slide";

const steps = [
  { icon: Building2, text: "Labour users deploy TEMPLEDGER" },
  { icon: Users, text: "Staffing agencies are required to operate through it" },
  { icon: CreditCard, text: "Agencies pay to participate" },
];

const SlideIGTM = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Labour-User Mandated Adoption
          </h2>
        </motion.div>

        <div className="max-w-md mx-auto mb-10">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-4 p-4 mb-3 rounded-xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-foreground">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-5 rounded-xl bg-primary/5 border border-primary/20 max-w-lg mx-auto text-center"
        >
          <p className="text-foreground font-semibold">
            The buyer and payer are intentionally decoupled.
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideIGTM;