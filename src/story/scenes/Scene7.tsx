import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { CalloutStrip } from "@/components/CalloutStrip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { RETRY_SUMMARY, PICKUP_BY_ATTEMPT, METRICS_META } from "@/data/metrics";
import { useStoryContext } from "@/contexts/StoryContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Scene7() {
  const { proofMode } = useStoryContext();

  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          The system is intelligent. It doesn't give up after one try.
        </h1>
      </div>

      {/* Intelligent retry explanation */}
      <div className="mb-6 sm:mb-8 px-2 max-w-4xl mx-auto">
        <CalloutStrip>
          <strong>How it works:</strong> When the AI called and they didn't pick up, we didn't just put the phone down. The system intelligently retried them up to 6 times at different times and days. We don't leave it to you after one try. We keep retrying until we know if the lead is an interested buyer. This persistence created extra answers that wouldn't have happened with a single call attempt.
        </CalloutStrip>
      </div>

      {/* 3-step retry ladder */}
      <div className="max-w-5xl mx-auto px-2">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          {/* Step 1: Leads Re-Called */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6"
          >
            <Card className="w-full md:flex-1 p-5 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-md">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                  <AnimatedCounter
                    targetNumber={RETRY_SUMMARY.leadsReCalled.number}
                    displayString={RETRY_SUMMARY.leadsReCalled.display}
                    duration={1.2}
                  />
                </div>
                <div className="text-sm sm:text-base md:text-lg text-gray-700 mb-0.5 sm:mb-1">
                  Leads Re-Called
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">
                  ({RETRY_SUMMARY.leadsReCalled.percent})
                </div>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex-shrink-0 rotate-90 md:rotate-0"
            >
              <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-gray-400" />
            </motion.div>

            <div className="hidden md:block flex-1"></div>
          </motion.div>

          {/* Step 2: Eventually Picked Up */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6"
          >
            <div className="hidden md:block flex-1"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex-shrink-0 rotate-90 md:rotate-0"
            >
              <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-gray-400" />
            </motion.div>

            <Card className="w-full md:flex-1 p-5 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-md">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                  <AnimatedCounter
                    targetNumber={RETRY_SUMMARY.eventuallyPickedUp.number}
                    displayString={RETRY_SUMMARY.eventuallyPickedUp.display}
                    duration={1.2}
                  />
                </div>
                <div className="text-sm sm:text-base md:text-lg text-gray-700 mb-0.5 sm:mb-1">
                  Eventually Picked Up
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">
                  ({RETRY_SUMMARY.eventuallyPickedUp.percent})
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Step 3: Converted to Interested */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6"
          >
            <Card className="w-full md:flex-1 p-5 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-md">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                  <AnimatedCounter
                    targetNumber={RETRY_SUMMARY.convertedToInterested.number}
                    displayString={RETRY_SUMMARY.convertedToInterested.display}
                    duration={1.2}
                  />
                </div>
                <div className="text-sm sm:text-base md:text-lg text-gray-700 mb-0.5 sm:mb-1">
                  Converted to Interested
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">
                  ({RETRY_SUMMARY.convertedToInterested.percent})
                </div>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex-shrink-0 rotate-90 md:rotate-0"
            >
              <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-gray-400" />
            </motion.div>

            <div className="hidden md:block flex-1"></div>
          </motion.div>
        </div>
      </div>

      {/* Persistence payoff highlight */}
      <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 px-2 max-w-4xl mx-auto">
        <Card className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-700">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
              <AnimatedCounter
                targetNumber={PICKUP_BY_ATTEMPT.sixPlusCalls.number}
                displayString={PICKUP_BY_ATTEMPT.sixPlusCalls.display}
                duration={1.2}
              />
            </div>
            <div className="text-sm sm:text-base md:text-lg text-gray-200 mb-1 sm:mb-2">
              Even 6+ call attempts produced pickups
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              ({PICKUP_BY_ATTEMPT.sixPlusCalls.percent} pickup rate)
            </div>
          </div>
        </Card>
      </div>

      {/* Callout strip */}
      <div className="mt-4 sm:mt-6 px-2 max-w-4xl mx-auto">
        <CalloutStrip>
          Persistence creates extra answers. Retries weren't spam. They converted leads that didn't answer the first time. We keep trying until we know if the lead is an interested buyer.
        </CalloutStrip>
      </div>

      {/* Tracking note as footnote - only in proof mode */}
      {proofMode && (
        <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 px-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Tracking note"
              >
                <Info className="h-3 w-3" />
                <span>Note</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="max-w-md p-4">
              <p className="text-sm text-gray-700">
                {METRICS_META.trackingNote}
              </p>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}

