/** The report a raw record was read from. */
export type IpRawReportMeta = {
  readonly reportDbId: number
  readonly reportId: string
  readonly orgName: string
  readonly beginDate: number
}
