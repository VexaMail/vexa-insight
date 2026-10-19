import type { IpSourceRow, SourceCause } from '@/types/ips'

/** The sources of one cause, or all of them when `cause` is null. */
export function filterSourcesByCause(
  rows: IpSourceRow[],
  cause: SourceCause | null,
): IpSourceRow[] {
  return cause === null ? rows : rows.filter((row) => row.cause === cause)
}
