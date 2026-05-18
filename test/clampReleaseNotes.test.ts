import { describe, expect, it } from 'vitest'
import { RELEASE_NOTES_MAX_CHARS } from '../constants/updates/releaseNotesMaxChars'
import { clampReleaseNotes } from '../utils/updates/clampReleaseNotes'

describe('clampReleaseNotes', () => {
  it('returns null for null/undefined/empty', () => {
    expect(clampReleaseNotes(null)).toBeNull()
    expect(clampReleaseNotes(undefined)).toBeNull()
    expect(clampReleaseNotes('')).toBeNull()
    expect(clampReleaseNotes('   ')).toBeNull()
  })
  it('passes short notes through unchanged', () => {
    expect(clampReleaseNotes('Hello')).toBe('Hello')
  })
  it('truncates long notes with an ellipsis', () => {
    const long = 'a'.repeat(RELEASE_NOTES_MAX_CHARS + 50)
    const result = clampReleaseNotes(long)
    expect(result).not.toBeNull()
    expect(result?.length).toBe(RELEASE_NOTES_MAX_CHARS)
    expect(result?.endsWith('…')).toBe(true)
  })
})
