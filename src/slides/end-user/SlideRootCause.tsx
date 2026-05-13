import { motion } from "framer-motion";
import Slide from "@/components/agency-deck/Slide";

export default function SlideRootCause() {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center px-8 md:px-20 lg:px-32">
        <div className="max-w-[680px] mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-[10px] tracking-[0.24em] uppercase text-primary mb-[20px] block"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            THE ROOT CAUSE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="font-bold text-[38px] md:text-[52px] text-foreground leading-[1.2] mb-[32px]"
            style={{ fontFamily: "'Inter', monospace" }}
          >
            Your agencies have a system.{"\n"}It wasn't built with you in mind.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-[16px] md:text-[19px] text-foreground font-medium leading-[1.75] max-w-[560px] mx-auto mb-[48px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every platform an agency buys or builds is designed around their workflow, their CRM, their process. The labour user — the one with the requirement, the risk, and the spend — has always been an afterthought.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="font-medium text-[16px] md:text-[18px] text-primary tracking-[0.04em]"
            style={{ fontFamily: "'Inter', monospace" }}
          >
            Two sides. Two systems. Zero shared truth.
          </motion.p>
        </div>
      </div>
    </Slide>
  );
}
