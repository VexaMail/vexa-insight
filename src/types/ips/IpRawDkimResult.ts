/** One `auth_results/dkim` entry of a report record, as written. */
export type IpRawDkimResult = {
  readonly domain: string
  readonly selector: string
  readonly result: string
}
