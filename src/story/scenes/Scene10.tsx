import { AnimatedCounter } from "@/components/AnimatedCounter";
import { QUALIFIED_BUYERS } from "@/data/metrics";
import { motion } from "framer-motion";

export function Scene10() {
  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight">
          What would {QUALIFIED_BUYERS.display} qualified buyers be like for your team?
        </h1>
      </div>

      {/* Visual emphasis on the number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-8 md:mb-12 px-2"
      >
        <div className="inline-block">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 break-words">
            <AnimatedCounter
              targetNumber={QUALIFIED_BUYERS.number}
              displayString={QUALIFIED_BUYERS.display}
              duration={1.5}
            />
          </div>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold">
            Qualified Buyers
          </div>
        </div>
      </motion.div>

      {/* Supporting text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 px-2"
      >
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Ready for your sales team to close.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-gray-500">
          Works for fresh inbound and older leads.
        </p>
      </motion.div>
    </div>
  );
}

