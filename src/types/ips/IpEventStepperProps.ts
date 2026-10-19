import type { IpLogRow } from '../IpLogRow'

export type IpEventStepperProps = {
  readonly row: IpLogRow
  readonly ip: string
  readonly hostname: string | null
}
