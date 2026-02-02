import { motion } from "framer-motion";
import { DollarSign, FileText, BarChart3 } from "lucide-react";

const pricingModels = [
  {
    icon: DollarSign,
    title: "Per Active Worker",
    price: "£0.50–£2.00",
    unit: "per worker / week",
  },
  {
    icon: FileText,
    title: "Per Invoice",
    price: "Variable",
    unit: "per invoice processed",
  },
  {
    icon: BarChart3,
    title: "Risk Intelligence",
    price: "Premium Tier",
    unit: "funder-facing analytics",
  },
];

const benchmarks = [
  "Pay query handling cost",
  "Credit note leakage",
  "Verification labour cost",
  "Attrition-driven rehiring cost",
];

const SlidePricing = () => {
  return (
    <section className="slide-section relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Aligned to Cost Avoided
          </h2>
          <p className="text-xl text-muted-foreground">
            Not features. Value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pricingModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all text-center"
            >
              <div className="w-14 h-14 rounded-xl trust-gradient flex items-center justify-center mx-auto mb-6">
                <model.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{model.title}</h3>
              <div className="text-3xl font-bold text-primary mb-2">{model.price}</div>
              <div className="text-sm text-muted-foreground">{model.unit}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-8 rounded-2xl bg-card/50 border border-border"
        >
          <h3 className="text-xl font-semibold mb-6 text-center text-foreground">Pricing benchmarks against:</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benchmarks.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-secondary/50 border border-border text-center text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SlidePricing;
