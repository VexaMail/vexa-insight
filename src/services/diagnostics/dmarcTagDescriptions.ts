import { describeDmarcPolicy } from './describeDmarcPolicy'
import { describeFoTag } from './describeFoTag'

/** Human explanation of each DMARC tag, given the value it carries. */
export const dmarcTagDescriptions: Record<string, (value: string) => string> = {
  v: () =>
    'The v=DMARC1 property indicates that this DNS record contains a DMARC policy. This value must be the first item in the DMARC record.',
  p: (v) => describeDmarcPolicy(v),
  sp: (v) =>
    `The policy that will be applied to DMARC failing emails sent from a subdomain. Currently set to "${v}".`,
  rua: (v) => `Request the receiving server to send aggregate reports to ${v}.`,
  ruf: (v) => `Request the receiving server to send forensic reports to ${v}.`,
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
    return `The interval requested between aggregate reports (send to the rua address, if set) in seconds. ${v} seconds equals ${String(hours)} hour(s).`
  },
}
