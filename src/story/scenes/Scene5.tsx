import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Card } from "@/components/ui/card";
import { CalloutStrip } from "@/components/CalloutStrip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  CALLBACK_REQUESTS_DETECTED,
  INTERESTED_FROM_CALLBACKS,
  NOT_CONVERTED_CALLBACKS,
  INTERESTED_CALLBACK_BREAKDOWN,
  NOT_CONVERTED_CALLBACK_BREAKDOWN,
  INDUSTRY_STANDARDS,
} from "@/data/metrics";
import { useStoryContext } from "@/contexts/StoryContext";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export function Scene5() {
  const { proofMode } = useStoryContext();

  // Compute buyer tiers aggregate (without showing individual tiers)
  const buyersIdentifiedTotal =
    INTERESTED_CALLBACK_BREAKDOWN.tier1Buyer.number +
    INTERESTED_CALLBACK_BREAKDOWN.tier2Buyer.number +
    INTERESTED_CALLBACK_BREAKDOWN.tier3Buyer.number;
  const buyersIdentifiedDisplay = buyersIdentifiedTotal.toLocaleString();

  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          1,144 people literally asked to be called back.
        </h1>
      </div>

      {/* Callback timeline animation */}
      <div className="max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <Phone className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-gray-600 flex-shrink-0" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">
              <AnimatedCounter
                targetNumber={CALLBACK_REQUESTS_DETECTED.number}
                displayString={CALLBACK_REQUESTS_DETECTED.display}
                duration={1.2}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "60px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden sm:block h-1 bg-gray-300"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 text-center sm:text-left"
          >
            Callback requests
          </motion.div>
        </div>
      </div>

      {/* Callout strip */}
      <div className="mb-6 sm:mb-8 px-2 max-w-4xl mx-auto">
        <CalloutStrip>
          When people ask for a callback, the system doesn't drop the ball. It can follow up at the requested time, including awkward times or time zones, and can confirm intent before you ever have to pick up the phone.
        </CalloutStrip>
      </div>

      {/* Buyer identification and interested results */}
      <div className="max-w-5xl mx-auto mb-6 sm:mb-8 px-2 space-y-4 sm:space-y-6">
        {/* Buyers identified card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-700 shadow-lg">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2 break-words">
                <AnimatedCounter
                  targetNumber={buyersIdentifiedTotal}
                  displayString={buyersIdentifiedDisplay}
                  duration={1.2}
                />
              </div>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-0.5 sm:mb-1">
                Buyers identified (client-defined tiers)
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                Buyer tiers were defined by the client; breakdown withheld.
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Interested from callbacks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 via-gray-50 to-white border-2 border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                <AnimatedCounter
                  targetNumber={INTERESTED_FROM_CALLBACKS.number}
                  displayString={INTERESTED_FROM_CALLBACKS.display}
                  duration={1.2}
                />
              </div>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-0.5 sm:mb-1">
                Interested from callbacks
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-600">
                ({INTERESTED_FROM_CALLBACKS.percent})
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Not Converted - Only in proof mode */}
        {proofMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-lg">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 mb-1 sm:mb-2 break-words">
                  <AnimatedCounter
                    targetNumber={NOT_CONVERTED_CALLBACKS.number}
                    displayString={NOT_CONVERTED_CALLBACKS.display}
                    duration={1.2}
                  />
                </div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-0.5 sm:mb-1">
                  Didn't convert
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-600">
                  ({NOT_CONVERTED_CALLBACKS.percent})
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Industry comparison */}
      <div className="text-center mt-4 sm:mt-6 mb-6 sm:mb-8 px-2">
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
          Industry average callback conversion: {INDUSTRY_STANDARDS.averageCallbackConversion} • {INTERESTED_FROM_CALLBACKS.percent} is 2-3x better
        </p>
      </div>

      {/* Detailed breakdown - always available but collapsed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-2"
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="breakdown" className="border-2 border-gray-200 rounded-lg px-2 sm:px-3 md:px-4">
            <AccordionTrigger className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 hover:no-underline py-3 sm:py-4">
              View detailed breakdown
            </AccordionTrigger>
            <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 overflow-x-auto">
                  {/* Interested Callback Breakdown */}
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                      Interested Callback Breakdown
                    </h3>
                    <div className="border rounded-lg overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-1/2">Category</TableHead>
                            <TableHead className="text-right">Count</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Buyers identified (client-defined tiers)</TableCell>
                            <TableCell className="text-right font-medium">
                              {buyersIdentifiedDisplay}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Researcher</TableCell>
                            <TableCell className="text-right font-medium">
                              {INTERESTED_CALLBACK_BREAKDOWN.researcher.display}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Browser</TableCell>
                            <TableCell className="text-right font-medium">
                              {INTERESTED_CALLBACK_BREAKDOWN.browser.display}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Requested Callback Again</TableCell>
                            <TableCell className="text-right font-medium">
                              {INTERESTED_CALLBACK_BREAKDOWN.requestedCallbackAgain.display}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Not Converted Callback Breakdown */}
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                      Not Converted Callback Breakdown
                    </h3>
                    <div className="border rounded-lg overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-1/2">Category</TableHead>
                            <TableHead className="text-right">Count</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Time Waster</TableCell>
                            <TableCell className="text-right font-medium">
                              {NOT_CONVERTED_CALLBACK_BREAKDOWN.timeWaster.display}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Voicemail</TableCell>
                            <TableCell className="text-right font-medium">
                              {NOT_CONVERTED_CALLBACK_BREAKDOWN.voicemail.display}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Not Interested</TableCell>
                            <TableCell className="text-right font-medium">
                              {NOT_CONVERTED_CALLBACK_BREAKDOWN.notInterested.display}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Inconclusive</TableCell>
                            <TableCell className="text-right font-medium">
                              {NOT_CONVERTED_CALLBACK_BREAKDOWN.inconclusive.display}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
    </div>
  );
}

