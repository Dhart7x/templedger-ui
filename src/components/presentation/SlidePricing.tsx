import { motion } from "framer-motion";
import { DollarSign, FileText, BarChart3 } from "lucide-react";
import Slide from "./Slide";

const pricingModels = [
  { icon: DollarSign, title: "Per Active Worker", price: "£0.50–£2.00", unit: "per week" },
  { icon: FileText, title: "Per Invoice", price: "Variable", unit: "per processed" },
  { icon: BarChart3, title: "Risk Intelligence", price: "Premium", unit: "funder tier" },
];

const benchmarks = ["Pay query handling", "Credit note leakage", "Verification cost", "Rehiring cost"];

const SlidePricing = () => {
  return (
    <Slide className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-2">
            Aligned to Cost Avoided
          </h2>
          <p className="text-lg text-muted-foreground">Not features. Value.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {pricingModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all text-center"
            >
              <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center mx-auto mb-4">
                <model.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{model.title}</h3>
              <div className="text-2xl font-bold text-primary mb-1">{model.price}</div>
              <div className="text-xs text-muted-foreground">{model.unit}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-6 rounded-2xl bg-card/50 border border-border"
        >
          <h3 className="text-sm font-semibold mb-4 text-center text-muted-foreground uppercase tracking-wider">Benchmarks against:</h3>
          <div className="grid grid-cols-4 gap-3">
            {benchmarks.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-secondary/50 border border-border text-center text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlidePricing;
