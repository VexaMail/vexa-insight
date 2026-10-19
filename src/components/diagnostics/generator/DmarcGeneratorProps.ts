import type { DmarcGeneratorFields } from '@/types/diagnostics'

export type DmarcGeneratorProps = {
  readonly domain: string
  readonly initial: DmarcGeneratorFields
}
