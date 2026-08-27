export type NormalizedEventSummary = {
  sourceIp: string
  spfResult: string
  dkimResult: string
  spfAligned: boolean
  dkimAligned: boolean
  disposition: string
  count: number
}
