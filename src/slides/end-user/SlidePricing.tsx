import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide from "@/components/agency-deck/Slide";

const benefits = [
  "Less payroll verification overhead",
  "Fewer invoice disputes",
  "Verified performance data — a competitive advantage",
  "Faster payment on verified invoices",
  "Less admin on timesheet collection",
  "Smart scheduling reduces manual re-booking",
  "Compliance managed centrally",
];

function getRate(annualSpend: number) {
  if (annualSpend >= 100_000_000) return 0.006;
  if (annualSpend >= 60_000_000) return 0.0075;
  if (annualSpend >= 25_000_000) return 0.009;
  if (annualSpend >= 10_000_000) return 0.011;
  if (annualSpend >= 4_000_000) return 0.0125;
  return 0.015;
}

export default function SlidePricing() {
  const [headcount, setHeadcount] = useState("");
  const [chargeRate, setChargeRate] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("35");

  const result = useMemo(() => {
    const h = parseFloat(headcount);
    const c = parseFloat(chargeRate);
    const w = parseFloat(weeklyHours) || 35;
    if (!h || !c) return null;
    const annualSpend = h * c * w * 52;
    const rate = getRate(annualSpend);
    const annualFee = annualSpend * rate;
    const monthlyFee = annualFee / 12;
    return {
      annualSpend: Math.round(annualSpend),
      rate,
      monthlyFee: Math.round(monthlyFee),
    };
  }, [headcount, chargeRate, weeklyHours]);

  const showResult = !!result;

  const inputClass =
    "bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground w-full focus:border-primary outline-none";

  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center overflow-y-auto py-8">
        <div className="w-full max-w-[900px] mx-auto">
          <span
            className="text-[10px] tracking-[0.24em] uppercase text-primary mb-[10px] block"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            PRICING
          </span>
          <h2
            className="font-bold text-[32px] text-foreground leading-[1.2] mb-[6px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Simple. Aligned to your spend.
          </h2>
          <p
            className="text-[15px] text-foreground font-medium leading-[1.6] max-w-[560px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Priced as a percentage of your annual agency labor spend, billed monthly. Clients have
            offset some or all of the cost simply by renegotiating charge rates with their agencies —
            the efficiency gains give you leverage to do the same.
          </p>

          <div
            className="rounded-xl p-7 mt-6 mb-6"
            style={{
              background: "#1a1b18",
              border: "0.5px solid #2a2b27",
              padding: "28px 32px",
            }}
          >
            <span
              className="text-[13px] font-semibold text-foreground block mb-5"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Calculate your investment
            </span>

            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="text-[11px] text-foreground font-medium block mb-[6px]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Daily headcount
                </label>
                <input
                  type="number"
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value)}
                  placeholder="e.g. 120"
                  className={inputClass}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
              <div className="flex-1">
                <label
                  className="text-[11px] text-foreground font-medium block mb-[6px]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Charge rate / hour ($)
                </label>
                <input
                  type="number"
                  value={chargeRate}
                  onChange={(e) => setChargeRate(e.target.value)}
                  placeholder="e.g. 22"
                  className={inputClass}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
              <div className="flex-1">
                <label
                  className="text-[11px] text-foreground font-medium block mb-[6px]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Weekly hours / worker
                </label>
                <input
                  type="number"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(e.target.value)}
                  placeholder="35"
                  className={inputClass}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <AnimatePresence>
              {showResult && result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-5" style={{ borderTop: "1px solid #2a2b27" }}>
                    <div className="flex gap-8">
                      <div>
                        <span
                          className="text-[10px] uppercase tracking-[0.16em] block mb-1"
                          style={{ fontFamily: "'Inter', sans-serif", color: "rgba(237,231,217,0.5)" }}
                        >
                          Annual spend
                        </span>
                        <span
                          className="text-[20px] font-bold text-foreground"
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          ${result.annualSpend.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span
                          className="text-[10px] uppercase tracking-[0.16em] block mb-1"
                          style={{ fontFamily: "'Inter', sans-serif", color: "rgba(237,231,217,0.5)" }}
                        >
                          Rate
                        </span>
                        <span
                          className="text-[20px] font-bold text-primary"
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {(result.rate * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div>
                        <span
                          className="text-[10px] uppercase tracking-[0.16em] block mb-1"
                          style={{ fontFamily: "'Inter', sans-serif", color: "rgba(237,231,217,0.5)" }}
                        >
                          Monthly fee
                        </span>
                        <span
                          className="text-[20px] font-bold text-foreground"
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          ${result.monthlyFee.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-[11px] text-foreground font-medium text-center mt-3 italic"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Billed monthly. No setup fees. No long-term lock-in.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span
            className="text-[10px] uppercase tracking-[0.16em] text-primary block mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            YOUR AGENCIES BENEFIT TOO — REDUCING FRICTION ON ADOPTION
          </span>
          <div className="flex flex-wrap gap-2">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-center rounded-[20px] px-[14px] py-[6px]"
                style={{ background: "#1a1b18", border: "0.5px solid #2a2b27" }}
              >
                <div className="w-1 h-1 bg-primary rounded-[1px] flex-shrink-0 mr-2" />
                <span
                  className="text-[11px] text-foreground font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
