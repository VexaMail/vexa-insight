import type { ReportSource } from '@/types/reports'

/**
 * Returns the most common disposition across all sources in the report.
 * Falls back to 'none' if the sources array is empty.
 */
export function deriveDominantDisposition(sources: ReportSource[]): string {
  if (sources.length === 0) return 'none'

  const counts = new Map<string, number>()
  for (const source of sources) {
    const prev = counts.get(source.disposition) ?? 0
    counts.set(source.disposition, prev + source.messageCount)
  }

  let dominant = 'none'
  let maxCount = 0
  for (const [disposition, count] of counts) {
    if (count > maxCount) {
      dominant = disposition
      maxCount = count
    }
  }

  return dominant
}
