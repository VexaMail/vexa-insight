import type { DmarcTagInfo } from '@/types/diagnostics'
import { describeDmarcPolicy } from './describeDmarcPolicy'
import { describeFoTag } from './describeFoTag'

export function parseDmarcTags(dmarcRecord: string): DmarcTagInfo[] {
  const tagDescriptions: Record<string, (value: string) => string> = {
    v: () =>
      'The v=DMARC1 property indicates that this DNS record contains a DMARC policy. This value must be the first item in the DMARC record.',
    p: (v) => describeDmarcPolicy(v),
    sp: (v) =>
      `The policy that will be applied to DMARC failing emails sent from a subdomain. Currently set to "${v}".`,
    rua: (v) =>
      `Request the receiving server to send aggregate reports to ${v}.`,
    ruf: (v) =>
      `Request the receiving server to send forensic reports to ${v}.`,
    adkim: (v) =>
      v.toLowerCase() === 'r'
        ? 'Indicates that the domain owner is applying relaxed DKIM identifier Alignment.'
        : 'Indicates that the domain owner is applying strict DKIM identifier Alignment.',
    aspf: (v) =>
      v.toLowerCase() === 'r'
        ? 'Indicates that the domain owner is applying relaxed SPF identifier Alignment.'
        : 'Indicates that the domain owner is applying strict SPF identifier Alignment.',
    pct: (v) =>
      `This policy defined in p and/or sp should be applied to ${v}% of emails that fail authentication.`,
    fo: (v) => describeFoTag(v),
    rf: (v) =>
      `Request failure reporting (send to the ruf address, if set) in the ${v.toUpperCase()} format.`,
    ri: (v) => {
      const seconds = parseInt(v, 10)
      const hours = Math.round(seconds / 3600)
      return `The interval requested between aggregate reports (send to the rua address, if set) in seconds. ${v} seconds equals ${hours} hour(s).`
    },
  }
  const defaultTags: Record<string, string> = {
    adkim: 'r',
    aspf: 'r',
    pct: '100',
    fo: '0',
    rf: 'afrf',
    ri: '86400',
  }
  const tags = dmarcRecord
    .split(';')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)

  const result: DmarcTagInfo[] = []
  const foundTags = new Set<string>()

  for (const tag of tags) {
    const eqIdx = tag.indexOf('=')
    if (eqIdx === -1) continue

    const name = tag.substring(0, eqIdx).trim().toLowerCase()
    const value = tag.substring(eqIdx + 1).trim()
    foundTags.add(name)

    const describer = tagDescriptions[name]
    const description = describer
      ? describer(value)
      : `Tag "${name}" with value "${value}".`

    result.push({ tag: `${name}=${value}`, value, description })
  }

  // Add defaults for tags not explicitly set
  for (const [defaultTag, defaultValue] of Object.entries(defaultTags)) {
    if (!foundTags.has(defaultTag)) {
      const describer = tagDescriptions[defaultTag]
      const description = describer
        ? `${describer(defaultValue)} (default value)`
        : `Default value for ${defaultTag}.`

      result.push({
        tag: `${defaultTag}=${defaultValue}`,
        value: defaultValue,
        description,
      })
    }
  }

  return result
}
