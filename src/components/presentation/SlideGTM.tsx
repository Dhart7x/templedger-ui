import { motion } from "framer-motion";
import { Building2, Factory, Landmark, Check } from "lucide-react";

const markets = [
  {
    icon: Building2,
    title: "Agencies",
    subtitle: "Primary Buyer",
    description: "Pay & invoice integrity infrastructure",
    benefits: [
      "Reduces pay queries",
      "Lowers worker attrition",
      "Cuts credit notes",
      "Shrinks verification cost",
      "Protects market reputation",
    ],
  },
  {
    icon: Factory,
    title: "End Users of Labour",
    subtitle: "Mandated Adoption",
    description: "Operational efficiency through verified labour",
    benefits: [
      "Cleaner invoices",
      "Faster dispute resolution",
      "Audit-ready proof of labour",
    ],
  },
  {
    icon: Landmark,
    title: "Invoice Finance & Banks",
    subtitle: "Risk Infrastructure",
    description: "Consume confidence signals",
    benefits: [
      "Reduced dispute exposure",
      "Improved invoice quality",
      "Better advance rates & limits",
    ],
  },
];

const SlideGTM = () => {
  return (
    <section className="slide-section relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Go-To-Market</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Market Strategy
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {markets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-xl trust-gradient flex items-center justify-center mb-6">
                  <market.icon className="w-7 h-7 text-foreground" />
                </div>
                
                <div className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                  {market.subtitle}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{market.title}</h3>
                <p className="text-muted-foreground mb-6">{market.description}</p>
                
                <div className="space-y-3">
                  {market.benefits.map((benefit, bIndex) => (
                    <div key={bIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-6 rounded-xl bg-secondary/30 border border-border text-center"
        >
          <p className="text-muted-foreground">
            Over time, clients insist on <span className="text-foreground font-medium">Temp Ledger-backed invoicing</span> to reduce their own internal overhead.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SlideGTM;
