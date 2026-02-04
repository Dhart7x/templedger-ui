import { motion } from "framer-motion";
import { Shield, Home, ChevronRight, AlertTriangle, Layers, CheckCircle, Clock, BarChart3, Building2, Users, Rocket, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Website = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-lg bg-card/80 border border-border hover:border-primary/50 flex items-center justify-center transition-colors"
          >
            <Home className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
              <Shield className="w-4 h-4 text-foreground" />
            </div>
            <span className="font-semibold text-foreground text-sm">Temp Ledger</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/website/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
          <Link to="/website/for-labour-users" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Labour Users</Link>
          <Link to="/website/for-agencies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Agencies</Link>
          <Button size="sm" className="ml-2">Request Demo</Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl trust-gradient flex items-center justify-center mx-auto mb-8">
              <Shield className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              The Operating System<br />for Labour Users
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Orchestrate labour providers from compliance to pay to invoice — with no blind spots.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                See How It Works <ChevronRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                Request Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Reality */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              You run critical operations on trust.
            </h2>
            <p className="text-muted-foreground">
              And you only find out it's broken after payroll runs or invoices land.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              "Pay disputes arrive late",
              "Invoices get challenged",
              "Compliance gaps surface retrospectively",
              "Agency performance is debated, not proven"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20"
              >
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-semibold text-foreground">
            That's not a management model.
          </motion.p>
        </div>
      </section>

      {/* The Root Cause */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Labour has never had an operating system.
            </h2>
          </motion.div>
          <div className="space-y-4 max-w-2xl mx-auto mb-10">
            {[
              "Labour users and agencies operate on different systems",
              "Communication happens via email, calls, and spreadsheets",
              "Inside agencies, HR, Payroll, Compliance, and Billing work in silos"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <Layers className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground">
            There is no orchestration between the entities.
          </motion.p>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="w-14 h-14 rounded-xl trust-gradient flex items-center justify-center mx-auto mb-6">
              <Shield className="w-7 h-7 text-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ledger-Driven Orchestration
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Temp Ledger enforces a single execution ledger that every labour provider must operate through.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: CheckCircle, text: "Every worker is checked, every pay cycle" },
              { icon: Layers, text: "Every step is enforced in sequence" },
              { icon: Shield, text: "Every decision is executed and logged" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-xl bg-primary/5 border border-primary/20 text-center"
              >
                <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <span className="text-sm text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground">
            If a step isn't true, nothing moves forward.
          </motion.p>
        </div>
      </section>

      {/* What the Ledger Guarantees */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Confidence by construction.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {[
              "Workers are compliant before they work",
              "Temps are paid correctly, every cycle",
              "Invoices are accurate by design",
              "Audit evidence exists before it's needed"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground">
            No assumptions. No re-checking. No arguments.
          </motion.p>
        </div>
      </section>

      {/* Time & Attendance */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-6">
              <Clock className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Attendance is the gate.
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "Scheduled only",
              "Clock-in required",
              "Clock-out required",
              "Overtime flagged",
              "No-shows detected"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground font-medium"
              >
                {item}
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeInUp} className="text-center">
            <p className="text-lg font-bold text-foreground mb-2">
              No attendance, no approval.
            </p>
            <p className="text-muted-foreground">
              No approval, no pay or invoice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Performance */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Performance falls out of execution.
            </h2>
            <p className="text-muted-foreground">
              Because every step is enforced, agency performance becomes objective:
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10">
            {[
              "Response time",
              "Time-to-fill",
              "Fulfilment vs commitment",
              "Lateness and no-shows",
              "Attrition",
              "Spend and overtime"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="p-3 rounded-lg bg-card border border-border text-center"
              >
                <span className="text-sm text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground">
            Performance isn't reported. It's revealed.
          </motion.p>
        </div>
      </section>

      {/* How Labour Users Deploy It */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              One system. All suppliers. Same rules.
            </h2>
          </motion.div>
          <div className="space-y-3 max-w-xl mx-auto mb-10">
            {[
              { icon: Building2, text: "Labour users adopt Temp Ledger" },
              { icon: Users, text: "Staffing agencies are required to operate through it" },
              { icon: ArrowRight, text: "Agencies pay to participate" },
              { icon: Shield, text: "Labour users gain assurance and control" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-10 h-10 rounded-lg trust-gradient flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground">
            Control replaces trust.
          </motion.p>
        </div>
      </section>

      {/* Why Agencies Accept It */}
      <section className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Better execution benefits everyone.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10">
            {[
              "Fewer pay queries",
              "Fewer invoice disputes",
              "Less admin re-work",
              "Faster approvals",
              "Lower audit risk"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeInUp} className="text-center">
            <p className="text-muted-foreground mb-2">
              Temp Ledger doesn't punish agencies.
            </p>
            <p className="text-lg font-bold text-foreground">
              It removes chaos from their back office.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Infrastructure, not disruption.
            </h2>
          </motion.div>
          <div className="space-y-3 max-w-xl mx-auto mb-10">
            {[
              "Install Temp Ledger facial-recognition Time & Attendance",
              "Integrate with agency HR, payroll, and billing systems",
              "Onboard labour providers to the ledger",
              "Go live in weeks, not months"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{i + 1}</span>
                </div>
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeInUp} className="text-center text-lg font-bold text-foreground">
            Minimal disruption. Immediate control.
          </motion.p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-card/50 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Stop managing labour retrospectively.
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-primary mb-10">
              Start orchestrating it.
            </p>
            <Button size="lg" className="gap-2">
              Request Demo <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg trust-gradient flex items-center justify-center">
                <Shield className="w-4 h-4 text-foreground" />
              </div>
              <span className="font-semibold text-foreground">Temp Ledger</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/website/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
              <Link to="/website/performance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Performance</Link>
              <Link to="/website/time-and-attendance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Time & Attendance</Link>
              <Link to="/website/for-labour-users" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Labour Users</Link>
              <Link to="/website/for-agencies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Agencies</Link>
              <Link to="/website/security-and-audit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Temp Ledger. Labour infrastructure.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Website;