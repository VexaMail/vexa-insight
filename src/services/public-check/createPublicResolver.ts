import { Resolver } from 'node:dns/promises'

export function createPublicResolver(): Resolver {
  const resolver = new Resolver({ timeout: 2000, tries: 1 })
  resolver.setServers(['1.1.1.1', '8.8.8.8'])
  return resolver
}
