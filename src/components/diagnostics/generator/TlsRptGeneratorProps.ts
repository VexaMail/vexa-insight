import type { TlsRptGeneratorFields } from '@/types/diagnostics'

export type TlsRptGeneratorProps = {
  readonly domain: string
  readonly initial: TlsRptGeneratorFields
}
