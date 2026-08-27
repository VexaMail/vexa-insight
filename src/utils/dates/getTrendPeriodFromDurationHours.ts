export function getTrendPeriodFromDurationHours(
  durationHours: number,
): 'hour' | 'day' {
  return durationHours <= 48 ? 'hour' : 'day'
}
