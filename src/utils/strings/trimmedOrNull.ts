/**
 * Trims a free-text field; empty or missing input becomes null.
 */
export function trimmedOrNull(value: string | null | undefined): string | null {
  return value?.trim() || null
}
