/** A Message-ID or List-Id value without its surrounding angle brackets. */
export function trimAngleBrackets(value: string | null): string | null {
  if (value === null) return null
  const match = /<([^>]+)>/.exec(value)
  const trimmed = (match?.[1] ?? value).trim()
  return trimmed === '' ? null : trimmed
}
