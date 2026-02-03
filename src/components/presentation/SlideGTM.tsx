import { motion } from "framer-motion";
import { Building2, Factory, Landmark, ArrowRight, ArrowDown } from "lucide-react";
import Slide from "./Slide";

const SlideGTM = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header - Centered at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="text-primary font-medium text-xs md:text-sm uppercase tracking-wider">Go-To-Market</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-1 md:mt-2">
            Market Strategy
          </h2>
        </motion.div>

        {/* Two Phase Layout */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Phase 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-4 md:p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-sm md:text-base font-bold text-primary">1</span>
              </div>
              <div>
                <div className="text-xs text-primary font-medium uppercase tracking-wider">Phase 1</div>
                <h3 className="text-base md:text-lg font-bold text-foreground">Encourage</h3>
              </div>
            </div>

            <div className="flex items-center justify-center py-4 md:py-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl trust-gradient flex items-center justify-center">
                  <Building2 className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-foreground">Staffing Agencies</p>
                  <p className="text-xs text-muted-foreground mt-1">Direct sales</p>
                </div>
              </motion.div>
            </div>

            <p className="text-xs md:text-sm text-muted-foreground text-center mt-2">
              Sell directly to staffing agencies
            </p>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-4 md:p-6 rounded-xl bg-card border border-primary/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <span className="text-sm md:text-base font-bold text-accent">2</span>
              </div>
              <div>
                <div className="text-xs text-accent font-medium uppercase tracking-wider">Phase 2</div>
                <h3 className="text-base md:text-lg font-bold text-foreground">Force The Issue</h3>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-8 py-2 md:py-4">
              {/* Clients */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Factory className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm font-semibold text-foreground">Clients</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Cleaner invoices</p>
                </div>
              </motion.div>

              {/* Lenders */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Landmark className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm font-semibold text-foreground">Lenders</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">Reduced risk</p>
                </div>
              </motion.div>
            </div>

            {/* Arrow pointing down */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center my-2"
            >
              <ArrowDown className="w-5 h-5 text-accent" />
            </motion.div>

            {/* Push to agencies */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="flex justify-center"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30">
                <Building2 className="w-4 h-4 text-accent" />
                <span className="text-xs md:text-sm font-medium text-foreground">Push agencies to adopt</span>
              </div>
            </motion.div>

            <p className="text-xs md:text-sm text-muted-foreground text-center mt-3">
              Clients & lenders benefit — they require their agencies to use us
            </p>
          </motion.div>
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-4 md:mt-6 flex items-center justify-center gap-2 md:gap-4"
        >
          <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/30">
            <span className="text-[10px] md:text-xs font-medium text-foreground">Direct Sales</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 border border-accent/30">
            <span className="text-[10px] md:text-xs font-medium text-foreground">Channel-Driven Adoption</span>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideGTM;
