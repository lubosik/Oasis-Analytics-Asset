import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Badge } from "@/components/ui/badge";
import { CalloutStrip } from "@/components/CalloutStrip";
import { LEADS_PICKED_UP, DIDNT_PICK_UP, INDUSTRY_STANDARDS } from "@/data/metrics";

export function Scene2() {
  const total = LEADS_PICKED_UP.number + DIDNT_PICK_UP.number;
  const pickedUpPercent = (LEADS_PICKED_UP.number / total) * 100;
  const didntPickUpPercent = (DIDNT_PICK_UP.number / total) * 100;

  return (
    <div className="w-full">
      {/* Headline */}
      <div className="text-center mb-6 sm:mb-8 md:mb-12 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          This was a mixed lead pipeline.
        </h1>
        
        {/* Badges */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap px-2">
          <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2">
            Fresh inbound + older leads
          </Badge>
          <Badge variant="secondary" className="text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2">
            Follow-up + reactivation
          </Badge>
        </div>
      </div>

      {/* Split bar visual */}
      <div className="max-w-4xl mx-auto px-2">
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 text-center">
          <span>Pickup rate</span>
        </div>

        {/* Split bar */}
        <div className="relative h-20 sm:h-24 md:h-32 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
          {/* Picked up section */}
          <div
            className="absolute left-0 top-0 h-full bg-gray-700 flex items-center justify-center transition-all duration-1000"
            style={{ width: `${pickedUpPercent}%` }}
          >
            <div className="text-center px-2 sm:px-4">
              <div className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-2xl mb-0.5 sm:mb-1 break-words">
                <AnimatedCounter
                  targetNumber={LEADS_PICKED_UP.number}
                  displayString={LEADS_PICKED_UP.display}
                  duration={1.2}
                />
              </div>
              <div className="text-gray-200 text-[10px] sm:text-xs md:text-sm">
                Picked up ({LEADS_PICKED_UP.percent})
              </div>
            </div>
          </div>

          {/* Didn't pick up section */}
          <div
            className="absolute right-0 top-0 h-full bg-gray-300 flex items-center justify-center transition-all duration-1000"
            style={{ width: `${didntPickUpPercent}%` }}
          >
            <div className="text-center px-2 sm:px-4">
              <div className="text-gray-800 font-bold text-sm sm:text-base md:text-lg lg:text-2xl mb-0.5 sm:mb-1 break-words">
                <AnimatedCounter
                  targetNumber={DIDNT_PICK_UP.number}
                  displayString={DIDNT_PICK_UP.display}
                  duration={1.2}
                />
              </div>
              <div className="text-gray-600 text-[10px] sm:text-xs md:text-sm">
                No pickup / Voicemail ({DIDNT_PICK_UP.percent})
              </div>
            </div>
          </div>
        </div>

        {/* Callout strip */}
        <div className="mt-4 sm:mt-6 px-2">
          <CalloutStrip>
            Pickup rates vary by lead source. Older leads generally pick up less, so the impact is what happens after an answer.
          </CalloutStrip>
        </div>

        {/* Summary text with industry comparison */}
        <div className="mt-4 sm:mt-6 text-center space-y-1 sm:space-y-2 px-2">
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            {LEADS_PICKED_UP.percent} pickup rate
          </p>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
            Industry average: {INDUSTRY_STANDARDS.averagePickupRate} • {LEADS_PICKED_UP.percent} is 3-7x better
          </p>
        </div>
      </div>
    </div>
  );
}

