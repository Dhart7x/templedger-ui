import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Slide from "./Slide";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const comparisonData = [
  { capability: "System of record / source of truth", tempLedger: true, dwight: false },
  { capability: "Captures events at source (T&A, approvals)", tempLedger: true, dwight: false },
  { capability: "Append-only, immutable execution chain", tempLedger: true, dwight: false },
  { capability: "Resolves disputes without reconstruction", tempLedger: true, dwight: false },
  { capability: "Changes invoice finance & risk profile", tempLedger: true, dwight: false },
  { capability: 'Automates "if this, then that" workflows', tempLedger: false, dwight: true },
];

const SlideCompetition = () => {
  return (
    <Slide className="relative">
      <div className="max-w-5xl mx-auto w-full flex flex-col h-full justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Competitive Positioning</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
            Temp Ledger vs D.W.I.G.H.T <span className="text-muted-foreground font-normal">(RPA)</span>
          </h2>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-foreground font-semibold text-base w-[50%]">Capability</TableHead>
                <TableHead className="text-center text-foreground font-semibold text-base w-[25%]">Temp Ledger</TableHead>
                <TableHead className="text-center text-foreground font-semibold text-base w-[25%]">D.W.I.G.H.T</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                  className="border-border hover:bg-secondary/30"
                >
                  <TableCell className="text-foreground font-medium py-4">{row.capability}</TableCell>
                  <TableCell className="text-center py-4">
                    {row.tempLedger ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.08, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/20"
                      >
                        <Check className="w-5 h-5 text-accent" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.08, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-destructive/20"
                      >
                        <X className="w-5 h-5 text-destructive" strokeWidth={3} />
                      </motion.div>
                    )}
                  </TableCell>
                  <TableCell className="text-center py-4">
                    {row.dwight ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.08, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/20"
                      >
                        <Check className="w-5 h-5 text-accent" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.08, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-destructive/20"
                      >
                        <X className="w-5 h-5 text-destructive" strokeWidth={3} />
                      </motion.div>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Bottom Takeaway */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-relaxed">
            RPA automates processes.
            <br />
            <span className="text-primary">Temp Ledger defines the truth</span> those processes rely on.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto"
          >
            Automation reduces effort. Transaction integrity eliminates disputes and risk.
          </motion.p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideCompetition;
