import { motion } from "framer-motion";
import { Brain, AlertCircle, TrendingUp, Search, Zap } from "lucide-react";

const aiFeatures = [
  {
    icon: AlertCircle,
    title: "Anomaly Detection",
    description: "Flags mismatches before they become pay queries or disputes.",
  },
  {
    icon: TrendingUp,
    title: "Dispute Likelihood Scoring",
    description: "Identifies invoices statistically likely to be challenged.",
  },
  {
    icon: Search,
    title: "Root-Cause Analysis",
    description: "Surfaces recurring failure points (sites, shift types, approval delays).",
  },
  {
    icon: Zap,
    title: "Process Optimisation",
    description: "Highlights where tighter controls materially reduce downstream cost.",
  },
];

const SlideAI = () => {
  return (
    <section className="slide-section relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Intelligence</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            How AI Is Applied
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI reduces operational friction and financial risk, not to replace human judgement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
          className="p-8 rounded-2xl bg-gradient-to-r from-card to-card/50 border border-border text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            The learning loop is grounded in real outcomes: <span className="text-primary">paid</span>, <span className="text-muted-foreground">queried</span>, <span className="text-destructive">disputed</span>, <span className="text-accent">credited</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SlideAI;
