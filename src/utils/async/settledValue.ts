/** The value of a fulfilled settled promise, or null when it rejected. */
export function settledValue<T>(result: PromiseSettledResult<T>): T | null {
  return result.status === 'fulfilled' ? result.value : null
}
