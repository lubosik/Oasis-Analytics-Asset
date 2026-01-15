import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStoryContext } from "@/contexts/StoryContext";

/**
 * About Oasis context module - appears after Scene 1 or at beginning of Scene 2.
 * Extremely short and skimmable (chips/cards, not paragraphs).
 */
export function AboutOasis() {
  const { viewMode } = useStoryContext();

  return (
    <div className="w-full max-w-4xl mx-auto px-2 mb-8 sm:mb-12">
      <Card className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              About Oasis
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1.5">
                Always-on caller
              </Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1.5">
                Autopilot follow-up
              </Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1.5">
                Instant qualification
              </Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1.5">
                Speed-to-lead
              </Badge>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-2">
              <strong className="text-gray-900">Oasis Estate Agents</strong> is a real estate company based in Staines-upon-Thames, UK. This case study shows results from implementing Velto's AI system for their sales team.
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <strong className="text-gray-900">Velto</strong> is the tech company that implemented this AI system. The system helps sales teams with high-intent buyer conversations and works for fresh inbound and older leads.
            </p>
          </div>

          {viewMode === "private" && (
            <div className="pt-3 sm:pt-4 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                <strong className="text-gray-900">Client-reported deal range:</strong> $80,000 - $2,500,000
              </p>
              <p className="text-xs sm:text-sm text-gray-500 italic">
                High-ticket buyer context: [CLIENT-PROVIDED RANGE / DESCRIPTION]
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

