import type { AuthRateDisplay } from '@/types/domains'
import { formatPercent } from '../../formatters/formatPercent'

/** A pass count out of a total as a pill: Pass, Fail or the passing share. */
export function describeAuthRate(pass: number, total: number): AuthRateDisplay {
  if (total <= 0) return { tone: 'unknown', label: 'No data', title: '' }
  const title = `${pass.toLocaleString('en-US')} of ${total.toLocaleString('en-US')} messages pass`
  if (pass >= total) return { tone: 'success', label: 'Pass', title }
  if (pass <= 0) return { tone: 'danger', label: 'Fail', title }
  const percent = Math.floor((pass / total) * 1000) / 10
  return { tone: 'warning', label: formatPercent(percent), title }
}
