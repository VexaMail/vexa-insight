export type IpSummaryData = {
  ip: string
  countryCode: string | null
  hostname: string | null
  totalMessages: number
  emailsSentCount: number
  firstSeen: number | null
  lastSeen: number | null
  spfPassCount: number
  dkimPassCount: number
  fullyAlignedCount: number
  spfPassRate: number
  dkimPassRate: number
  fullyAlignedRate: number
  dispositionNone: number
  dispositionQuarantine: number
  dispositionReject: number
}
