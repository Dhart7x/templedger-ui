import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const title = "Managing agencies is a nightmare.";

// Questions positioned BELOW the header (y values start from ~30% onwards)
const questions = [
  { text: "How many no-shows do we have today?", x: "5%", y: "32%" },
  { text: "Was that temp even on site?", x: "52%", y: "30%" },
  { text: "Why does this invoice not match the hours?", x: "8%", y: "45%" },
  { text: "What's this pay query?", x: "50%", y: "42%" },
  { text: "How long until the replacement arrives?", x: "3%", y: "58%" },
  { text: "Will my agencies pass this audit?", x: "48%", y: "55%" },
  { text: "Are my departments adequately staffed right now?", x: "5%", y: "72%" },
  { text: "What's our attrition percentage?", x: "50%", y: "68%" },
  { text: "Which agency is best suited to fill these bookings?", x: "10%", y: "38%" },
  { text: "Who's going to fill this last-minute requirement fastest?", x: "40%", y: "78%" },
  { text: "When will I get the hours to approve?", x: "20%", y: "85%" },
];

const SlideProblem = () => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [phase, setPhase] = useState<"waiting" | "typing" | "questions" | "final" | "done">("waiting");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [questionVisible, setQuestionVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initial delay before typing starts
  useEffect(() => {
    if (phase !== "waiting") return;
    
    const startTimer = setTimeout(() => {
      setPhase("typing");
    }, 600);

    return () => clearTimeout(startTimer);
  }, [phase]);

  // Phase 1: Typing animation
  useEffect(() => {
    if (phase !== "typing") return;

    if (displayedTitle.length < title.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedTitle(title.slice(0, displayedTitle.length + 1));
      }, 60);
    } else {
      // Title complete - wait 1 second then start questions
      timerRef.current = setTimeout(() => {
        setPhase("questions");
        setCurrentQuestionIndex(0);
      }, 1000);
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

    // After 3s, hide it
    const hideTimer = setTimeout(() => {
      setQuestionVisible(false);
    }, 3000);

    // After 3.15s total (3s visible + 0.15s quick transition), move to next question
    const nextTimer = setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
    }, 3150);

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
    <div className="w-full h-full relative overflow-hidden bg-background">
      {/* Title - at the top */}
      <div className="absolute top-16 md:top-20 lg:top-24 left-0 right-0 px-6 md:px-12 lg:px-20 z-10">
        <h2 className="text-xl md:text-4xl lg:text-5xl font-bold text-foreground text-center md:text-left">
          <span>{displayedTitle}</span>
          {(phase === "waiting" || phase === "typing") && displayedTitle.length < title.length && (
            <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-0.5 animate-pulse align-middle" />
          )}
        </h2>
      </div>

      {/* Questions area - below the header */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === "questions" && questionVisible && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length && (
            <motion.p
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="absolute text-sm md:text-xl lg:text-2xl text-muted-foreground max-w-[44%] md:max-w-sm lg:max-w-md px-2"
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-3xl lg:text-4xl text-foreground font-medium text-center"
            >
              Sound familiar?
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SlideProblem;
