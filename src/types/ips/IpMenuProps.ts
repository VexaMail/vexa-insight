import type { IpMenuItem } from './IpMenuItem'
import type { IpMenuTrigger } from './IpMenuTrigger'

export type IpMenuProps = {
  readonly label: string
  readonly trigger: IpMenuTrigger
  readonly items: readonly IpMenuItem[]
  /** Stretches the trigger to the width of its container. */
  readonly block?: boolean
}
