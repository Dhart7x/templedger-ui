import { motion } from "framer-motion";
import Slide from "./Slide";

const SlideWhyThisHappens = () => {
  return (
    <Slide className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto w-full"
      >
        {/* Title */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10 md:mb-14 lg:mb-16">
          Why this keeps happening
        </h2>

        {/* Content - static, all visible */}
        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
            Agencies and labour users operate in different systems.
          </p>

          <div className="space-y-2 md:space-y-3">
            <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
              It doesn't stop there.<br />
              Different departments inside each organisation use different tools.
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              HR · Payroll · Compliance · Billing
            </p>
          </div>

          <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
            Agencies use their own systems to serve many clients.<br />
            Those systems are not designed to serve any single labour user.
          </p>

          <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
            Worker data and agency actions live inside agency systems — not shared.
          </p>
        </div>
      </motion.div>
    </Slide>
  );
};

export default SlideWhyThisHappens;
