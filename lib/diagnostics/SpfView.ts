import type { StatusKind } from './StatusKind'

export type SpfView = {
  status: StatusKind
  label: string
  value: string | null
  warning: string | null
}
