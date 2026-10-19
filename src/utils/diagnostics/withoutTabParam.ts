/** The query string without `tab`, sorted, to compare two links' filters. */
export function withoutTabParam(params: URLSearchParams): string {
  const copy = new URLSearchParams(params)
  copy.delete('tab')
  copy.sort()
  return copy.toString()
}
