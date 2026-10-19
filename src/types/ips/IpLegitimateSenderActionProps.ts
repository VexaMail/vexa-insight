import type { SourceVerdict } from '@/types/source-reviews'

export type IpLegitimateSenderActionProps = {
  readonly ip: string
  readonly domain: string
  readonly initialVerdict: SourceVerdict | null
}
