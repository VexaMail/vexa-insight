export function parseDmarcPolicy(dmarcRecord: string): string | null {
  const match = /p=([a-z]+)/i.exec(dmarcRecord)
  return match?.[1]?.toLowerCase() ?? null
}
