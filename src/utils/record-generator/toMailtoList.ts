/** `a@example.com, b@example.com` as `mailto:a@example.com,mailto:b@example.com`. */
export function toMailtoList(addresses: readonly string[]): string {
  return addresses
    .map((address) => address.trim())
    .filter((address) => address.length > 0)
    .map((address) =>
      address.toLowerCase().startsWith('mailto:')
        ? address
        : `mailto:${address}`,
    )
    .join(',')
}
