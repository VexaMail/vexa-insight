/** A selector TXT answer must identify DKIM key data, not an unrelated wildcard. */
export function isDkimKeyRecord(record: string): boolean {
  return /(?:^|;)\s*(?:v\s*=\s*DKIM|p\s*=|k\s*=\s*(?:rsa|ed25519)(?:\s*;|\s*$))/i.test(
    record,
  )
}
