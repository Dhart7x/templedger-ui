import { useState, useEffect, useRef } from "react";
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
  const [phase, setPhase] = useState<"typing" | "questions" | "final">("typing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [questionVisible, setQuestionVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Phase 1: Typing animation
  useEffect(() => {
    if (phase !== "typing") return;

    if (displayedTitle.length < title.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedTitle(title.slice(0, displayedTitle.length + 1));
      }, 50);
    } else {
      // Title complete - wait 3 seconds then start questions
      timerRef.current = setTimeout(() => {
        setPhase("questions");
        setCurrentQuestionIndex(0);
      }, 3000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayedTitle, phase]);

  // Phase 2: Sequential questions
  useEffect(() => {
    if (phase !== "questions") return;
    if (currentQuestionIndex < 0) return;

    // Check if we've shown all questions
    if (currentQuestionIndex >= questions.length) {
      setPhase("final");
      return;
    }

    // Show the current question
    setQuestionVisible(true);

    // After 1.8s, hide it
    const hideTimer = setTimeout(() => {
      setQuestionVisible(false);
    }, 1800);

    // After 2.4s total, move to next question
    const nextTimer = setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
    }, 2400);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [phase, currentQuestionIndex]);

  return (
    <Slide className="flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
        {/* Title - always visible once typed */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16 min-h-[1.5em]">
          {displayedTitle}
          {phase === "typing" && displayedTitle.length < title.length && (
            <span className="opacity-0">|</span>
          )}
        </h2>

        {/* Questions area */}
        <div className="h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "questions" && questionVisible && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length && (
              <motion.p
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-lg md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl px-4"
              >
                {questions[currentQuestionIndex]}
              </motion.p>
            )}

            {phase === "final" && (
              <motion.p
                key="final"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
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
