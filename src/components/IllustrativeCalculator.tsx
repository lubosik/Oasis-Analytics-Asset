import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { TOTAL_CALLS_MADE, DIDNT_PICK_UP } from "@/data/metrics";

/**
 * Illustrative calculator for time savings and labor cost estimates.
 * OFF by default, clearly labeled as illustrative/estimates.
 */
export function IllustrativeCalculator() {
  const [enabled, setEnabled] = useState(false);
  const [useDidntPickUp, setUseDidntPickUp] = useState(true); // Default to DIDNT_PICK_UP as primary driver
  const [minutesPerCall, setMinutesPerCall] = useState(4);
  const [salaryBenchmark, setSalaryBenchmark] = useState<"careerOneStop" | "indeed" | "custom">("careerOneStop");
  const [customHourlyRate, setCustomHourlyRate] = useState(25);

  // Default assumptions
  const careerOneStopHourly = 25.50; // US DOL CareerOneStop sales rep average
  const indeedHourly = 28.75; // Indeed-reported inside sales rep average base

  const hourlyRate = salaryBenchmark === "careerOneStop" 
    ? careerOneStopHourly 
    : salaryBenchmark === "indeed" 
    ? indeedHourly 
    : customHourlyRate;

  // Use DIDNT_PICK_UP (18,901) as primary driver, or TOTAL_CALLS_MADE as alternative
  const callVolume = useDidntPickUp ? DIDNT_PICK_UP.number : TOTAL_CALLS_MADE.number;
  
  // Calculations
  const totalMinutes = callVolume * minutesPerCall;
  const totalHours = Math.round(totalMinutes / 60);
  const totalMonths = Math.round((totalHours / 160) * 10) / 10; // 160 hours per month
  const laborCost = Math.round(totalHours * hourlyRate);

  return (
    <Card className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200">
      <div className="space-y-4 sm:space-y-6">
        {/* Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label htmlFor="calculator-toggle" className="text-sm sm:text-base font-semibold text-gray-900">
              Illustrative calculator
            </Label>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-2">
              <strong>What it is:</strong> This calculator shows what this call volume could replace in human time, under adjustable assumptions. It converts call attempts into hours, months, and estimated labor costs.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              <strong>How to use:</strong> Toggle ON to see estimates. Adjust the "minutes per call" and "salary benchmark" to match your assumptions. Results update automatically.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 italic">
              OFF by default. Shows estimates only, not guarantees.
            </p>
          </div>
          <Switch
            id="calculator-toggle"
            checked={enabled}
            onCheckedChange={setEnabled}
            aria-label="Toggle illustrative calculator"
          />
        </div>

        {enabled && (
          <div className="space-y-4 sm:space-y-6 pt-4 border-t border-yellow-300">
            {/* Assumptions */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="call-volume" className="text-xs sm:text-sm font-medium text-gray-700">
                  Call volume basis
                </Label>
                <Select value={useDidntPickUp ? "didntPickUp" : "totalCalls"} onValueChange={(v) => setUseDidntPickUp(v === "didntPickUp")}>
                  <SelectTrigger id="call-volume" className="mt-1 max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="didntPickUp">
                      Didn't Pick Up / Voicemail ({DIDNT_PICK_UP.display})
                    </SelectItem>
                    <SelectItem value="totalCalls">
                      Total Calls Made ({TOTAL_CALLS_MADE.display})
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Focus on no-answer attempts (primary driver) or all calls
                </p>
              </div>

              <div>
                <Label htmlFor="minutes-per-call" className="text-xs sm:text-sm font-medium text-gray-700">
                  Minutes of manual handling per call attempt
                </Label>
                <Input
                  id="minutes-per-call"
                  type="number"
                  min="1"
                  max="60"
                  value={minutesPerCall}
                  onChange={(e) => setMinutesPerCall(Math.max(1, Math.min(60, parseInt(e.target.value) || 4)))}
                  className="mt-1 max-w-32"
                />
              </div>

              <div>
                <Label htmlFor="salary-benchmark" className="text-xs sm:text-sm font-medium text-gray-700">
                  Salary benchmark source
                </Label>
                <Select value={salaryBenchmark} onValueChange={(v: "careerOneStop" | "indeed" | "custom") => setSalaryBenchmark(v)}>
                  <SelectTrigger id="salary-benchmark" className="mt-1 max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="careerOneStop">
                      CareerOneStop-based benchmark (example): ${careerOneStopHourly.toFixed(2)}/hr
                    </SelectItem>
                    <SelectItem value="indeed">
                      Alternative benchmark (example): ${indeedHourly.toFixed(2)}/hr
                    </SelectItem>
                    <SelectItem value="custom">
                      Custom hourly rate
                    </SelectItem>
                  </SelectContent>
                </Select>
                {salaryBenchmark === "custom" && (
                  <div className="mt-2">
                    <Label htmlFor="custom-hourly" className="text-xs sm:text-sm font-medium text-gray-700">
                      Custom hourly rate ($)
                    </Label>
                    <Input
                      id="custom-hourly"
                      type="number"
                      min="1"
                      value={customHourlyRate}
                      onChange={(e) => setCustomHourlyRate(Math.max(1, parseFloat(e.target.value) || 25))}
                      className="mt-1 max-w-32"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border-2 border-gray-200 space-y-3">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                  ~{totalHours.toLocaleString()} hours
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">
                  ≈ {totalMonths} months
                </div>
                <div className="text-sm sm:text-base md:text-lg text-gray-600">
                  of human work
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    ${laborCost.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Illustrative labor cost equivalent at ${hourlyRate.toFixed(2)}/hour
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 italic">
                    Based on {callVolume.toLocaleString()} calls × {minutesPerCall} min/call
                  </p>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="text-center">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors">
                    <Info className="h-3 w-3" />
                    <span>Sources</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="font-semibold text-gray-900">Salary Benchmarks:</p>
                    {salaryBenchmark === "careerOneStop" ? (
                      <p className="text-gray-700">
                        CareerOneStop (US Department of Labor): Sales Representative average hourly wage. Source:{" "}
                        <a href="https://www.careeronestop.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          careeronestop.org
                        </a>
                      </p>
                    ) : (
                      <p className="text-gray-700">
                        Indeed-reported average base salary for inside sales representatives. Source:{" "}
                        <a href="https://www.indeed.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          indeed.com
                        </a>
                      </p>
                    )}
                    <p className="text-gray-600 italic mt-2">
                      Note: This is an illustrative estimate based on assumptions. Not a guarantee of actual savings.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

