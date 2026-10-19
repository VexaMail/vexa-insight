export type DomainDetailPageProps = {
  readonly params: Promise<{ domain: string }>
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>
}
