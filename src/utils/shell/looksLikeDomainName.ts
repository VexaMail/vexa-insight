/** A hostname with at least one dot and a letter TLD, e.g. `example.com`. */
export function looksLikeDomainName(value: string): boolean {
  return /^(?=.{3,253}$)(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(value)
}
