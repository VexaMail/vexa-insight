import { extractSndsRecords } from './extractSndsRecords'
import { parseSndsCsv } from './parseSndsCsv'

/** The row records of an SNDS report body, whether it came as CSV or JSON. */
export function toSndsRecords(
  body: unknown,
  csvColumns: readonly string[],
): readonly Record<string, unknown>[] {
  return typeof body === 'string'
    ? parseSndsCsv(body, csvColumns)
    : extractSndsRecords(body)
}
