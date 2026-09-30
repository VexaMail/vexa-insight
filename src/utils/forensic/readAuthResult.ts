/**
 * The result of one method (`spf`, `dkim`, `dmarc`) in an
 * Authentication-Results value (RFC 8601), e.g. `fail` from
 * `dmarc=fail header.from=example.com`; null when the method is absent.
 */
export function readAuthResult(
  authResults: string | null,
  method: string,
): string | null {
  if (authResults === null) return null
  const prefix = `${method.toLowerCase()}=`
  const token = authResults
    .toLowerCase()
    .split(/[;\s]+/)
    .find((t) => t.startsWith(prefix))
  const result = token?.slice(prefix.length).replace(/[^a-z].*$/, '')
  return result ? result : null
}
