/** Thousands-separated count, fixed to one locale so server and client agree. */
export function formatCount(value: number): string {
  return value.toLocaleString('en-US')
}
