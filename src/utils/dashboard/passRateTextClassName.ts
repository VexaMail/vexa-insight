/** Text colour of a pass rate: green from 95%, amber from 80%, red below. */
export function passRateTextClassName(passRatePercent: number): string {
  if (passRatePercent >= 95) return 'text-success'
  if (passRatePercent >= 80) return 'text-warning'
  return 'text-danger'
}
