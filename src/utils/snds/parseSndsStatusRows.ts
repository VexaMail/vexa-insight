import { SNDS_STATUS_CSV_COLUMNS } from '@/constants/snds'
import type { SndsStatusRow } from '@/types/snds'
import { pickSndsField } from './pickSndsField'
import { toSndsRecords } from './toSndsRecords'
import { toSndsText } from './toSndsText'

/** Parses the SNDS IP status report (first IP, last IP, blocked, details). */
export function parseSndsStatusRows(body: unknown): SndsStatusRow[] {
  return toSndsRecords(body, SNDS_STATUS_CSV_COLUMNS).map((record) => {
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
