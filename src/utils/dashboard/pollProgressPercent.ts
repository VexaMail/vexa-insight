/** Whole-number progress of a poll, clamped to 0..100. */
export function pollProgressPercent(
  currentProcessed: number,
  totalEmails: number,
): number {
  const percentRaw =
    totalEmails > 0 ? (currentProcessed / totalEmails) * 100 : 0
  return Math.min(100, Math.max(0, Math.round(percentRaw)))
}
