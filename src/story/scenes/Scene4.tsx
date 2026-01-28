import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { CalloutStrip } from "@/components/CalloutStrip";
import { BANT_VERIFIED } from "@/data/metrics";
import { motion } from "framer-motion";

export function Scene4() {
  const bantItems = [
    { label: "Budget", letter: "B" },
    { label: "Authority", letter: "A" },
    { label: "Need", letter: "N" },
    { label: "Timing", letter: "T" },
  ];

  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          804 calls had BANT evidence inside them.
        </h1>
      </div>

      {/* BANT Verified - Prominent display */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2">
        <div className="inline-block">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
            <AnimatedCounter
              targetNumber={BANT_VERIFIED.number}
              displayString={BANT_VERIFIED.display}
              duration={1.2}
            />
          </div>
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-700">
            BANT Verified
          </div>
        </div>
      </div>

      {/* Four stamped mini-cards with evidence meter style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-2">
        {bantItems.map((item, index) => (
          <motion.div
            key={item.letter}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden p-4 sm:p-5 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-300 shadow-md">
              {/* Stamped/evidence meter style design */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 sm:border-3 md:border-4 border-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600">{item.letter}</span>
                </div>
              </div>

              {/* Evidence meter bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gray-200">
                <motion.div
                  className="h-full bg-gray-700"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>

              <div className="relative z-10 text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {item.letter}
                </div>
                <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700 uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Callout strip */}
      <div className="mt-6 sm:mt-8 md:mt-10 px-2 max-w-4xl mx-auto">
        <CalloutStrip>
          BANT evidence was detected automatically in call transcripts. This means verified buyers are ready for sales action.
        </CalloutStrip>
      </div>

      {/* Deal value (no figures – illustrative) */}
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 px-2 max-w-4xl mx-auto">
        <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-green-50 via-white to-green-50 border-2 border-green-200 shadow-lg">
          <div className="text-center">
            <div className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 uppercase tracking-wide">
              Potential Deal Value
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Over a million in deal value
            </div>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Verified buyers from this period represented significant pipeline value; exact figures are not disclosed.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

