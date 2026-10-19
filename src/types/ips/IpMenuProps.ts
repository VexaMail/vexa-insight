import type { IpMenuItem } from './IpMenuItem'

export type IpMenuProps = {
  readonly label: string
  /** Leading icon of the trigger. */
  readonly trigger: 'investigate' | 'external'
  readonly items: readonly IpMenuItem[]
  /** Stretches the trigger to the width of its container. */
  readonly block?: boolean
}
