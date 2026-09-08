/** Bar colour of a pass rate, on the same thresholds as its label. */
export function passRateBarClassName(passRatePercent: number): string {
  if (passRatePercent >= 95) return 'bg-success'
  if (passRatePercent >= 80) return 'bg-warning'
  return 'bg-danger'
}
