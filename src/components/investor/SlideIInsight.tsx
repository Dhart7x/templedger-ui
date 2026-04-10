import { motion } from "framer-motion";
import { Lightbulb, Database, Calculator, FileText, X } from "lucide-react";
import Slide from "../presentation/Slide";

const SlideIInsight = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
            <Lightbulb className="w-7 h-7 text-foreground" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Data Isn't the Problem. Execution Is.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
          {[
            { icon: Database, text: "CRMs store data" },
            { icon: Calculator, text: "Payroll runs calculations" },
            { icon: FileText, text: "Billing issues invoices" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border text-center"
            >
              <item.icon className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <span className="text-sm text-foreground">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/5 border border-destructive/20 max-w-md mx-auto"
        >
          <X className="w-5 h-5 text-destructive" />
          <span className="text-foreground font-semibold">Nothing enforces the sequence.</span>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideIInsight;