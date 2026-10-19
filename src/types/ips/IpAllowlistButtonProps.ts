import type { SourceVerdict } from '@/types/source-reviews'

export type IpAllowlistButtonProps = {
  readonly ip: string
  /** Domains the source sends for; the button acts directly only for one. */
  readonly domains: readonly string[]
  readonly initialVerdict: SourceVerdict | null
}
