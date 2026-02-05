import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide from "./Slide";

const title = "Managing agencies is a nightmare.";

const questions = [
  "How many no-shows do we have today?",
  "Was that temp even on site?",
  "Why does this invoice not match the hours?",
  "What's this pay query?",
  "How long until the replacement arrives?",
  "Will my agencies pass this audit?",
  "Are my departments adequately staffed right now?",
  "What's our attrition percentage?",
  "Which agency is best suited to fill these bookings?",
  "Who's going to fill this last-minute requirement fastest?",
  "When will I get the hours to approve?",
];

const SlideProblem = () => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [phase, setPhase] = useState<"typing" | "waiting" | "questions" | "final">("typing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showQuestion, setShowQuestion] = useState(false);

  // Phase 1: Typing animation
  useEffect(() => {
    if (phase !== "typing") return;
    
    if (displayedTitle.length < title.length) {
      const timeout = setTimeout(() => {
        setDisplayedTitle(title.slice(0, displayedTitle.length + 1));
      }, 50); // Natural typing speed
      return () => clearTimeout(timeout);
    } else {
      // Title complete, wait 3 seconds
      setPhase("waiting");
      const timeout = setTimeout(() => {
        setPhase("questions");
        setCurrentQuestionIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [displayedTitle, phase]);

  // Phase 2: Sequential questions
  useEffect(() => {
    if (phase !== "questions" || currentQuestionIndex < 0) return;

    if (currentQuestionIndex >= questions.length) {
      // All questions done, move to final phase
      setPhase("final");
      return;
    }

    // Show question
    setShowQuestion(true);
    
    // After display time, fade out
    const hideTimeout = setTimeout(() => {
      setShowQuestion(false);
    }, 1800); // Time to read

    // After fade out, move to next question
    const nextTimeout = setTimeout(() => {
      setCurrentQuestionIndex(prev => prev + 1);
    }, 2400); // Total time per question

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [phase, currentQuestionIndex]);

  return (
    <Slide className="flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
        {/* Title - always visible after typing */}
        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16"
        >
          {displayedTitle}
        </motion.h2>

        {/* Questions area - fixed height to prevent layout shift */}
        <div className="h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "questions" && showQuestion && currentQuestionIndex < questions.length && (
              <motion.p
                key={currentQuestionIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-lg md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl"
              >
                {questions[currentQuestionIndex]}
              </motion.p>
            )}

            {phase === "final" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-xl md:text-3xl lg:text-4xl text-foreground font-medium"
              >
                Sound familiar?
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Slide>
  );
};

export default SlideProblem;
