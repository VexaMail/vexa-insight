export function extractSpfWarning(
  spfRecord: string,
  allSpfRecords: string[],
): string | null {
  if (allSpfRecords.length > 1) {
    return 'Multiple SPF records found. Only one is allowed per domain — this will cause a PermError.'
  }
  if (spfRecord.includes('~all')) {
    return 'SPF uses ~all (SoftFail). Consider -all (HardFail) for stricter enforcement.'
  }
  return null
}
