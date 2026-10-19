import type { IpLogRow } from '../IpLogRow'

export type BuildIpEventStepsParams = {
  readonly row: IpLogRow
  readonly ip: string
  readonly hostname: string | null
}
