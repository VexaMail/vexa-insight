export type DashboardPageProps = {
  readonly searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}
