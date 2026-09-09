import type { IpDetailStatKind } from './IpDetailStatKind'

export type IpDetailStatProps = {
  readonly label: string
  readonly value: string
  readonly kind: IpDetailStatKind
  readonly title?: string | undefined
}
