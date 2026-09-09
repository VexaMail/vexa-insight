/**
 * The `record` element parses to an object for one record and an array for
 * several; both shapes come back as an array.
 */
export function feedbackRecordList(
  feedback: Record<string, unknown>,
): Record<string, unknown>[] {
  const recordList = feedback['record']
  if (Array.isArray(recordList)) {
    return [...(recordList as Record<string, unknown>[])]
  }
  if (recordList) return [recordList as Record<string, unknown>]
  return []
}
