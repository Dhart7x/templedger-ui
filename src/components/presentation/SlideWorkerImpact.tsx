import { motion } from "framer-motion";
import Slide from "./Slide";

const PhoneMockup = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[100px] md:w-[140px] lg:w-[160px] h-[200px] md:h-[280px] lg:h-[320px] rounded-2xl border-2 border-border bg-card/80 overflow-hidden flex flex-col">
    {/* Phone notch */}
    <div className="h-4 md:h-6 bg-muted/50 flex items-center justify-center">
      <div className="w-12 md:w-16 h-1 md:h-1.5 bg-border rounded-full" />
    </div>
    {/* Phone content */}
    <div className="flex-1 p-2 md:p-3 overflow-hidden">
      {children}
    </div>
  </div>
);

const TimeViewPhone = () => (
  <PhoneMockup>
    <div className="space-y-1.5 md:space-y-2">
      <div className="text-[8px] md:text-[10px] font-semibold text-foreground mb-2 md:mb-3">This Week</div>
      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
        <div key={day} className="flex items-center justify-between text-[7px] md:text-[9px]">
          <span className="text-muted-foreground w-6 md:w-8">{day}</span>
          <div className="flex-1 mx-1 md:mx-2 h-3 md:h-4 bg-primary/20 rounded flex items-center justify-between px-1">
            <span className="text-foreground/70">07:00</span>
            <span className="text-foreground/70">15:30</span>
          </div>
          <span className="text-primary font-medium w-6 md:w-8 text-right">8.5h</span>
        </div>
      ))}
      <div className="pt-1 md:pt-2 border-t border-border mt-2 md:mt-3 flex justify-between text-[8px] md:text-[10px]">
        <span className="text-muted-foreground">Total</span>
        <span className="text-foreground font-semibold">42.5h</span>
      </div>
    </div>
  </PhoneMockup>
);

const RaiseQueryPhone = () => (
  <PhoneMockup>
    <div className="space-y-2 md:space-y-3">
      <div className="text-[8px] md:text-[10px] font-semibold text-foreground mb-2 md:mb-3">Raise Query</div>
      <div className="space-y-1.5 md:space-y-2">
        <div className="h-5 md:h-7 rounded bg-muted/50 border border-border flex items-center px-1.5 md:px-2">
          <span className="text-[7px] md:text-[9px] text-muted-foreground">Select issue type...</span>
        </div>
        <div className="h-12 md:h-16 rounded bg-muted/50 border border-border p-1.5 md:p-2">
          <span className="text-[7px] md:text-[9px] text-muted-foreground">Add details...</span>
        </div>
      </div>
      <div className="pt-2 md:pt-4">
        <div className="h-6 md:h-8 rounded-lg trust-gradient flex items-center justify-center">
          <span className="text-[8px] md:text-[10px] font-medium text-foreground">Submit</span>
        </div>
      </div>
    </div>
  </PhoneMockup>
);

const QueryRoutingPhone = () => (
  <PhoneMockup>
    <div className="space-y-1.5 md:space-y-2">
      <div className="text-[8px] md:text-[10px] font-semibold text-foreground mb-2 md:mb-3">Open Queries</div>
      <div className="space-y-1.5 md:space-y-2">
        <div className="p-1.5 md:p-2 rounded bg-amber-500/10 border border-amber-500/30">
          <div className="flex items-center justify-between mb-0.5 md:mb-1">
            <span className="text-[7px] md:text-[9px] text-foreground font-medium">Pay discrepancy</span>
            <span className="text-[6px] md:text-[8px] px-1 md:px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Open</span>
          </div>
          <span className="text-[6px] md:text-[8px] text-muted-foreground">Assigned to: Agency</span>
        </div>
        <div className="p-1.5 md:p-2 rounded bg-primary/10 border border-primary/30">
          <div className="flex items-center justify-between mb-0.5 md:mb-1">
            <span className="text-[7px] md:text-[9px] text-foreground font-medium">Shift time error</span>
            <span className="text-[6px] md:text-[8px] px-1 md:px-1.5 py-0.5 rounded bg-primary/20 text-primary">Resolved</span>
          </div>
          <span className="text-[6px] md:text-[8px] text-muted-foreground">Closed by: Agency</span>
        </div>
        <div className="p-1.5 md:p-2 rounded bg-destructive/10 border border-destructive/30">
          <div className="flex items-center justify-between mb-0.5 md:mb-1">
            <span className="text-[7px] md:text-[9px] text-foreground font-medium">Missing hours</span>
            <span className="text-[6px] md:text-[8px] px-1 md:px-1.5 py-0.5 rounded bg-destructive/20 text-destructive">Escalated</span>
          </div>
          <span className="text-[6px] md:text-[8px] text-muted-foreground">Escalated to: Client</span>
        </div>
      </div>
    </div>
  </PhoneMockup>
);

const SlideWorkerImpact = () => {
  return (
    <Slide className="relative md:justify-start md:pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto w-full"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-8 md:mb-12"
        >
          Worker Impact
        </motion.h2>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 md:space-y-5 mb-8 md:mb-12 max-w-2xl mx-auto"
        >
          <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
            Fragmentation hits workers first.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Pay errors and unresolved queries drive attrition — and reputational risk.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
            <span className="trust-gradient-text font-semibold">Temp Ledger</span> provides clarity and accountability.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Workers have a simple view of their time for the week and one place to raise queries — tracked through to resolution.
          </p>
        </motion.div>

        {/* Phone mockups */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center items-end gap-4 md:gap-8 lg:gap-12"
        >
          <TimeViewPhone />
          <RaiseQueryPhone />
          <QueryRoutingPhone />
        </motion.div>
      </motion.div>
    </Slide>
  );
};

export default SlideWorkerImpact;
