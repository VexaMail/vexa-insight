export type PageProps = {
  readonly params: Promise<{ ip: string[] }>
  readonly searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}
