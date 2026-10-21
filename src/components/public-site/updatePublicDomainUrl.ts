import { setPublicDomainMetadata } from './setPublicDomainMetadata'

export function updatePublicDomainUrl(domain: string, selector?: string): void {
  const path = `/${encodeURIComponent(domain)}${selector ? `?selector=${encodeURIComponent(selector)}` : ''}`
  if (`${window.location.pathname}${window.location.search}` !== path)
    window.history.pushState(null, '', path)
  setPublicDomainMetadata(domain)
}
