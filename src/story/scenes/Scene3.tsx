import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { LEADS_PICKED_UP, INTERESTED_LEADS, QUALIFIED_BUYERS, INDUSTRY_STANDARDS } from "@/data/metrics";
import { motion } from "framer-motion";

export function Scene3() {
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
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white break-words">
                <AnimatedCounter
                  targetNumber={INTERESTED_LEADS.number}
                  displayString={INTERESTED_LEADS.display}
                  duration={1.2}
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="text-gray-200 hover:text-white transition-colors flex-shrink-0"
                    aria-label="Definition of Interested"
                  >
                    <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Interested = engaged in conversation</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white">
              Interested ({INTERESTED_LEADS.percent})
            </div>
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[12px] border-t-gray-400"></div>
          </div>
        </motion.div>

        {/* Qualified Buyers - Star of the show with glow effect */}
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
            {/* Subtle spotlight gradient overlay with modern colors */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white break-words">
                  <AnimatedCounter
                    targetNumber={QUALIFIED_BUYERS.number}
                    displayString={QUALIFIED_BUYERS.display}
                    duration={1.2}
                  />
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="text-gray-300 hover:text-white transition-colors flex-shrink-0"
                      aria-label="Definition of Qualified"
                    >
                      <Info className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Qualified = client-defined rules</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-semibold">
                Qualified Buyers ({QUALIFIED_BUYERS.percent})
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* One-liner and industry comparison */}
      <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 space-y-1 sm:space-y-2 px-2">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 italic">
          From conversations your team didn't have to chase.
        </p>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
          Industry average qualified rate: {INDUSTRY_STANDARDS.averageQualifiedRate} • {QUALIFIED_BUYERS.percent} is 2-3x better
        </p>
      </div>
    </div>
  );
}

