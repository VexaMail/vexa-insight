import type { DmarcRecordOptions } from '@/types/record-generator'
import { buildDmarcReportingTags } from './buildDmarcReportingTags'

/** The `_dmarc` TXT value for the options, leaving out tags at their default. */
export function buildDmarcRecord(options: DmarcRecordOptions): string {
  const tags = ['v=DMARC1', `p=${options.policy}`]
  if (options.subdomainPolicy && options.subdomainPolicy !== options.policy) {
    tags.push(`sp=${options.subdomainPolicy}`)
  }
  if (options.percent !== undefined && options.percent < 100) {
    tags.push(`pct=${String(Math.max(0, Math.round(options.percent)))}`)
  }
  tags.push(...buildDmarcReportingTags(options))
  if (options.strictDkim) tags.push('adkim=s')
  if (options.strictSpf) tags.push('aspf=s')
  return tags.join('; ')
}
