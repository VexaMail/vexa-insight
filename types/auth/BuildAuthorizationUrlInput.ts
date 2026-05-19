import type { OidcDiscovery } from './OidcDiscovery'

export type BuildAuthorizationUrlInput = {
  discovery: OidcDiscovery
  state: string
  codeChallenge: string
}
