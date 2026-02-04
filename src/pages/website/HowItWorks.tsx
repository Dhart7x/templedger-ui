import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, FileText, Users } from "lucide-react";
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { Button } from "@/components/ui/button";

const steps = [
  "Worker registration",
  "Compliance verified",
  "Terms locked",
  "Shift scheduled",
  "Attendance captured",
  "Hours approved",
  "Pay validated",
  "Invoice produced"
];

const HowItWorks = () => {
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
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              An Enforced Execution Chain
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nothing progresses unless the previous step is true.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Chain */}
      <section className="py-16 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-center"
                >
                  <div className="px-4 py-2 rounded-lg bg-card border border-border">
                    <span className="text-sm font-medium text-foreground">{step}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground mx-1" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground">
            If a step isn't true, nothing moves forward.
          </motion.p>
        </div>
      </section>

      {/* Execution Gating */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Execution Gating</h3>
              <p className="text-sm text-muted-foreground">
                Each step validates the previous. No shortcuts, no exceptions unless explicitly resolved.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Immutable Audit Log</h3>
              <p className="text-sm text-muted-foreground">
                Every decision, approval, and exception is logged permanently. No edits, no deletions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-xl trust-gradient flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Human Approval</h3>
              <p className="text-sm text-muted-foreground">
                Where judgement is required, humans decide. The system enforces the decision once made.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-card/50 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              See the execution chain in action.
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

export default HowItWorks;