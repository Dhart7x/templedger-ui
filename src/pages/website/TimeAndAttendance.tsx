import { motion } from "framer-motion";
import { Clock, ArrowRight, CheckCircle, Shield, AlertTriangle } from "lucide-react";
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { Button } from "@/components/ui/button";

const capabilities = [
  "Only scheduled workers can clock in",
  "Clock-in and clock-out are mandatory",
  "Overtime is flagged in real time",
  "No-shows are identified automatically",
  "Exceptions surface immediately"
];

const TimeAndAttendance = () => {
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
              <Clock className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              The Capture Point Matters
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ground truth starts at attendance. Temp Ledger controls the capture point to enable everything downstream.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Own T&A */}
      <section className="py-16 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Attendance is the gate.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Without controlled attendance capture, every downstream system — pay, billing, performance — is built on assumptions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {capabilities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What It Enables */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              What controlled capture enables
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Verified Hours</h3>
              <p className="text-sm text-muted-foreground">Hours are real before they're approved.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <AlertTriangle className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Immediate Exceptions</h3>
              <p className="text-sm text-muted-foreground">Issues surface in real time, not after payroll.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Trusted Downstream</h3>
              <p className="text-sm text-muted-foreground">Pay and billing can trust the data.</p>
            </motion.div>
          </div>
          <motion.div {...fadeInUp} className="text-center mt-12">
            <p className="text-lg font-bold text-foreground mb-2">
              No attendance, no approval.
            </p>
            <p className="text-muted-foreground">
              No approval, no pay or invoice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              See ground truth in action.
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

export default TimeAndAttendance;