import { motion } from "framer-motion";

const lines = [
  "Payroll and invoicing accurate by default.",
  "Your performance, verified and visible.",
  "One system. Both sides. No middleman.",
];

const ClosingSlide = () => (
  <div className="w-full h-full flex flex-col items-center justify-center text-center px-8 md:px-24">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="font-mono font-bold text-foreground"
      style={{ fontSize: "clamp(34px, 4.5vw, 52px)", lineHeight: 1.2, maxWidth: 700 }}
    >
      Less chaos.
      <br />
      Fewer disputes.
      <br />
      Better outcomes.
    </motion.h1>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="mx-auto my-9"
      style={{ width: 48, height: 1, backgroundColor: "#7d8f46" }}
    />

    <div className="space-y-3" style={{ maxWidth: 480 }}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
          className="font-sans font-normal"
          style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(237,231,217,0.65)", lineHeight: 1.7 }}
        >
          {line}
        </motion.p>
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="font-mono font-medium mt-12"
      style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "#7d8f46" }}
    >
      Temp Ledger makes that the default.
    </motion.p>
  </div>
);

export default ClosingSlide;
