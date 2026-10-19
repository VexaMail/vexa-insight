import type { DkimRecord } from '@/types/diagnostics'

/** "default, dkim, mail, smtp, google and 21 more": the selectors probed. */
export function describeCheckedSelectors(
  records: readonly DkimRecord[],
): string {
  const names = records.map((record) => record.selector)
  const shown = names.slice(0, 5).join(', ')
  const rest = names.length - 5
  return rest > 0 ? `${shown} and ${String(rest)} more` : shown
}
