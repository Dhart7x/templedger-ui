import { motion } from "framer-motion";
import Slide from "./Slide";

const questions = [
  { text: "How many no-shows do we have today?", x: "5%", y: "15%", size: "text-sm md:text-base lg:text-lg" },
  { text: "Was that temp even on site?", x: "55%", y: "8%", size: "text-xs md:text-sm lg:text-base" },
  { text: "Why does this invoice not match the hours?", x: "25%", y: "28%", size: "text-sm md:text-base lg:text-lg" },
  { text: "What's this pay query?", x: "65%", y: "22%", size: "text-base md:text-lg lg:text-xl" },
  { text: "How long until the replacement arrives?", x: "8%", y: "42%", size: "text-xs md:text-sm lg:text-base" },
  { text: "Will my agencies pass this audit?", x: "50%", y: "38%", size: "text-sm md:text-base lg:text-lg" },
  { text: "Are my departments adequately staffed right now?", x: "15%", y: "55%", size: "text-sm md:text-base lg:text-lg" },
  { text: "What's our attrition percentage?", x: "58%", y: "52%", size: "text-xs md:text-sm lg:text-base" },
  { text: "Which agency is best suited to fill these bookings?", x: "5%", y: "68%", size: "text-sm md:text-base lg:text-lg" },
  { text: "Who's going to fill this last-minute requirement fastest?", x: "45%", y: "65%", size: "text-xs md:text-sm lg:text-base" },
  { text: "When will I get the hours to approve?", x: "25%", y: "80%", size: "text-sm md:text-base lg:text-lg" },
];

const SlideProblem = () => {
  return (
    <Slide className="relative md:pt-20 lg:pt-24">
      <div className="w-full h-full flex flex-col">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8 md:mb-0"
        >
          Managing agencies is a nightmare.
        </motion.h2>

        {/* Desktop: Scattered questions */}
        <div className="hidden md:block relative flex-1 mt-8">
          {questions.map((q, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
              className={`absolute ${q.size} text-muted-foreground max-w-xs lg:max-w-sm`}
              style={{ left: q.x, top: q.y }}
            >
              {q.text}
            </motion.p>
          ))}
        </div>

        {/* Mobile: Flowing questions with varied spacing */}
        <div className="md:hidden flex-1 flex flex-col justify-center -mt-4">
          <div className="space-y-3">
            {questions.map((q, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className={`text-muted-foreground ${
                  i % 3 === 0 ? "text-sm pl-0" : 
                  i % 3 === 1 ? "text-xs pl-4" : 
                  "text-sm pl-2"
                }`}
              >
                {q.text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default SlideProblem;
