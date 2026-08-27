import path from 'node:path'

/**
 * Returns true if a zip entry filename is unsafe to extract or trust.
 * Rejects path traversal, absolute paths, and control characters
 * (defense-in-depth against zip-slip even though we do not write to disk today).
 */
export function isUnsafeZipEntryName(name: string): boolean {
  const normalized = path.posix.normalize(name)
  const hasControlChar = Array.from(name).some(
    (character) => character.charCodeAt(0) <= 0x1f,
  )
  return (
    normalized !== name ||
    normalized.includes('..') ||
    path.isAbsolute(normalized) ||
    hasControlChar
  )
}
