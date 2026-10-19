/** `mailto:a@example.com` as `a@example.com`; other values unchanged. */
export function stripMailto(address: string): string {
  return address.trim().replace(/^mailto:/i, '')
}
