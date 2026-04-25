export function trimEdgePunctuation(value: string): string {
  const leadingChars = new Set(['<', '(', '"', "'"] as const)
  const trailingChars = new Set(['>', ')', ',', '"', "'", '`'] as const)

  let start = 0
  let end = value.length

  while (start < end && leadingChars.has(value[start] as '<')) start += 1
  while (end > start && trailingChars.has(value[end - 1] as '>')) end -= 1

  return value.slice(start, end)
}
