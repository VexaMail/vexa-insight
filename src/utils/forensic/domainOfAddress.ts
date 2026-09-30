/**
 * The lower-cased domain of the first address in a header value such as
 * `Name <user@example.com>` or `user@example.com`; null when there is none.
 * The local part is dropped on purpose: it identifies a person.
 */
export function domainOfAddress(value: string | null): string | null {
  if (value === null) return null
  const match = /@([a-z0-9.-]+\.[a-z]{2,})/i.exec(value)
  return match?.[1]?.toLowerCase().replace(/\.$/, '') ?? null
}
