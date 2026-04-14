import { motion } from "framer-motion";
import { Monitor, Laptop, Tablet, Smartphone } from "lucide-react";
import Slide from "@/components/agency-deck/Slide";

const cards = [
  {
    icon: Monitor,
    title: "T&A Hardware",
    desc: `Biometric terminals at site entrances.\nEvery attendance event captured and\nverified at source.`,
  },
  {
    icon: Laptop,
    title: "HR & Operations — Full Access",
    desc: `Full platform visibility. Agencies, payroll,\nbilling, performance and complete\npermission configuration.`,
  },
  {
    icon: Tablet,
    title: "Shift Managers — iPad",
    desc: `Department view only. Who's on site,\nlive exceptions and hour approvals —\nwithin permissions set by HR.`,
  },
  {
    icon: Smartphone,
    title: "Workers — Phone App",
    desc: `Shift offers, schedule visibility and\none-tap acceptance. The loop closes\nwithout a single phone call.`,
  },
];

export default function SlideHowItWorks() {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-[820px] mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-[10px] tracking-[0.24em] uppercase text-primary mb-[10px] block text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            WHAT MAKES IT WORK
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-[34px] text-foreground leading-[1.2] mb-[10px] text-center"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Four touchpoints.{"\n"}Nothing to rip out.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[15px] text-foreground font-medium leading-[1.65] max-w-[560px] mx-auto mb-[36px] text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            No integration with existing systems required. Temp Ledger installs alongside what you
            already have. The only dependency is our time and attendance hardware on site.
          </motion.p>

          <div className="flex gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 * i, ease: "easeOut" }}
                  className="flex-1 flex flex-col rounded-xl"
                  style={{
                    background: "#1a1b18",
                    border: "0.5px solid #2a2b27",
                    padding: "22px 20px",
                  }}
                >
                  <div
                    className="flex items-center justify-center mb-[14px]"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "rgba(125,143,70,0.12)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span
                    className="text-[13px] font-semibold text-foreground block mb-2"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="text-[13px] text-foreground/65 font-normal leading-[1.6]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {card.desc}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-7 pt-5"
            style={{ borderTop: "1px solid #2a2b27" }}
          >
            <p
              className="text-[13px] text-foreground font-medium leading-[1.65] max-w-[600px] mx-auto text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              HR sets what every role can do — approve hours only,
              request replacements, contact agencies directly, or order headcount above scheduled
              volumes. Every permission, your decision.
            </p>
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}
