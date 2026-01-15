import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CalloutStrip } from "@/components/CalloutStrip";
import { BANT_VERIFIED } from "@/data/metrics";
import { motion } from "framer-motion";

export function Scene10() {
  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight">
          What would {BANT_VERIFIED.display} verified buyers be like for your team?
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
              targetNumber={BANT_VERIFIED.number}
              displayString={BANT_VERIFIED.display}
              duration={1.5}
            />
          </div>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold">
            Verified Buyers (BANT)
          </div>
        </div>
      </motion.div>

      {/* Callout strip */}
      <div className="mb-6 sm:mb-8 px-2 max-w-4xl mx-auto">
        <CalloutStrip>
          Works for fresh inbound and older leads. Ready for your sales team to close.
        </CalloutStrip>
      </div>
    </div>
  );
}

