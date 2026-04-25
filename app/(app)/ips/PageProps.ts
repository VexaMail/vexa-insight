export type PageProps = {
  readonly searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}
