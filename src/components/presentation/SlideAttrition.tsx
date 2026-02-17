import { motion } from "framer-motion";
import { Zap, ShieldCheck, DollarSign, Activity } from "lucide-react";
import Slide from "./Slide";

const sections = [
  {
    icon: Zap,
    title: "Faster Ramp Time. Fewer Non-Productive Hours.",
    points: [
      "Faster replacement decisions",
      "Pay disputes resolved early",
      "Lower churn of proven workers",
    ],
  },
  {
    icon: Activity,
    title: "Reduced Operational Volatility",
    points: [
      "Issues surfaced in real time",
      "Overtime controlled before escalation",
      "Under-filled shifts addressed immediately",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Lower Compliance & Audit Risk",
    points: [
      "Continuous verification by default",
      "Reduced remediation and shutdown exposure",
      "Audit-ready data without manual effort",
    ],
  },
  {
    icon: DollarSign,
    title: "Stronger Financial Control",
    points: [
      "Hours validated before payroll",
      "Invoices verified before payment",
      "Spend visible across agencies in real time",
    ],
  },
];

const SlideAttrition = () => {
  return (
    <Slide className="relative !pt-10 md:!pt-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-6 md:mb-12"
        >
          P&L Impact
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-xs md:text-lg lg:text-xl text-muted-foreground text-center mb-6 md:mb-10 -mt-4 md:-mt-10"
        >
          Not a budget line. A margin leak.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
              className="rounded-xl border border-border bg-card/50 p-4 md:p-6"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <section.icon className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                <h3 className="text-xs md:text-base lg:text-lg font-semibold text-foreground">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-1.5 md:space-y-2">
                {section.points.map((point, pIdx) => (
                  <li
                    key={pIdx}
                    className="text-[11px] md:text-sm lg:text-base text-muted-foreground leading-relaxed pl-4 md:pl-6 relative before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Slide>
  );
};

export default SlideAttrition;
