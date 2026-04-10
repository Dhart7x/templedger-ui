import { motion } from "framer-motion";
import { DollarSign, Building2, Users, CreditCard, TrendingUp } from "lucide-react";
import Slide from "../presentation/Slide";

const economics = [
  { icon: Building2, text: "Labour users mandate adoption" },
  { icon: Users, text: "Agencies pay to participate" },
  { icon: CreditCard, text: "Per-worker pricing (weekly active)" },
  { icon: TrendingUp, text: "Predictable, scalable ARR" },
];

const SlideIBusinessModel = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-7 h-7 text-foreground" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Infrastructure-Grade Economics
          </h2>
        </motion.div>

        <div className="max-w-md mx-auto">
          {economics.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-4 p-4 mb-3 rounded-xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm md:text-base text-foreground font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default SlideIBusinessModel;