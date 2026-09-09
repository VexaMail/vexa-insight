import type { IpDetailStatKind } from './IpDetailStatKind'

export const ipDetailStatValueClassNames: Record<IpDetailStatKind, string> = {
  rate: 'text-lg font-bold tabular-nums',
  seen: 'text-sm font-medium',
  count: 'text-sm font-medium tabular-nums',
}
