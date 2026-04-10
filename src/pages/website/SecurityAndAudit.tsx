import { motion } from "framer-motion";
import { Shield, ArrowRight, FileText, Lock, Eye, CheckCircle } from "lucide-react";
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { Button } from "@/components/ui/button";

const features = [
  { icon: FileText, title: "Immutable Logs", desc: "Every decision, approval, and exception is logged permanently. No edits, no deletions, no rewrites." },
  { icon: Lock, title: "Full Attribution", desc: "Every action is tied to a user, a timestamp, and the context in which it occurred." },
  { icon: Eye, title: "Complete Traceability", desc: "Follow any worker, any payment, any invoice back through the entire execution chain." },
];

const SecurityAndAudit = () => {
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
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8">
              <Shield className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Built for Audit, Not Explanation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Audit evidence exists before it's needed. Not reconstructed after the fact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Audits shouldn't require archaeology.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Traditional systems store data. When audits happen, teams scramble to reconstruct what happened. Temp Ledger logs execution as it happens — immutably.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Logged */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Everything is logged.
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              "Worker registrations",
              "Compliance checks",
              "Shift assignments",
              "Clock-in/out events",
              "Manager approvals",
              "Pay validations",
              "Invoice generation",
              "Exception handling"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border"
              >
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground mt-10">
            Proof by design, not reconstruction.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              See the audit trail in action.
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

export default SecurityAndAudit;