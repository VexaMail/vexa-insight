/**
 * The value of a settled promise, or null after logging why it was
 * rejected, so one failed section does not take the page down.
 */
export function settledOrNull<T>(
  result: PromiseSettledResult<T>,
  label: string,
): T | null {
  if (result.status === 'fulfilled') return result.value
  console.error(`Failed to fetch IP ${label}:`, result.reason)
  return null
}
