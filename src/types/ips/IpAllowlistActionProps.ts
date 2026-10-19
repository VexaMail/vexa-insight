import type { SourceVerdict } from '@/types/source-reviews'

export type IpAllowlistActionProps = {
  readonly ip: string
  readonly domain: string
  readonly initialVerdict: SourceVerdict | null
}
