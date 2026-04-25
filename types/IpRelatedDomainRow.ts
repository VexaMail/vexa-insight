export type IpRelatedDomainRow = {
  domainId: number
  domain: string
  messageCount: number
  firstSeenAt: number | null
  lastSeenAt: number | null
}
