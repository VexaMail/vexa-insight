/** One SPF record to expand, and how deep in the include tree it sits. */
export type SpfRecordAtDepth = {
  readonly domain: string
  readonly record: string
  readonly depth: number
}
