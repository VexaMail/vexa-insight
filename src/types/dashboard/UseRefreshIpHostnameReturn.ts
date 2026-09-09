export type UseRefreshIpHostnameReturn = {
  readonly refreshingIps: ReadonlySet<string>
  readonly refreshHostname: (senderIp: string) => Promise<void>
}
