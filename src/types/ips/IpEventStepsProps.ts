import type { IpLogRow } from '../IpLogRow'

export type IpEventStepsProps = {
  readonly row: IpLogRow
  readonly dmarc: 'pass' | 'fail'
}
