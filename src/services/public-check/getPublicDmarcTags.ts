export function getPublicDmarcTags(record: string): Map<string, string> {
  return new Map(
    record.split(';').map((part) => {
      const index = part.indexOf('=')
      return [
        part.slice(0, index).trim().toLowerCase(),
        part.slice(index + 1).trim(),
      ]
    }),
  )
}
