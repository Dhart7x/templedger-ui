import { motion } from "framer-motion";
import { Users, ArrowRight, CheckCircle, Clock, FileText, Shield } from "lucide-react";
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: FileText, title: "Fewer Pay Queries", desc: "Pay is validated before it runs. No more chasing corrections after the fact." },
  { icon: CheckCircle, title: "Fewer Invoice Disputes", desc: "Invoices are accurate by construction. Clients stop challenging them." },
  { icon: Clock, title: "Faster Approvals", desc: "Hours are verified at source. Approvals happen without back-and-forth." },
  { icon: Shield, title: "Lower Audit Risk", desc: "Every decision is logged. Evidence exists before it's needed." },
];

const ForAgencies = () => {
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
              <Users className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              A Better Way to Run the Back Office
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temp Ledger doesn't punish agencies. It removes chaos from the back office.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Reality */}
      <section className="py-16 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              You're not the problem.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pay queries, invoice disputes, and compliance challenges aren't caused by bad intentions. They're caused by systems that don't talk to each other. Temp Ledger fixes the process, not the people.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Better execution benefits everyone.
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
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Changes */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              What operating through Temp Ledger means
            </h2>
          </motion.div>
          <div className="space-y-4 max-w-xl mx-auto">
            {[
              "Your workers clock in through Temp Ledger T&A",
              "Hours flow automatically to your systems",
              "Pay validation happens before payroll runs",
              "Invoices are generated from verified execution"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground mt-10">
            Less admin. Fewer disputes. Better client relationships.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              See how it works for agencies.
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

export default ForAgencies;