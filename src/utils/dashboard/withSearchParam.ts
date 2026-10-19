/** The query string with one parameter set, keeping every other one. */
export function withSearchParam(
  search: string,
  key: string,
  value: string,
): string {
  const params = new URLSearchParams(search)
  params.set(key, value)
  return params.toString()
}
