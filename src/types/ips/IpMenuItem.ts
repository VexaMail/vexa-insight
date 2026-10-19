import type { IpMenuItemKind } from './IpMenuItemKind'

/** One link of a header or panel menu. */
export type IpMenuItem = {
  readonly key: string
  readonly kind: IpMenuItemKind
  readonly label: string
  readonly href: string
  /** Opens in a new tab with `noopener`. */
  readonly external?: boolean
}
