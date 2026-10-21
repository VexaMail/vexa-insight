export function setPublicDomainMetadata(domain: string): void {
  document.title = domain
    ? `${domain} email DNS check | Vexa Insight`
    : 'Free DMARC & SPF Checker | Vexa Insight'
  const canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )
  if (canonical) canonical.href = new URL(`/${domain}`, canonical.href).href
  const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (robots) robots.content = domain ? 'noindex, follow' : 'index, follow'
}
