export type PublicSpfBranch = {
  domain: string
  record: string
  ancestors?: ReadonlySet<string>
}
