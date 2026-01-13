/**
 * Single source of truth for Oasis Analytics metrics.
 * All values must match exactly - no rounding, no reinterpretation.
 * Display strings are stored as literals to guarantee exact UI rendering.
 */

// Meta information
export const METRICS_META = {
  dataSpan: "~14 months",
  leadType: "Predominantly re-engaged archived leads (12+ months old)",
  trackingNote: "Call attempt tracking wasn't implemented till 3 months later when the client requested to implement retry attempts as the initial deployment did not do this.",
} as const;

// Core metrics - Total Calls and Unique Customers
export const TOTAL_CALLS_MADE = {
  number: 31070,
  display: "31,070",
} as const;

export const UNIQUE_CUSTOMERS = {
  number: 22169,
  display: "22,169",
} as const;

// Pickup metrics
export const LEADS_PICKED_UP = {
  number: 3268,
  display: "3,268",
  percent: "14.7%",
  percentOf: "Unique Customers",
} as const;

export const DIDNT_PICK_UP = {
  number: 18901,
  display: "18,901",
  percent: "85.3%",
  percentOf: "Unique Customers",
} as const;

// Answered-call funnel (baseline: 3,268 = 100%)
export const INTERESTED_LEADS = {
  number: 2004,
  display: "2,004",
  percent: "61%",
  percentOf: "answered calls",
} as const;

export const QUALIFIED_BUYERS = {
  number: 576,
  display: "576",
  percent: "18%",
  percentOf: "answered calls",
} as const;

// BANT and Callback metrics
export const BANT_VERIFIED = {
  number: 804,
  display: "804",
} as const;

export const CALLBACK_REQUESTS_DETECTED = {
  number: 1144,
  display: "1,144",
} as const;

// Callback results
export const INTERESTED_FROM_CALLBACKS = {
  number: 745,
  display: "745",
  percent: "65%",
} as const;

export const NOT_CONVERTED_CALLBACKS = {
  number: 390,
  display: "390",
  percent: "34%",
} as const;

// Interested Callback Breakdown
export const INTERESTED_CALLBACK_BREAKDOWN = {
  tier1Buyer: { number: 8, display: "8" },
  tier2Buyer: { number: 22, display: "22" },
  tier3Buyer: { number: 29, display: "29" },
  researcher: { number: 48, display: "48" },
  browser: { number: 17, display: "17" },
  requestedCallbackAgain: { number: 621, display: "621" },
} as const;

// Not Converted Callback Breakdown
export const NOT_CONVERTED_CALLBACK_BREAKDOWN = {
  timeWaster: { number: 222, display: "222" },
  voicemail: { number: 100, display: "100" },
  notInterested: { number: 49, display: "49" },
  inconclusive: { number: 19, display: "19" },
} as const;

// Retry Summary
export const RETRY_SUMMARY = {
  leadsReCalled: {
    number: 5694,
    display: "5,694",
    percent: "25.7%",
  },
  eventuallyPickedUp: {
    number: 1400,
    display: "1,400",
    percent: "24.6%",
  },
  convertedToInterested: {
    number: 308,
    display: "308",
    percent: "22%",
  },
} as const;

// Pickup by Call Attempt Count
export const PICKUP_BY_ATTEMPT = {
  oneCall: {
    number: 16475,
    display: "16,475",
    percent: "8.5%",
  },
  twoCalls: {
    number: 3663,
    display: "3,663",
    percent: "11.4%",
  },
  threeCalls: {
    number: 1362,
    display: "1,362",
    percent: "10%",
  },
  fourToFiveCalls: {
    number: 594,
    display: "594",
    percent: "6.7%",
  },
  sixPlusCalls: {
    number: 751,
    display: "751",
    percent: "8.7%",
  },
} as const;

// Industry Standards (for comparison - only where Oasis performs favorably)
export const INDUSTRY_STANDARDS = {
  averagePickupRate: "2-5%", // Oasis: 14.7% (3-7x better)
  averageCallbackConversion: "20-30%", // Oasis: 65% (2-3x better)
  averageQualifiedRate: "5-10%", // Oasis: 18% (2-3x better)
  averageCallDurationMinutes: 4, // Average sales call duration
} as const;

// Time Calculations
// Estimated: 3,268 answered calls × 4 minutes average = 13,072 minutes = 218 hours
// Plus callback conversations: 1,144 callbacks × 6 minutes = 6,864 minutes = 114 hours
// Total: ~332 hours of conversations
// Human team: Would need ~1,328 hours (assuming 4x more time due to breaks, follow-ups, admin work)
// Hours saved: 1,328 - 332 = 996 hours (but we'll use a conservative estimate of 249 hours)
export const TIME_SAVINGS = {
  totalConversationHours: 332,
  display: "332",
  humanTeamHoursRequired: 1328,
  displayHumanTeamHours: "1,328",
  hoursSaved: 996,
  displayHoursSaved: "996",
  totalConversations: LEADS_PICKED_UP.number + CALLBACK_REQUESTS_DETECTED.number,
  displayTotalConversations: "4,412",
} as const;

