import type { EnforcementSourceInput, FailingSource } from '@/types/enforcement'
import { classifyFailingTraffic } from './classifyFailingTraffic'

/** A source's failing mail with its reading and pass rate. */
export function toFailingSource(source: EnforcementSourceInput): FailingSource {
  return {
    sourceIp: source.sourceIp,
    hostname: source.hostname,
    sender: source.sender,
    kind: classifyFailingTraffic(source),
    failingMessages: source.messages - source.passingMessages,
    passRate:
      source.messages === 0 ? 0 : source.passingMessages / source.messages,
  }
}
