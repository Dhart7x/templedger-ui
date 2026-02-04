import { motion } from "framer-motion";
import { BarChart3, ArrowRight, TrendingUp, Clock, Users, AlertTriangle } from "lucide-react";
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { Button } from "@/components/ui/button";

const metrics = [
  { icon: Clock, label: "Response time", desc: "Time from request to candidate submission" },
  { icon: TrendingUp, label: "Time-to-fill", desc: "Speed of placement completion" },
  { icon: Users, label: "Fulfilment vs commitment", desc: "Actual vs promised delivery" },
  { icon: AlertTriangle, label: "Lateness and no-shows", desc: "Attendance reliability by supplier" },
  { icon: Users, label: "Attrition", desc: "Worker retention by agency" },
  { icon: BarChart3, label: "Spend and overtime", desc: "Cost visibility by department" },
];

const Performance = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mx-auto mb-8">
              <BarChart3 className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Performance Without Guesswork
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Performance metrics exist because execution is enforced — not because data is stitched together later.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="py-16 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Performance is a by-product, not a report.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Because every step in the execution chain is enforced and logged, objective performance data emerges automatically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <metric.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{metric.label}</h3>
                    <p className="text-sm text-muted-foreground">{metric.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground mt-12">
            Performance isn't reported. It's revealed.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-card/50 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              See objective agency performance.
            </h2>
            <Button size="lg" className="gap-2">
              Request Demo <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default Performance;