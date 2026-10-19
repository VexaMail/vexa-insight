import type { DmarcGeneratorFields, DmarcTagInfo } from '@/types/diagnostics'
import { dmarcTagValue } from './dmarcTagValue'
import { splitList } from './splitList'
import { stripMailto } from './stripMailto'

/** The DMARC form filled from the published record's tags. */
export function dmarcFieldsFromTags(
  tags: readonly DmarcTagInfo[],
): DmarcGeneratorFields {
  const value = (tag: string) => dmarcTagValue(tags, tag)
  const addresses = (tag: string) =>
    splitList(value(tag)).map(stripMailto).join(', ')
  const policy = value('p') || 'none'
  const subdomainPolicy = value('sp')
  return {
    policy,
    subdomainPolicy:
      subdomainPolicy === '' || subdomainPolicy === policy
        ? 'inherit'
        : subdomainPolicy,
    percent: value('pct') || '100',
    rua: addresses('rua'),
    ruf: addresses('ruf'),
    strictDkim: value('adkim') === 's',
    strictSpf: value('aspf') === 's',
    reportAnyFailure: value('fo').includes('1'),
  }
}
