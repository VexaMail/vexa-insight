/** Date `hours` after `from`, used for the lookup schedule. */
export function hoursFromNow(from: Date, hours: number): Date {
  return new Date(from.getTime() + hours * 60 * 60 * 1000)
}
