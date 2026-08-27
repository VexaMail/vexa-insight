import { RELEASE_NOTES_MAX_CHARS } from '@/constants/updates'

/**
 * Clamp release notes to a safe size for storage and rendering.
 * Returns null for nullish/empty input. Truncates with an ellipsis when above limit.
 */
export function clampReleaseNotes(
  notes: string | null | undefined,
): string | null {
  if (!notes) return null
  const trimmed = notes.trim()
  if (!trimmed) return null
  if (trimmed.length <= RELEASE_NOTES_MAX_CHARS) return trimmed
  return `${trimmed.slice(0, RELEASE_NOTES_MAX_CHARS - 1)}…`
}
