/**
 * One tag of a `tag=value; tag=value` list such as a DKIM-Signature header,
 * lower-cased; null when the tag is absent.
 */
export function readTagValue(
  tagList: string | null,
  tag: string,
): string | null {
  if (tagList === null) return null
  for (const pair of tagList.split(';')) {
    const eq = pair.indexOf('=')
    if (eq === -1) continue
    if (pair.slice(0, eq).trim().toLowerCase() !== tag.toLowerCase()) continue
    const value = pair.slice(eq + 1).replace(/\s+/g, '')
    return value === '' ? null : value.toLowerCase()
  }
  return null
}
