/** One error per tag name that appears more than once in a DKIM record. */
export function findDuplicateDkimTags(record: string): string[] {
  const errors: string[] = []
  const tags = record.split(';').map((t) => t.trim().split('=')[0])
  const seen = new Set<string>()
  for (const tag of tags) {
    if (!tag || tag.length === 0) continue
    if (seen.has(tag)) {
      errors.push(`Duplicate tag "${tag}" found.`)
    }
    seen.add(tag)
  }
  return errors
}
