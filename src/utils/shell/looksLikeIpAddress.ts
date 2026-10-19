/** IPv4 dotted quad, or an IPv6 literal (hex groups with at least two colons). */
export function looksLikeIpAddress(value: string): boolean {
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(value)) {
    return value.split('.').every((part) => Number(part) <= 255)
  }
  return /^[0-9a-f:]+$/i.test(value) && (value.match(/:/g) ?? []).length >= 2
}
