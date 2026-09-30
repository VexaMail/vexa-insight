/** Whether `name` is `suffix` or a subdomain of it (case-insensitive). */
export function domainMatchesSuffix(name: string, suffix: string): boolean {
  const lower = name.toLowerCase().replace(/\.$/, '')
  const target = suffix.toLowerCase()
  return lower === target || lower.endsWith(`.${target}`)
}
