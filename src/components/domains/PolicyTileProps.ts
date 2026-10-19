import type { PublishedDmarcPolicy } from '@/types/domains'

export type PolicyTileProps = {
  readonly policy: PublishedDmarcPolicy | null
  readonly dnsHref: string
}
