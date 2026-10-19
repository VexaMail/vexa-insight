import type { LucideIcon } from 'lucide-react'
import type { IpMenuItem } from './IpMenuItem'

export type IpMenuLinkProps = {
  readonly item: IpMenuItem
  readonly Icon: LucideIcon
  readonly onSelect: () => void
}
