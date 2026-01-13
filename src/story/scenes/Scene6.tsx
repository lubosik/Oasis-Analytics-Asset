import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INTERESTED_CALLBACK_BREAKDOWN, INTERESTED_FROM_CALLBACKS } from "@/data/metrics";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Scene6() {
  const [showAll, setShowAll] = useState(false);

  // Sort categories by count (highest first)
  const categories = [
    { label: "Requested Callback Again", count: INTERESTED_CALLBACK_BREAKDOWN.requestedCallbackAgain, key: "requestedCallbackAgain" },
    { label: "Researcher", count: INTERESTED_CALLBACK_BREAKDOWN.researcher, key: "researcher" },
    { label: "Tier 3 Buyer", count: INTERESTED_CALLBACK_BREAKDOWN.tier3Buyer, key: "tier3Buyer" },
    { label: "Tier 2 Buyer", count: INTERESTED_CALLBACK_BREAKDOWN.tier2Buyer, key: "tier2Buyer" },
    { label: "Browser", count: INTERESTED_CALLBACK_BREAKDOWN.browser, key: "browser" },
    { label: "Tier 1 Buyer", count: INTERESTED_CALLBACK_BREAKDOWN.tier1Buyer, key: "tier1Buyer" },
  ];

  // Default view shows top 4 categories
  const defaultCategories = categories.slice(0, 4);
  const hiddenCategories = categories.slice(4);
  const displayedCategories = showAll ? categories : defaultCategories;

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

      {/* Compact pills/stacked bar view */}
      <div className="max-w-4xl mx-auto px-2">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 font-semibold"
                >
                  <span className="mr-1 sm:mr-2">{category.label}:</span>
                  <span className="font-bold text-gray-900">
                    {category.count.display}
                  </span>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show all toggle */}
        {hiddenCategories.length > 0 && (
          <div className="text-center">
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
  );
}

