import type { RepoSlug } from '@/types/updates'
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
  if (directMatch) {
    const owner = directMatch[1]
    const repo = directMatch[2]
    if (!owner || !repo) return null
    return { owner, repo }
  }
  try {
    const url = new URL(trimmed)
    if (!/github\.com$/i.test(url.hostname)) return null
    const segments = url.pathname.split('/').filter(Boolean)
    if (segments.length < 2) return null
    const owner = segments[0]
    const repoRaw = segments[1]
    if (!owner || !repoRaw) return null
    const repo = repoRaw.replace(/\.git$/, '')
    if (!REPO_SLUG_PATTERN.test(`${owner}/${repo}`)) return null
    return { owner, repo }
  } catch {
    return null
  }
}
