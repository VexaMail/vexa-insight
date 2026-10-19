/** A page's resolved `searchParams`, as Next.js hands them over. */
export type DiagnosticsSearchParams = {
  readonly [key: string]: string | string[] | undefined
}
