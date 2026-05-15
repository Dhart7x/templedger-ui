import { motion } from "framer-motion";
import { Building2, ArrowRight, CheckCircle, Shield, BarChart3, FileText } from "lucide-react";
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Shield, title: "Verified Compliance", desc: "Workers are compliant before they work, not after audits surface gaps." },
  { icon: CheckCircle, title: "Correct Pay", desc: "Temps are paid correctly every cycle. No disputes, no corrections." },
  { icon: FileText, title: "Accurate Invoices", desc: "Invoices match reality by design. No challenges, no re-work." },
  { icon: BarChart3, title: "Objective Performance", desc: "Agency performance is revealed, not debated. Data comes from execution." },
];

const ForLabourUsers = () => {
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
            <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mx-auto mb-8">
              <Building2 className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Finally, Control Over Your Labour Supply
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For Ops Directors, Plant Managers, and COOs who need assurance — not assumptions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              You've been operating on trust.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trust that agencies are compliant. Trust that pay is correct. Trust that invoices are accurate. And you only find out otherwise after it hurts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              What changes with TEMPLEDGER
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              One system. All suppliers. Same rules.
            </h2>
          </motion.div>
          <div className="space-y-4 max-w-xl mx-auto">
            {[
              "You adopt TEMPLEDGER",
              "All staffing agencies operate through it",
              "Agencies pay to participate",
              "You gain assurance and control"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-foreground">{i + 1}</span>
                </div>
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground mt-10">
            Control replaces trust.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Take control of your labour supply.
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

export default ForLabourUsers;