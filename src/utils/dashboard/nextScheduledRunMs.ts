/**
 * Next firing of the ingest cron `*\/N * * * *` after `nowMs`: the next minute
 * of the hour divisible by N (minute 0 only when N is 60 or more), local time.
 */
export function nextScheduledRunMs(
  nowMs: number,
  intervalMinutes: number,
): number {
  const step = Math.max(1, intervalMinutes)
  const next = new Date(nowMs)
  next.setSeconds(0, 0)
  for (let i = 0; i < 24 * 60; i++) {
    next.setMinutes(next.getMinutes() + 1)
    const minute = next.getMinutes()
    if (step >= 60 ? minute === 0 : minute % step === 0) break
  }
  return next.getTime()
}
