/** The same DMARC record with its `p=` tag set to `policy`; `sp=` is untouched. */
export function withDmarcPolicy(record: string, policy: string): string {
  return record.replace(/(^|;)(\s*)p=[a-z]+/i, `$1$2p=${policy}`)
}
