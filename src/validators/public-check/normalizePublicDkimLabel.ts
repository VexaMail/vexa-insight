export function normalizePublicDkimLabel(value: string): string | null {
  const selector = value.trim().toLowerCase()
  if (!selector) return ''
  if (
    selector.length > 128 ||
    !selector
      .split('.')
      .every((label) => /^[a-z0-9](?:[a-z0-9_-]{0,61}[a-z0-9])?$/.test(label))
  )
    return null
  return selector
}
