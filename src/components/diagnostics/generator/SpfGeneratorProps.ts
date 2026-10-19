import type { SpfGeneratorPrefill } from '@/types/diagnostics'

export type SpfGeneratorProps = {
  readonly domain: string
  readonly domainId: number
  readonly prefill: SpfGeneratorPrefill
}
