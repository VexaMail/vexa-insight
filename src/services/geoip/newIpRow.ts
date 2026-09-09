import type { ipAddresses } from '@/lib/db'

/** The insert values for an address seen for the first time. */
export function newIpRow(
  ip: string,
  countryCode: string | null,
  now: Date,
): typeof ipAddresses.$inferInsert {
  return {
    ip,
    countryCode,
    emailsSentCount: 0,
    firstSeenAt: now,
    lastSeenAt: now,
    locationLastUpdate: now,
    createdAt: now,
    updatedAt: now,
  }
}
