import { motion } from "framer-motion";

interface BulletListProps {
  items: string[];
  containerDelay?: number;
}

const BulletList = ({ items, containerDelay = 0.25 }: BulletListProps) => (
  <div className="flex flex-wrap gap-y-3 gap-x-7">
    {items.map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: containerDelay + i * 0.1, ease: "easeOut" }}
        className="flex-shrink-0 flex items-center gap-2.5"
      >
        <span
          className="flex-shrink-0"
          style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: "#4C1D95" }}
        />
        <span className="font-mono text-[15px] font-semibold text-foreground whitespace-nowrap">
          {item}
        </span>
      </motion.div>
    ))}
  </div>
);

export default BulletList;
