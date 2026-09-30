import type { SenderCategory } from './SenderCategory'

/**
 * One known sending service. A source matches when its reverse DNS hostname
 * or one of its DKIM signing domains equals or ends in one of `domains`.
 */
export type SenderCatalogEntry = {
  name: string
  category: SenderCategory
  domains: readonly string[]
}
