import { domainToASCII } from 'node:url'
import { isPublicDnsName } from '../diagnostics/isPublicDnsName'

export function normalizePublicDomain(value: string): string | null {
  const domain = domainToASCII(value.trim().toLowerCase().replace(/\.$/, ''))
  if (!isPublicDnsName(domain) || domain.includes('_')) return null
  return domain
}
