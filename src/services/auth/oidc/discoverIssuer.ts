import type { OidcDiscovery } from '@/types/auth'
import { oidcDiscoveryCache } from './oidcDiscoveryCache'
import { OIDC_DISCOVERY_TTL_MS } from './oidcDiscoveryTtlMs'

/**
 * Fetches and caches the `.well-known/openid-configuration` document for
 * an issuer. Cached for `OIDC_DISCOVERY_TTL_MS`; a cold callback flow
 * does not justify a refetch on every hit.
 */
export async function discoverIssuer(issuer: string): Promise<OidcDiscovery> {
  const normalized = issuer.endsWith('/') ? issuer.slice(0, -1) : issuer
  const cached = oidcDiscoveryCache.get(normalized)
  if (cached && Date.now() - cached.fetchedAt < OIDC_DISCOVERY_TTL_MS) {
    return cached.doc
  }
  const url = `${normalized}/.well-known/openid-configuration`
  const res = await fetch(url, { headers: { accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`OIDC discovery failed: ${res.status} ${res.statusText}`)
  }
  const doc = (await res.json()) as OidcDiscovery
  oidcDiscoveryCache.set(normalized, { fetchedAt: Date.now(), doc })
  return doc
}
