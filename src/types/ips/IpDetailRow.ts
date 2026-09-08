/** One aggregated row of the IP detail query, before rate computation. */
export type IpDetailRow = {
  ip: string
  countryCode: string | null
  hostname: string | null
  hostnameLastLookupAt: Date | null
  emailsSentCount: number
  totalMessages: number | null
  firstSeen: number
  lastSeen: number
  spfPassCount: number
  dkimPassCount: number
  fullyAlignedCount: number
  dispositionNone: number
  dispositionQuarantine: number
  dispositionReject: number
}
