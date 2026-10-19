import type { IpLogRow } from '@/types/IpLogRow'

/** Which DKIM signers verified or failed on one event, and alignment. */
export function describeEventDkim(row: IpLogRow): string {
  const parts: string[] = []
  if (row.dkimPassDomains)
    parts.push(`valid d=${row.dkimPassDomains.split(',').join(', d=')}`)
  if (row.dkimFailDomains)
    parts.push(`failed d=${row.dkimFailDomains.split(',').join(', d=')}`)
  if (parts.length === 0) parts.push('no signature reported')
  parts.push(row.dkimResult === 'pass' ? 'aligned' : 'not aligned')
  return parts.join(' · ')
}
