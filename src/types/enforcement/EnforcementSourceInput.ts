import type { SenderIdentity } from '@/types/senders'

/** One source IP's volume for a domain, as the readiness check reads it. */
export type EnforcementSourceInput = {
  sourceIp: string
  hostname: string | null
  sender: SenderIdentity | null
  messages: number
  passingMessages: number
}
