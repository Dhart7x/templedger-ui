import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: ReactNode;
  slideCount: number;
}

const HorizontalScroll = ({ children, slideCount }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(slideCount - 1) * 100}%`]);

  return (
    <div ref={containerRef} style={{ height: `${slideCount * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
