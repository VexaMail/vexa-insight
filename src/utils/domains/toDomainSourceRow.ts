import type { DomainSourceRow, SourceAuthCounts } from '@/types/domains'
import type { DomainSource } from '@/types/reports'
import { classifyFailingTraffic } from '@/utils/enforcement'

/** A source with its auth counts and the readiness check's reading of it. */
export function toDomainSourceRow(
  source: DomainSource,
  auth: SourceAuthCounts | undefined,
): DomainSourceRow {
  const messages = auth?.messages ?? source.count
  const passing = auth?.dmarcPass ?? messages
  return {
    ...source,
    auth: auth ?? null,
    failing: messages - passing,
    kind: classifyFailingTraffic({
      sourceIp: source.sourceIp,
      hostname: source.hostname ?? null,
      sender: source.sender ?? null,
      messages,
      passingMessages: passing,
    }),
  }
}
