import type { sndsIpStatus } from '@/lib/db'

export type SndsStatusListProps = {
  readonly statusRows: readonly (typeof sndsIpStatus.$inferSelect)[]
}
