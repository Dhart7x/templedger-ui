import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide from "./Slide";

const title = "Managing agencies is a nightmare.";

const questions = [
  { text: "How many no-shows do we have today?", x: "10%", y: "25%" },
  { text: "Was that temp even on site?", x: "55%", y: "15%" },
  { text: "Why does this invoice not match the hours?", x: "20%", y: "45%" },
  { text: "What's this pay query?", x: "60%", y: "35%" },
  { text: "How long until the replacement arrives?", x: "8%", y: "60%" },
  { text: "Will my agencies pass this audit?", x: "50%", y: "55%" },
  { text: "Are my departments adequately staffed right now?", x: "15%", y: "75%" },
  { text: "What's our attrition percentage?", x: "55%", y: "70%" },
  { text: "Which agency is best suited to fill these bookings?", x: "25%", y: "30%" },
  { text: "Who's going to fill this last-minute requirement fastest?", x: "45%", y: "50%" },
  { text: "When will I get the hours to approve?", x: "30%", y: "65%" },
];

const SlideProblem = () => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [phase, setPhase] = useState<"typing" | "questions" | "final" | "done">("typing");
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

  // Phase 3: Final text fades out after 3 seconds
  useEffect(() => {
    if (phase !== "final") return;

    const fadeOutTimer = setTimeout(() => {
      setPhase("done");
    }, 3000);

    return () => clearTimeout(fadeOutTimer);
  }, [phase]);

  return (
    <Slide className="relative">
      {/* Title - top aligned as header */}
      <div className="pt-20 md:pt-24 lg:pt-28 px-6 md:px-12">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
          {displayedTitle}
        </h2>
      </div>

      {/* Questions area - full canvas for scattered positioning */}
      <div className="absolute inset-0 pt-32 md:pt-40 pb-20 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === "questions" && questionVisible && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length && (
            <motion.p
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute text-base md:text-xl lg:text-2xl text-muted-foreground max-w-xs md:max-w-sm lg:max-w-md"
              style={{
                left: questions[currentQuestionIndex].x,
                top: questions[currentQuestionIndex].y,
              }}
            >
              {questions[currentQuestionIndex].text}
            </motion.p>
          )}

          {phase === "final" && (
            <motion.p
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-3xl lg:text-4xl text-foreground font-medium"
            >
              Sound familiar?
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Slide>
  );
};

export default SlideProblem;
