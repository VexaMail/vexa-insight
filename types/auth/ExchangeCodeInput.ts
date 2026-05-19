import type { OidcDiscovery } from './OidcDiscovery'

export type ExchangeCodeInput = {
  discovery: OidcDiscovery
  code: string
  codeVerifier: string
}
