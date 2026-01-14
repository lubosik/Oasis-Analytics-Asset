import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { INTERESTED_CALLBACK_BREAKDOWN, INTERESTED_FROM_CALLBACKS } from "@/data/metrics";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Scene6() {
  const [showAll, setShowAll] = useState(false);

  // Compute buyer tiers aggregate from constants
  const buyerTiersTotal =
    INTERESTED_CALLBACK_BREAKDOWN.tier1Buyer.number +
    INTERESTED_CALLBACK_BREAKDOWN.tier2Buyer.number +
    INTERESTED_CALLBACK_BREAKDOWN.tier3Buyer.number;

  const buyerTiersDisplay = buyerTiersTotal.toLocaleString();

  // Buyer tier categories
  const buyerTiers = [
    { label: "Tier 1 Buyer", count: INTERESTED_CALLBACK_BREAKDOWN.tier1Buyer, key: "tier1Buyer" },
    { label: "Tier 2 Buyer", count: INTERESTED_CALLBACK_BREAKDOWN.tier2Buyer, key: "tier2Buyer" },
    { label: "Tier 3 Buyer", count: INTERESTED_CALLBACK_BREAKDOWN.tier3Buyer, key: "tier3Buyer" },
  ];

  // Other outcome categories
  const otherOutcomes = [
    { label: "Requested Callback Again", count: INTERESTED_CALLBACK_BREAKDOWN.requestedCallbackAgain, key: "requestedCallbackAgain" },
    { label: "Researcher", count: INTERESTED_CALLBACK_BREAKDOWN.researcher, key: "researcher" },
    { label: "Browser", count: INTERESTED_CALLBACK_BREAKDOWN.browser, key: "browser" },
  ];

  // Default view shows all buyer tiers + top 2 other outcomes
  const defaultOtherOutcomes = otherOutcomes.slice(0, 2);
  const hiddenOtherOutcomes = otherOutcomes.slice(2);
  const displayedOtherOutcomes = showAll ? otherOutcomes : defaultOtherOutcomes;

  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          Callback conversations weren't all the same.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">
          Breakdown of the {INTERESTED_FROM_CALLBACKS.display} interested from callbacks
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-2 space-y-6 sm:space-y-8">
        {/* Buyer Tiers Block - Hero */}
        <Card className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-700">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 sm:mb-4">
              Buyer tiers total (Tier 1–3)
            </h2>
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6">
              <AnimatedCounter
                targetNumber={buyerTiersTotal}
                displayString={buyerTiersDisplay}
                duration={1.2}
              />
            </div>
          </div>

          {/* Buyer tier breakdown */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <AnimatePresence mode="popLayout">
              {buyerTiers.map((tier, index) => (
                <motion.div
                  key={tier.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 text-white border-gray-600 font-semibold"
                  >
                    <span className="mr-1 sm:mr-2">{tier.label}:</span>
                    <span className="font-bold">{tier.count.display}</span>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* Other Outcomes Block */}
        <div>
          <h3 className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">
            Other outcomes
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {displayedOtherOutcomes.map((outcome, index) => (
                <motion.div
                  key={outcome.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 font-semibold"
                  >
                    <span className="mr-1 sm:mr-2">{outcome.label}:</span>
                    <span className="font-bold text-gray-900">
                      {outcome.count.display}
                    </span>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show all toggle */}
          {hiddenOtherOutcomes.length > 0 && (
            <div className="text-center mt-4">
              <Button
                variant="ghost"
                onClick={() => setShowAll(!showAll)}
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 h-8 sm:h-10"
              >
                {showAll ? (
                  <>
                    Show less
                    <ChevronUp className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </>
                ) : (
                  <>
                    Show all
                    <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

