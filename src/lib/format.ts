/**
 * Formatting helpers for metrics display.
 * Defaults to using provided display literals to guarantee exact rendering.
 */

/**
 * Format an integer from a literal display string or number.
 * Prefers the literal display string if provided to avoid locale formatting differences.
 */
export function formatIntFromLiteralOrIntl(
  value: number,
  literalDisplay?: string
): string {
  // Always prefer literal display string if provided
  if (literalDisplay !== undefined) {
    return literalDisplay;
  }
  // Fallback to Intl formatting only if no literal provided
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Format a percentage string.
 * Returns the literal string as-is to guarantee exact display.
 */
export function formatPercent(percentLiteral: string): string {
  return percentLiteral;
}

/**
 * Get display string from a metric object that has both number and display.
 */
export function getDisplayString<T extends { display: string }>(
  metric: T
): string {
  return metric.display;
}

