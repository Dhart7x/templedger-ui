import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide from "./Slide";

const statements = [
  { main: "Agencies and labour users operate in different systems." },
  { main: "It's worse inside each organisation." },
  { main: "Different departments live in different tools.", sub: "HR. Payroll. Compliance. Billing." },
  { main: "Agencies use their own systems to serve many clients." },
  { main: "Those systems don't exist to serve you." },
  { main: "Worker data and agency actions stay inside their system — not shared." },
];

const SlideWhyThisHappens = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [statementVisible, setStatementVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Phase 1: Show title
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setTitleVisible(true);
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Phase 2: Start statements after title appears
  useEffect(() => {
    if (!titleVisible) return;

    timerRef.current = setTimeout(() => {
      setCurrentIndex(0);
    }, 1500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [titleVisible]);

  // Phase 3: Cycle through statements
  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= statements.length) return;

    // Show current statement
    setStatementVisible(true);

    // Fade out after display time
    const hideTimer = setTimeout(() => {
      setStatementVisible(false);
    }, 2800);

    // Move to next statement
    const nextTimer = setTimeout(() => {
      if (currentIndex < statements.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 3400);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex]);

  return (
    <Slide className="relative">
      {/* Title - top aligned */}
      <div className="pt-20 md:pt-24 lg:pt-28 px-6 md:px-12">
        <AnimatePresence>
          {titleVisible && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground"
            >
              Why this keeps happening
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      {/* Statements area - centered in remaining space */}
      <div className="absolute inset-x-0 top-36 md:top-44 lg:top-48 bottom-20 flex items-center justify-center px-6 md:px-12">
        <AnimatePresence mode="wait">
          {statementVisible && currentIndex >= 0 && currentIndex < statements.length && (
            <motion.div
              key={`statement-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center max-w-3xl"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-foreground font-medium leading-relaxed">
                {statements[currentIndex].main}
              </p>
              {statements[currentIndex].sub && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-muted-foreground"
                >
                  {statements[currentIndex].sub}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Slide>
  );
};

export default SlideWhyThisHappens;
