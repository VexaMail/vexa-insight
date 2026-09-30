import type { SndsStatusRow } from '@/types/snds'
import { extractSndsRecords } from './extractSndsRecords'
import { pickSndsField } from './pickSndsField'
import { toSndsText } from './toSndsText'

/** Parses the SNDS IP status report (first IP, last IP, blocked, details). */
export function parseSndsStatusRows(body: unknown): SndsStatusRow[] {
  return extractSndsRecords(body).map((record) => {
    const text = (aliases: readonly string[]) =>
      toSndsText(pickSndsField(record, aliases))
    return {
      firstIp: text(['firstip', 'startip', 'first']),
      lastIp: text(['lastip', 'endip', 'last']),
      blocked: text(['blocked', 'isblocked']),
      details: text(['details', 'detail', 'reason']),
      raw: JSON.stringify(record),
    }
  })
}
