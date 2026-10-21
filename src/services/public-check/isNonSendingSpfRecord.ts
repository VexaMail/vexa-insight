export function isNonSendingSpfRecord(record: string | null): boolean {
  return record !== null && /^v=spf1\s+-all\s*$/.test(record)
}
