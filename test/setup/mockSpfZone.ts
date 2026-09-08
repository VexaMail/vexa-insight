import { mockResolveTxt } from '../mockResolveTxt'

/**
 * Answers TXT lookups from a host-to-record map; every other host resolves to
 * no records, which is how a domain without SPF looks to the resolver.
 */
export function mockSpfZone(zone: Record<string, string>): void {
  mockResolveTxt.mockImplementation(async (host: string) => {
    const record = zone[host]
    return Promise.resolve(record === undefined ? [] : [[record]])
  })
}
