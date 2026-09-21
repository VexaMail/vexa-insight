/** Whether the DMARC record asks for aggregate reports. */
export function hasDmarcRua(dmarcRecord: string): boolean {
  return /rua=\s*mailto:/i.test(dmarcRecord)
}
