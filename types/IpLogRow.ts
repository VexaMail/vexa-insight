export type IpLogRow = {
  eventId: number
  headerFrom: string
  envelopeFrom: string | null
  disposition: string
  spfResult: string
  dkimResult: string
  count: number
  reportId: string
  observedAt: number
}
