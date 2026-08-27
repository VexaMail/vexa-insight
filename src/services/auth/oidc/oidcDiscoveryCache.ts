import type { OidcDiscovery } from '@/types/auth'

/**
 * Module-scoped cache for discovered OIDC issuer metadata. Exported so
 * the rest of the slice can read/write it explicitly; the alternative
 * (module-private `let`) is forbidden by the atomic file rule.
 */
export const oidcDiscoveryCache = new Map<
  string,
  { fetchedAt: number; doc: OidcDiscovery }
>()
