import type { StatusKind } from './StatusKind'

export type DmarcView = {
  status: StatusKind
  label: string
  value: string | null
  policy: string | null
  reportingEnabled: boolean
}
