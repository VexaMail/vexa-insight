import { setPublicDomainMetadata } from './setPublicDomainMetadata'

export function updatePublicDomainUrl(domain: string): void {
  const path = `/${encodeURIComponent(domain)}`
  if (window.location.pathname !== path)
    window.history.pushState(null, '', path)
  setPublicDomainMetadata(domain)
}
