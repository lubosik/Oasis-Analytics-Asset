import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { IllustrativeCalculator } from "@/components/IllustrativeCalculator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import {
  BANT_VERIFIED,
  QUALIFIED_BUYERS,
  INTERESTED_LEADS,
  CALLBACK_REQUESTS_DETECTED,
  TIME_SAVINGS,
} from "@/data/metrics";
import { useStoryContext } from "@/contexts/StoryContext";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Phone, Zap } from "lucide-react";

export function Scene9() {
  const { proofMode } = useStoryContext();

  const queueItems = [
    {
      icon: CheckCircle2,
      title: "BANT Verified",
      count: BANT_VERIFIED.number,
      display: BANT_VERIFIED.display,
      label: "Ready for sales action",
      color: "text-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
    },
    {
      icon: Clock,
      title: "Interested",
      count: INTERESTED_LEADS.number,
      display: INTERESTED_LEADS.display,
      label: "Engaged, needs follow-up",
      color: "text-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      icon: Phone,
      title: "Callback requested",
      count: CALLBACK_REQUESTS_DETECTED.number,
      display: CALLBACK_REQUESTS_DETECTED.display,
      label: "Call at requested time",
      color: "text-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
  ];

  // Add Qualified Buyers as optional context in proof mode
  if (proofMode) {
    queueItems.push({
      icon: CheckCircle2,
      title: "Qualified Buyers (client-defined)",
      count: QUALIFIED_BUYERS.number,
      display: QUALIFIED_BUYERS.display,
      label: "Client's internal qualification rules",
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    });
  }

  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Your sales team wakes up to a prioritized list.
        </h1>
      </div>

      {/* Mock CRM-style list */}
      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 px-2">
        {queueItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card
                className={`${item.bgColor} ${item.borderColor} border-2 p-4 sm:p-5 md:p-6 lg:p-8 hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
                    <div
                      className={`${item.color} p-2 sm:p-3 rounded-lg bg-white border border-gray-200 flex-shrink-0`}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    </div>
                    <div className="min-w-0 flex-1 sm:flex-none">
                      <div className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-0.5 sm:mb-1">
                        {item.title}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base text-gray-600">
                        {item.label}
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 break-words">
                      <AnimatedCounter
                        targetNumber={item.count}
                        displayString={item.display}
                        duration={1.2}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Time Savings Section */}
      <div className="max-w-4xl mx-auto mt-8 sm:mt-10 md:mt-12 lg:mt-16 px-2 space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-2 border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold">Hours Saved</h3>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 break-words">
              <AnimatedCounter
                targetNumber={TIME_SAVINGS.hoursSaved}
                displayString={TIME_SAVINGS.displayHoursSaved}
                duration={1.2}
              />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-300">
              Estimated time saved vs human team
            </p>
          </Card>

          <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 flex-shrink-0" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Total Conversations</h3>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
              <AnimatedCounter
                targetNumber={TIME_SAVINGS.totalConversations}
                displayString={TIME_SAVINGS.displayTotalConversations}
                duration={1.2}
              />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {TIME_SAVINGS.totalConversationHours} hours of conversations handled
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2">
              Human team would need ~{TIME_SAVINGS.displayHumanTeamHours} hours
            </p>
          </Card>
        </motion.div>

        {/* Illustrative Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <IllustrativeCalculator />
        </motion.div>
      </div>
    </div>
  );
}

