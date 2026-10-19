/**
 * Next tick of the scheduler's `* /N * * * *` cron (written without the
 * space), in server-local time. The step runs over minutes 0-59, so an
 * interval of 60 or more fires only at minute 0, every hour.
 */
export function computeNextScheduledRun(
  now: Date,
  intervalMinutes: number,
): Date {
  const step = Math.max(1, Math.floor(intervalMinutes))
  const next = new Date(now)
  next.setSeconds(0, 0)
  next.setMinutes(next.getMinutes() + 1)
  for (let i = 0; i < 60 && next.getMinutes() % step !== 0; i += 1) {
    next.setMinutes(next.getMinutes() + 1)
  }
  return next
}
