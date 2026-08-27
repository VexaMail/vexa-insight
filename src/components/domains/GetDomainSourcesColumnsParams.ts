export type GetDomainSourcesColumnsParams = {
  localHostnames: Record<string, string | null>
  refreshingIps: Set<string>
  onRefresh: (sourceIp: string) => void
}
