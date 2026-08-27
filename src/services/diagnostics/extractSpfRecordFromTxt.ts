export function extractSpfRecordFromTxt(txtRecords: string[][]): string | null {
  const joined = txtRecords.map((chunks) => chunks.join(''))
  return joined.find((record) => record.startsWith('v=spf1')) ?? null
}
