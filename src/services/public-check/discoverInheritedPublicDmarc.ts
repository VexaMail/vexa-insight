import type { Resolver } from 'node:dns/promises'
import type { PublicCheck } from '../../types/public-check/PublicCheck'
import type { PublicDmarcCandidate } from '../../types/public-check/PublicDmarcCandidate'
import { buildInheritedPublicDmarcCheck } from './buildInheritedPublicDmarcCheck'
import { getPublicDmarcPsdFlag } from './getPublicDmarcPsdFlag'
import { getPublicDmarcWalkNames } from './getPublicDmarcWalkNames'
import { readPublicDmarcCandidate } from './readPublicDmarcCandidate'
import { resolvePublicTxt } from './resolvePublicTxt'
import { unknownPublicCheck } from './unknownPublicCheck'

export async function discoverInheritedPublicDmarc(
  resolver: Resolver,
  domain: string,
): Promise<PublicCheck> {
  const deadline = Date.now() + 8000
  let selected: PublicDmarcCandidate | null = null
  for (const name of getPublicDmarcWalkNames(domain).slice(1)) {
    if (Date.now() > deadline) return unknownPublicCheck('DMARC')
    const records = await resolvePublicTxt(resolver, `_dmarc.${name}`)
    if (records === null) return unknownPublicCheck('DMARC')
    const candidate = readPublicDmarcCandidate(records, name)
    if (!candidate) continue
    const psd = getPublicDmarcPsdFlag(candidate.record)
    if (psd === 'y') {
      const boundary = domain
        .split('.')
        .slice(-(name.split('.').length + 1))
        .join('.')
      if (selected?.source !== boundary) selected = candidate
      break
    }
    selected = candidate
    if (psd === 'n') break
  }
  if (selected)
    return buildInheritedPublicDmarcCheck(selected.record, selected.source)
  return {
    name: 'DMARC',
    status: 'attention',
    points: 0,
    summary: 'No DMARC policy found in the DNS tree walk.',
    recommendation:
      'Confirm the domain’s mail use before publishing a monitoring policy. No direct or inherited record was discovered within the eight-query bound.',
    records: [],
  }
}
