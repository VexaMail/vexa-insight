import type { ProtocolStatuses } from './ProtocolStatuses'

/** The optional one-line detail shown under each protocol status. */
export type ProtocolDetails = Partial<Record<keyof ProtocolStatuses, string>>
