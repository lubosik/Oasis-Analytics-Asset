import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { TOTAL_CALLS_MADE, UNIQUE_CUSTOMERS, METRICS_META } from "@/data/metrics";
import { motion } from "framer-motion";

export function Scene1() {
  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          Leads → real conversations → real buyers.
        </h1>
      </div>

      {/* Two huge metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto px-2">
        {/* Calls Card */}
        <Card className="relative overflow-hidden p-6 sm:p-8 md:p-12 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 border-2 border-gray-200 shadow-lg">
          {/* Subtle animated background */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10">
            <div className="text-xs sm:text-sm md:text-base text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">
              Total Calls Made
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
              <AnimatedCounter
                targetNumber={TOTAL_CALLS_MADE.number}
                displayString={TOTAL_CALLS_MADE.display}
                duration={1.5}
              />
            </div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">calls</div>
          </div>
        </Card>

        {/* Unique Leads Card */}
        <Card className="relative overflow-hidden p-6 sm:p-8 md:p-12 bg-gradient-to-br from-purple-50 via-gray-50 to-blue-50 border-2 border-gray-200 shadow-lg">
          {/* Subtle animated background */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10">
            <div className="text-xs sm:text-sm md:text-base text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">
              Unique Customers
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
              <AnimatedCounter
                targetNumber={UNIQUE_CUSTOMERS.number}
                displayString={UNIQUE_CUSTOMERS.display}
                duration={1.5}
              />
            </div>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">unique leads</div>
          </div>
        </Card>
      </div>

      {/* Support line and credibility */}
      <div className="text-center mt-6 sm:mt-8 md:mt-12 space-y-1 sm:space-y-2 px-2">
        <p className="text-base sm:text-lg md:text-xl text-gray-700">
          Works on fresh inbound and older leads. This case study highlights reactivation.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-gray-500">
          {METRICS_META.dataSpan} of data.
        </p>
      </div>
    </div>
  );
}

