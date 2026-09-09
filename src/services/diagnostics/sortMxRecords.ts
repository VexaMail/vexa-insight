import type { MxRecord } from '@/types/diagnostics'

/** MX records ascending by priority, reduced to the two published fields. */
export function sortMxRecords(mxRecords: readonly MxRecord[]): MxRecord[] {
  return mxRecords
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .map(({ priority, exchange }) => ({ priority, exchange }))
}
