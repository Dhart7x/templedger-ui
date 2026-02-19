import { motion } from "framer-motion";
import { CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Slide from "./Slide";

const capabilities = [
  "Creates a single shared record between labour users and agencies",
  "Verifies each critical step before work, pay, or billing progresses",
  "Surfaces issues as they arise — not after the fact",
  "Makes agency activity visible and accountable",
  "Produces reliable, real-time and historical performance insight",
  "Agencies operate inside a client-specific interface",
  "Worker data and agency actions live in one unified system",
  "Issues surface as they happen",
  "Hours and invoices are approved only when validated",
  "Both sides work from the same system, in real time",
];

interface SlideIntroducingTLProps {
  onLaunchDemo?: () => void;
}

const SlideIntroducingTL = ({ onLaunchDemo }: SlideIntroducingTLProps) => {
  return (
    <Slide className="relative md:justify-start md:pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto w-full"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-2 md:mb-3"
        >
          Introducing <span className="trust-gradient-text">Temp Ledger</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm md:text-xl lg:text-2xl text-primary font-medium text-center mb-6 md:mb-12"
        >
          The unified system for agency orchestration
        </motion.p>

        {/* Capability points */}
        <div className="space-y-2 md:space-y-4 mb-10 md:mb-14">
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
              className="flex items-start gap-3 md:gap-4"
            >
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 md:mt-1 flex-shrink-0" />
              <p className="text-sm md:text-lg lg:text-xl text-foreground leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Launch Demo Button */}
        {onLaunchDemo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              onClick={onLaunchDemo}
              className="text-base md:text-lg px-8 py-6 md:px-10 md:py-8 rounded-xl trust-gradient hover:opacity-90 transition-opacity group"
            >
              <Play className="w-5 h-5 md:w-6 md:h-6 mr-3 group-hover:scale-110 transition-transform" />
              Launch Demo
            </Button>
          </motion.div>
        )}
      </motion.div>
    </Slide>
  );
};

export default SlideIntroducingTL;
