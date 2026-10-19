import type { User, UsersSummary } from '@/types/users'
import { describeAllowedDomains } from './describeAllowedDomains'

/** Totals by role, and how many accounts see only some domains. */
export function summarizeUsers(users: readonly User[]): UsersSummary {
  const admins = users.filter((u) => u.role === 'admin').length
  const restricted = users.filter(
    (u) => !describeAllowedDomains(u.allowedDomains).isAll,
  ).length
  return {
    total: users.length,
    admins,
    viewers: users.length - admins,
    restricted,
  }
}
