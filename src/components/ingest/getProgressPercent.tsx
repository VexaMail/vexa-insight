export function getProgressPercent(
  currentProcessed: number,
  totalEmails: number,
) {
  if (totalEmails <= 0) return 0
  return Math.min(100, Math.max(0, (currentProcessed / totalEmails) * 100))
}
