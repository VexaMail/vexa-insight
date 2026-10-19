export type DkimRecord = {
  selector: string
  record: string | null
  valid: boolean
  /** True when the selector came from received reports, not the fixed list. */
  fromReports?: boolean
}
