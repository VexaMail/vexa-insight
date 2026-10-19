import { formatCount } from './formatters/formatCount'
import { formatRate } from './formatters/formatRate'

/** "91.0% from 99.2% of 1,396 messages" or "91.0% of 1,396 messages pass". */
export function complianceActionDetail(
  rate: number,
  previousRate: number | null,
  total: number,
): string {
  const of = `of ${formatCount(total)} messages`
  return previousRate === null
    ? `${formatRate(rate)} ${of} pass`
    : `${formatRate(rate)} ${of}, down from ${formatRate(previousRate)}`
}
