/** The resolved URL query and the path the date filter links back to. */
export type TriageOverviewScreenProps = {
  readonly searchParams: { [key: string]: string | string[] | undefined }
  readonly basePath: string
}
