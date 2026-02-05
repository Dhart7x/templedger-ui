import { motion } from "framer-motion";
import Slide from "./Slide";

const SlideWhyThisHappens = () => {
  return (
    <Slide className="relative md:justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto w-full"
      >
        {/* Title */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 md:mb-12 text-center">
          Why this keeps happening
        </h2>

        {/* Content - two column layout on desktop */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12">
          {/* Left column - Internal fragmentation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 md:p-6 rounded-xl bg-card/60 border border-border"
          >
            <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wide font-medium">
              Inside each organisation
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed mb-3">
              Different departments use different tools.
            </p>
            <div className="flex flex-wrap gap-2">
              {["HR", "Payroll", "Compliance", "Billing"].map((dept) => (
                <span
                  key={dept}
                  className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground"
                >
                  {dept}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right column - External fragmentation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-5 md:p-6 rounded-xl bg-card/60 border border-border"
          >
            <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wide font-medium">
              Between organisations
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Agencies and labour users operate in completely different systems.
            </p>
          </motion.div>
        </div>

        {/* Bottom section - The consequence */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4 md:space-y-5 text-center"
        >
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            Worker data and agency actions live inside agency systems — not shared.
          </p>
          
          <div className="pt-2 md:pt-4">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Agencies use their systems to serve many clients.
            </p>
            <p className="text-muted-foreground mt-1">
              Those systems are not designed to serve any single labour user.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Slide>
  );
};

export default SlideWhyThisHappens;
