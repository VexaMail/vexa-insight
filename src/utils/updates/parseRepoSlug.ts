import type { RepoSlug } from '@/types/updates'
import { parseRepoSlugFromUrl } from './parseRepoSlugFromUrl'
import { REPO_SLUG_PATTERN } from './repoSlugPattern'

/**
 * Parse "owner/repo" strings (or full GitHub URLs) into a structured slug.
 * Returns null when the value cannot be interpreted as a GitHub repo reference.
 */
export function parseRepoSlug(
  value: string | null | undefined,
): RepoSlug | null {
  if (!value) return null
  const trimmed = value.trim().replace(/\.git$/, '')
  if (!trimmed) return null
  const directMatch = REPO_SLUG_PATTERN.exec(trimmed)
  if (!directMatch) return parseRepoSlugFromUrl(trimmed)
  const owner = directMatch[1]
  const repo = directMatch[2]
  if (!owner || !repo) return null
  return { owner, repo }
}
