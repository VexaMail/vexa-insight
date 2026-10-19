/** One `auth_results/spf` entry of a report record, as written. */
export type IpRawSpfResult = {
  readonly domain: string
  readonly scope: string
  readonly result: string
}
