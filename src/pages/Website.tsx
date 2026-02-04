import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, AlertTriangle, CheckCircle, Clock, Users, BarChart3, Shield, FileText, TrendingUp } from "lucide-react";
import WebsiteLayout from "@/components/website/WebsiteLayout";
import { Button } from "@/components/ui/button";

const Website = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  };

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <WebsiteLayout>
      <div ref={containerRef}>
        {/* SECTION 1 — HERO */}
        <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
                Temp Ledger
              </h1>
              <p className="text-xl md:text-2xl text-primary font-medium mb-4">
                The Operating System for Labour Users
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
              >
                Agencies and labour users operate in different systems.{" "}
                <motion.span
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 1 }}
                  className="text-foreground font-medium"
                >
                  Temp Ledger orchestrates them into one.
                </motion.span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="gap-2">
                  Book Demo <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  How It Works
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated background line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-center"
          />
        </section>

        {/* SECTION 2 — THE PROBLEM */}
        <section className="min-h-screen flex flex-col justify-center px-6 py-20 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Labour Is Managed Across Broken Boundaries
            </motion.h2>
            <motion.div {...fadeInUp} className="text-center mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Agencies run their own systems.<br />
                Labour users run theirs.<br />
                <span className="text-foreground font-medium">Nothing connects them.</span>
              </p>
            </motion.div>

            <motion.p {...fadeInUp} className="text-sm text-muted-foreground text-center mb-8">
              As a result:
            </motion.p>

            <motion.div {...staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                "Pay issues surface after payroll",
                "Invoices are challenged after approval",
                "Compliance gaps are found retrospectively",
                "Performance metrics are reported—but accuracy is anyone's guess"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...staggerItem}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20"
                >
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center">
              <p className="text-muted-foreground mb-2">These aren't isolated failures.</p>
              <p className="text-lg font-semibold text-foreground">They're symptoms of disconnected execution.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — THE ROOT CAUSE */}
        <section className="min-h-screen flex flex-col justify-center px-6 py-20 bg-card/30 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">
              There Is No Orchestration Between the Parties
            </motion.h2>

            <motion.div {...staggerChildren} className="space-y-4 max-w-2xl mx-auto mb-12">
              {[
                "Labour users and agencies operate in separate systems",
                "Communication happens via phone, email, and spreadsheets",
                "Inside agencies, HR, Payroll, Compliance, and Billing operate in silos",
                "Execution is validated after the fact"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card/50"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-muted-foreground">{i + 1}</span>
                  </div>
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center p-6 rounded-xl bg-destructive/5 border border-destructive/20 max-w-xl mx-auto">
              <p className="text-foreground font-semibold">
                That guarantees rework, disputes, and audit risk.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4 — THE SOLUTION */}
        <section className="min-h-screen flex flex-col justify-center px-6 py-20 border-t border-border/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <p className="text-primary font-medium mb-4">The Solution</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Ledger-Driven Orchestration
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                Temp Ledger enforces a single execution ledger that every labour provider must operate through.
              </p>
              <p className="text-foreground font-medium mb-12">
                It doesn't replace systems. It orchestrates them.
              </p>
            </motion.div>

            <motion.div {...staggerChildren} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {[
                "Every worker is checked, every pay cycle",
                "Every step must be true before the next can happen",
                "Every decision is executed and logged immutably"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...staggerItem}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <CheckCircle className="w-6 h-6 text-primary mb-3 mx-auto" />
                  <p className="text-sm text-foreground">{item}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="p-6 rounded-xl border border-border bg-card/50">
              <p className="text-lg font-semibold text-foreground">
                If a step fails, the process stops—not the trust.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5 — THE EXECUTION LEDGER */}
        <section className="min-h-screen flex flex-col justify-center px-6 py-20 bg-card/30 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                The Sequence That Prevents Failure
              </h2>
              <p className="text-muted-foreground">Each step is enforced. None are optional.</p>
            </motion.div>

            {/* Vertical Chain */}
            <div className="max-w-md mx-auto mb-12">
              {[
                "Worker registered and compliant",
                "Contract and terms locked",
                "Shift scheduled",
                "Attendance captured",
                "Hours approved",
                "Pay validated",
                "Invoice produced"
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-primary">{i + 1}</span>
                    </div>
                    <span className="text-foreground">{step}</span>
                  </div>
                  {i < 6 && (
                    <div className="absolute left-5 top-12 w-px h-3 bg-primary/30" />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeInUp} className="p-6 rounded-xl bg-primary/5 border border-primary/20 max-w-xl mx-auto mb-8">
              <p className="text-sm text-muted-foreground mb-4">When any step fails:</p>
              <div className="space-y-2">
                {[
                  "Issues are flagged immediately",
                  "Routed to the correct party",
                  "Resolved before payroll or invoicing"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.p {...fadeInUp} className="text-center text-lg font-semibold text-foreground">
              This is how pay queries, disputes, and audit failures are avoided—not managed.
            </motion.p>
          </div>
        </section>

        {/* SECTION 6 — TIME & ATTENDANCE */}
        <section className="min-h-screen flex flex-col justify-center px-6 py-20 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Ground Truth at the Capture Point
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Temp Ledger runs its own Time & Attendance to ensure execution is based on reality.
              </p>
            </motion.div>

            <motion.div {...staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
              {[
                "Only scheduled workers can clock in",
                "Clock-in and clock-out are required",
                "Overtime is flagged in real time",
                "Lateness and no-shows are detected immediately"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...staggerItem}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center space-y-2">
              <p className="text-foreground">No attendance, no approval.</p>
              <p className="text-lg font-semibold text-foreground">No approval, no pay or invoice.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7 — PERFORMANCE */}
        <section className="min-h-screen flex flex-col justify-center px-6 py-20 bg-card/30 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Performance Is No Longer Self-Reported
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Because execution is enforced, performance becomes objective.
              </p>
            </motion.div>

            <motion.p {...fadeInUp} className="text-center text-sm text-muted-foreground mb-8">
              Temp Ledger provides real-time insight into:
            </motion.p>

            <motion.div {...staggerChildren} className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-12">
              {[
                "Agency response time",
                "Time-to-fill",
                "Fulfilment vs commitment",
                "Lateness and no-shows",
                "Attrition",
                "Who is on site now, by department"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...staggerItem}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-lg bg-card border border-border text-center"
                >
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center">
              <p className="text-muted-foreground mb-2">Performance isn't reported by agencies.</p>
              <p className="text-lg font-semibold text-foreground">It's revealed by execution.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8 — LABOUR USERS */}
        <section id="labour-users" className="min-h-screen flex flex-col justify-center px-6 py-20 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                For Labour Users
              </h2>
              <p className="text-muted-foreground">Temp Ledger gives you:</p>
            </motion.div>

            <motion.div {...staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
              {[
                "Confidence workers are compliant",
                "Assurance temps are paid correctly",
                "Certainty invoices are accurate",
                "Real-time visibility into labour and supplier performance"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...staggerItem}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center space-y-4">
              <p className="text-muted-foreground">
                You adopt Temp Ledger.<br />
                Your labour providers are required to operate through it.
              </p>
              <p className="text-xl font-semibold text-foreground">Control replaces trust.</p>
              <Button size="lg" className="gap-2 mt-4">
                Book Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 9 — AGENCIES */}
        <section id="agencies" className="min-h-screen flex flex-col justify-center px-6 py-20 bg-card/30 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                For Agencies
              </h2>
              <p className="text-muted-foreground">Temp Ledger removes friction from your back office:</p>
            </motion.div>

            <motion.div {...staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
              {[
                "Fewer pay queries",
                "Fewer invoice disputes",
                "Less admin rework",
                "Faster approvals",
                "Lower audit risk"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...staggerItem}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center space-y-4">
              <p className="text-muted-foreground">
                You execute once.<br />
                Everyone sees the same truth.
              </p>
              <p className="text-xl font-semibold text-foreground">Better execution benefits everyone.</p>
              <Button size="lg" className="gap-2 mt-4">
                Book Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 10 — IF PROVIDERS */}
        <section id="if-providers" className="min-h-screen flex flex-col justify-center px-6 py-20 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                For Invoice Finance Providers
              </h2>
              <p className="text-muted-foreground">Temp Ledger provides:</p>
            </motion.div>

            <motion.div {...staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
              {[
                "Immutable proof of work performed",
                "Verified compliance and approvals",
                "Reduced dispute and clawback risk",
                "Real-time visibility into execution quality"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...staggerItem}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20"
                >
                  <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center space-y-4">
              <p className="text-xl font-semibold text-foreground">
                Invoices backed by execution—not explanations.
              </p>
              <Button size="lg" className="gap-2 mt-4">
                Book Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 11 — FINAL CTA */}
        <section className="min-h-screen flex flex-col justify-center px-6 py-20 bg-card/30 border-t border-border/30 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Stop Managing Labour Retrospectively
              </h2>
              <p className="text-xl text-primary font-medium mb-10">
                Start orchestrating it.
              </p>
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                Book Demo <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Animated completion line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute bottom-40 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
          />
        </section>
      </div>
    </WebsiteLayout>
  );
};

export default Website;
