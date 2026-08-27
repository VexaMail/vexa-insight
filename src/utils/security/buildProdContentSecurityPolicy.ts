import { buildProdCspDirectives } from './buildProdCspDirectives'

export function buildProdContentSecurityPolicy(nonce: string): string {
  return buildProdCspDirectives(nonce).join('; ')
}
