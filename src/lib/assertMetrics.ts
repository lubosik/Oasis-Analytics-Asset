/**
 * Assertions to validate metrics match required values exactly.
 * This is a guardrail against accidental edits.
 * Throws a clear error if any metric literal differs from required values.
 */

import {
  TOTAL_CALLS_MADE,
  UNIQUE_CUSTOMERS,
  LEADS_PICKED_UP,
  DIDNT_PICK_UP,
  INTERESTED_LEADS,
  QUALIFIED_BUYERS,
  BANT_VERIFIED,
  CALLBACK_REQUESTS_DETECTED,
  INTERESTED_FROM_CALLBACKS,
  NOT_CONVERTED_CALLBACKS,
  INTERESTED_CALLBACK_BREAKDOWN,
  NOT_CONVERTED_CALLBACK_BREAKDOWN,
  RETRY_SUMMARY,
  PICKUP_BY_ATTEMPT,
} from "@/data/metrics";

interface AssertionError {
  metric: string;
  expected: string | number;
  actual: string | number;
}

const errors: AssertionError[] = [];

function assertEqual(
  metric: string,
  expected: string | number,
  actual: string | number
): void {
  if (expected !== actual) {
    errors.push({ metric, expected, actual });
  }
}

/**
 * Run all metric assertions.
 * Throws an error if any assertion fails.
 */
export function assertMetrics(): void {
  errors.length = 0; // Clear any previous errors

  // Core metrics
  assertEqual("TOTAL_CALLS_MADE.number", 31070, TOTAL_CALLS_MADE.number);
  assertEqual("TOTAL_CALLS_MADE.display", "31,070", TOTAL_CALLS_MADE.display);
  assertEqual("UNIQUE_CUSTOMERS.number", 22169, UNIQUE_CUSTOMERS.number);
  assertEqual("UNIQUE_CUSTOMERS.display", "22,169", UNIQUE_CUSTOMERS.display);

  // Pickup metrics
  assertEqual("LEADS_PICKED_UP.number", 3268, LEADS_PICKED_UP.number);
  assertEqual("LEADS_PICKED_UP.display", "3,268", LEADS_PICKED_UP.display);
  assertEqual("LEADS_PICKED_UP.percent", "14.7%", LEADS_PICKED_UP.percent);
  assertEqual("DIDNT_PICK_UP.number", 18901, DIDNT_PICK_UP.number);
  assertEqual("DIDNT_PICK_UP.display", "18,901", DIDNT_PICK_UP.display);
  assertEqual("DIDNT_PICK_UP.percent", "85.3%", DIDNT_PICK_UP.percent);

  // Funnel metrics
  assertEqual("INTERESTED_LEADS.number", 2004, INTERESTED_LEADS.number);
  assertEqual("INTERESTED_LEADS.display", "2,004", INTERESTED_LEADS.display);
  assertEqual("INTERESTED_LEADS.percent", "61%", INTERESTED_LEADS.percent);
  assertEqual("QUALIFIED_BUYERS.number", 576, QUALIFIED_BUYERS.number);
  assertEqual("QUALIFIED_BUYERS.display", "576", QUALIFIED_BUYERS.display);
  assertEqual("QUALIFIED_BUYERS.percent", "18%", QUALIFIED_BUYERS.percent);

  // BANT and Callbacks
  assertEqual("BANT_VERIFIED.number", 804, BANT_VERIFIED.number);
  assertEqual("BANT_VERIFIED.display", "804", BANT_VERIFIED.display);
  assertEqual(
    "CALLBACK_REQUESTS_DETECTED.number",
    1144,
    CALLBACK_REQUESTS_DETECTED.number
  );
  assertEqual(
    "CALLBACK_REQUESTS_DETECTED.display",
    "1,144",
    CALLBACK_REQUESTS_DETECTED.display
  );

  // Callback results
  assertEqual(
    "INTERESTED_FROM_CALLBACKS.number",
    745,
    INTERESTED_FROM_CALLBACKS.number
  );
  assertEqual(
    "INTERESTED_FROM_CALLBACKS.display",
    "745",
    INTERESTED_FROM_CALLBACKS.display
  );
  assertEqual(
    "INTERESTED_FROM_CALLBACKS.percent",
    "65%",
    INTERESTED_FROM_CALLBACKS.percent
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACKS.number",
    390,
    NOT_CONVERTED_CALLBACKS.number
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACKS.display",
    "390",
    NOT_CONVERTED_CALLBACKS.display
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACKS.percent",
    "34%",
    NOT_CONVERTED_CALLBACKS.percent
  );

  // Interested Callback Breakdown
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.tier1Buyer.number",
    8,
    INTERESTED_CALLBACK_BREAKDOWN.tier1Buyer.number
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.tier1Buyer.display",
    "8",
    INTERESTED_CALLBACK_BREAKDOWN.tier1Buyer.display
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.tier2Buyer.number",
    22,
    INTERESTED_CALLBACK_BREAKDOWN.tier2Buyer.number
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.tier2Buyer.display",
    "22",
    INTERESTED_CALLBACK_BREAKDOWN.tier2Buyer.display
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.tier3Buyer.number",
    29,
    INTERESTED_CALLBACK_BREAKDOWN.tier3Buyer.number
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.tier3Buyer.display",
    "29",
    INTERESTED_CALLBACK_BREAKDOWN.tier3Buyer.display
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.researcher.number",
    48,
    INTERESTED_CALLBACK_BREAKDOWN.researcher.number
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.researcher.display",
    "48",
    INTERESTED_CALLBACK_BREAKDOWN.researcher.display
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.browser.number",
    17,
    INTERESTED_CALLBACK_BREAKDOWN.browser.number
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.browser.display",
    "17",
    INTERESTED_CALLBACK_BREAKDOWN.browser.display
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.requestedCallbackAgain.number",
    621,
    INTERESTED_CALLBACK_BREAKDOWN.requestedCallbackAgain.number
  );
  assertEqual(
    "INTERESTED_CALLBACK_BREAKDOWN.requestedCallbackAgain.display",
    "621",
    INTERESTED_CALLBACK_BREAKDOWN.requestedCallbackAgain.display
  );

  // Not Converted Callback Breakdown
  assertEqual(
    "NOT_CONVERTED_CALLBACK_BREAKDOWN.timeWaster.number",
    222,
    NOT_CONVERTED_CALLBACK_BREAKDOWN.timeWaster.number
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACK_BREAKDOWN.timeWaster.display",
    "222",
    NOT_CONVERTED_CALLBACK_BREAKDOWN.timeWaster.display
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACK_BREAKDOWN.voicemail.number",
    100,
    NOT_CONVERTED_CALLBACK_BREAKDOWN.voicemail.number
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACK_BREAKDOWN.voicemail.display",
    "100",
    NOT_CONVERTED_CALLBACK_BREAKDOWN.voicemail.display
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACK_BREAKDOWN.notInterested.number",
    49,
    NOT_CONVERTED_CALLBACK_BREAKDOWN.notInterested.number
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACK_BREAKDOWN.notInterested.display",
    "49",
    NOT_CONVERTED_CALLBACK_BREAKDOWN.notInterested.display
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACK_BREAKDOWN.inconclusive.number",
    19,
    NOT_CONVERTED_CALLBACK_BREAKDOWN.inconclusive.number
  );
  assertEqual(
    "NOT_CONVERTED_CALLBACK_BREAKDOWN.inconclusive.display",
    "19",
    NOT_CONVERTED_CALLBACK_BREAKDOWN.inconclusive.display
  );

  // Retry Summary
  assertEqual(
    "RETRY_SUMMARY.leadsReCalled.number",
    5694,
    RETRY_SUMMARY.leadsReCalled.number
  );
  assertEqual(
    "RETRY_SUMMARY.leadsReCalled.display",
    "5,694",
    RETRY_SUMMARY.leadsReCalled.display
  );
  assertEqual(
    "RETRY_SUMMARY.leadsReCalled.percent",
    "25.7%",
    RETRY_SUMMARY.leadsReCalled.percent
  );
  assertEqual(
    "RETRY_SUMMARY.eventuallyPickedUp.number",
    1400,
    RETRY_SUMMARY.eventuallyPickedUp.number
  );
  assertEqual(
    "RETRY_SUMMARY.eventuallyPickedUp.display",
    "1,400",
    RETRY_SUMMARY.eventuallyPickedUp.display
  );
  assertEqual(
    "RETRY_SUMMARY.eventuallyPickedUp.percent",
    "24.6%",
    RETRY_SUMMARY.eventuallyPickedUp.percent
  );
  assertEqual(
    "RETRY_SUMMARY.convertedToInterested.number",
    308,
    RETRY_SUMMARY.convertedToInterested.number
  );
  assertEqual(
    "RETRY_SUMMARY.convertedToInterested.display",
    "308",
    RETRY_SUMMARY.convertedToInterested.display
  );
  assertEqual(
    "RETRY_SUMMARY.convertedToInterested.percent",
    "22%",
    RETRY_SUMMARY.convertedToInterested.percent
  );

  // Pickup by Attempt
  assertEqual(
    "PICKUP_BY_ATTEMPT.oneCall.number",
    16475,
    PICKUP_BY_ATTEMPT.oneCall.number
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.oneCall.display",
    "16,475",
    PICKUP_BY_ATTEMPT.oneCall.display
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.oneCall.percent",
    "8.5%",
    PICKUP_BY_ATTEMPT.oneCall.percent
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.twoCalls.number",
    3663,
    PICKUP_BY_ATTEMPT.twoCalls.number
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.twoCalls.display",
    "3,663",
    PICKUP_BY_ATTEMPT.twoCalls.display
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.twoCalls.percent",
    "11.4%",
    PICKUP_BY_ATTEMPT.twoCalls.percent
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.threeCalls.number",
    1362,
    PICKUP_BY_ATTEMPT.threeCalls.number
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.threeCalls.display",
    "1,362",
    PICKUP_BY_ATTEMPT.threeCalls.display
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.threeCalls.percent",
    "10%",
    PICKUP_BY_ATTEMPT.threeCalls.percent
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.fourToFiveCalls.number",
    594,
    PICKUP_BY_ATTEMPT.fourToFiveCalls.number
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.fourToFiveCalls.display",
    "594",
    PICKUP_BY_ATTEMPT.fourToFiveCalls.display
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.fourToFiveCalls.percent",
    "6.7%",
    PICKUP_BY_ATTEMPT.fourToFiveCalls.percent
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.sixPlusCalls.number",
    751,
    PICKUP_BY_ATTEMPT.sixPlusCalls.number
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.sixPlusCalls.display",
    "751",
    PICKUP_BY_ATTEMPT.sixPlusCalls.display
  );
  assertEqual(
    "PICKUP_BY_ATTEMPT.sixPlusCalls.percent",
    "8.7%",
    PICKUP_BY_ATTEMPT.sixPlusCalls.percent
  );

  // If any errors, throw with clear message
  if (errors.length > 0) {
    const errorMessages = errors
      .map(
        (e) => `  ${e.metric}: expected ${e.expected}, got ${e.actual}`
      )
      .join("\n");
    throw new Error(
      `Metrics assertion failed:\n${errorMessages}\n\nPlease check src/data/metrics.ts and ensure all values match exactly.`
    );
  }
}

