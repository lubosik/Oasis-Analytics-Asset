import { AnimatedCounter } from "@/components/AnimatedCounter";
import { CalloutStrip } from "@/components/CalloutStrip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { LEADS_PICKED_UP, INTERESTED_LEADS, BANT_VERIFIED, QUALIFIED_BUYERS, INDUSTRY_STANDARDS } from "@/data/metrics";
import { useStoryContext } from "@/contexts/StoryContext";
import { motion } from "framer-motion";

export function Scene3() {
  const { proofMode } = useStoryContext();
  
  // Calculate BANT percent of answered calls
  const bantPercent = Math.round((BANT_VERIFIED.number / LEADS_PICKED_UP.number) * 100);
  const bantPercentDisplay = `${bantPercent}%`;

  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          When they answered… 61% showed interest.
        </h1>
      </div>

      {/* Animated Funnel */}
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 px-2">
        {/* Answered - Top level */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-gray-200 rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 text-center border-2 border-gray-300">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
              <AnimatedCounter
                targetNumber={LEADS_PICKED_UP.number}
                displayString={LEADS_PICKED_UP.display}
                duration={1.2}
              />
            </div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700">Answered</div>
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[12px] border-t-gray-200"></div>
          </div>
        </motion.div>

        {/* Interested - Middle level */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative"
        >
          <div className="bg-gray-400 rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 text-center border-2 border-gray-500 relative">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 break-words">
              <AnimatedCounter
                targetNumber={INTERESTED_LEADS.number}
                displayString={INTERESTED_LEADS.display}
                duration={1.2}
              />
            </div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white">
              Interested ({INTERESTED_LEADS.percent})
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[12px] border-t-gray-400"></div>
          </div>
        </motion.div>

        {/* BANT Verified - Primary verified buyer metric */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative"
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 text-center border-2 border-gray-800 relative overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 0px rgba(59, 130, 246, 0)",
                "0 0 30px rgba(59, 130, 246, 0.2), 0 0 60px rgba(147, 51, 234, 0.15)",
                "0 0 30px rgba(59, 130, 246, 0.2), 0 0 60px rgba(147, 51, 234, 0.15)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {/* Subtle spotlight gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white break-words">
                  <AnimatedCounter
                    targetNumber={BANT_VERIFIED.number}
                    displayString={BANT_VERIFIED.display}
                    duration={1.2}
                  />
                </div>
              </div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-2 sm:mb-3">
                Verified Buyers (BANT) ({bantPercentDisplay})
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 mb-1 sm:mb-2">
                Budget • Authority • Need • Timing
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                Industry-standard qualification framework
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Qualified Buyers - Secondary context */}
        {proofMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="relative"
          >
            <div className="bg-gray-100 rounded-lg p-4 sm:p-5 md:p-6 text-center border-2 border-gray-300">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 break-words">
                  <AnimatedCounter
                    targetNumber={QUALIFIED_BUYERS.number}
                    displayString={QUALIFIED_BUYERS.display}
                    duration={1.2}
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                      aria-label="Definition of Qualified"
                    >
                      <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <p className="text-sm text-gray-700">
                      Qualified was defined by the client's internal rules for this project and does not perfectly overlap with BANT.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-sm sm:text-base md:text-lg text-gray-600">
                Qualified Buyers (client-defined) ({QUALIFIED_BUYERS.percent})
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Callout strip */}
      <div className="mt-4 sm:mt-6 px-2 max-w-4xl mx-auto">
        <CalloutStrip>
          BANT (Budget, Authority, Need, Timing) is the industry-standard framework for verifying buyer readiness. This means verified buyers are ready for sales action.
        </CalloutStrip>
      </div>

      {/* One-liner and industry comparison */}
      <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 space-y-1 sm:space-y-2 px-2">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 italic">
          From conversations your team didn't have to chase.
        </p>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
          Industry average qualified rate: {INDUSTRY_STANDARDS.averageQualifiedRate} • {bantPercentDisplay} is 2-3x better
        </p>
      </div>
    </div>
  );
}

