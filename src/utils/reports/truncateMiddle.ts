/** Keeps both ends of a long id readable: "86d42c11…e62e2ddc". */
export function truncateMiddle(value: string, visibleChars: number): string {
  if (value.length <= visibleChars) return value
  const head = Math.ceil(visibleChars / 2)
  const tail = Math.floor(visibleChars / 2)
  return `${value.slice(0, head)}…${value.slice(value.length - tail)}`
}
