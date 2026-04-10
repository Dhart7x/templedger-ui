import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Slide from "./Slide";
import SlideDemo from "./SlideDemo";

interface SlideIntroducingTLProps {
  onDemoStateChange?: (isInDemo: boolean) => void;
}

const SlideIntroducingTL = ({ onDemoStateChange }: SlideIntroducingTLProps) => {
  const [showDemo, setShowDemo] = useState(false);

  const handleLaunchDemo = () => {
    setShowDemo(true);
    onDemoStateChange?.(true);
  };

  const handleDemoStateChange = (isInDemo: boolean) => {
    if (!isInDemo) {
      setShowDemo(false);
    }
    onDemoStateChange?.(isInDemo);
  };

  if (showDemo) {
    return <SlideDemo onDemoStateChange={handleDemoStateChange} />;
  }

  return (
    <Slide className="relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto w-full flex flex-col items-center"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-2 md:mb-3"
        >
          Introducing <span className="bg-primary-text">Temp Ledger</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm md:text-xl lg:text-2xl text-primary font-medium text-center mb-10 md:mb-16"
        >
          The unified system for agency orchestration
        </motion.p>

        {/* Launch Demo Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={handleLaunchDemo}
            className="text-base md:text-lg px-8 py-6 md:px-10 md:py-8 rounded-xl bg-primary hover:opacity-90 transition-opacity group"
          >
            <Play className="w-5 h-5 md:w-6 md:h-6 mr-3 group-hover:scale-110 transition-transform" />
            Launch Demo
          </Button>
        </motion.div>
      </motion.div>
    </Slide>
  );
};

export default SlideIntroducingTL;
