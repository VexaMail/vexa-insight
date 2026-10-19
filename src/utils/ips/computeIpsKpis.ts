import type { IpsKpis } from '@/types/IpsKpis'
import type { IpSourceRow } from '@/types/ips'

export function computeIpsKpis(ips: readonly IpSourceRow[]): IpsKpis {
  let totalMessages = 0
  let dmarcPassMessages = 0
  let failingSources = 0

  for (const ip of ips) {
    totalMessages += ip.totalMessages
    dmarcPassMessages += ip.dmarcPassCount
    if (ip.cause === 'failing') failingSources++
  }

  return {
    totalSources: ips.length,
    totalMessages,
    dmarcPassMessages,
    failingSources,
  }
}
