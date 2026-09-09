/** The query for a preset range; a preset also drops any custom bounds. */
export function buildQuickRangeParams(
  current: URLSearchParams,
  value: string,
): URLSearchParams {
  const params = new URLSearchParams(current.toString())
  params.set('days', value)
  if (value !== 'custom') {
    params.delete('from')
    params.delete('to')
  }
  return params
}
