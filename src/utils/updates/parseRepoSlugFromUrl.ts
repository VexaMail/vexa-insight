import type { RepoSlug } from '@/types/updates'
import { REPO_SLUG_PATTERN } from './repoSlugPattern'

/**
 * Reads "owner/repo" out of a full GitHub URL; null for any other host or an
 * unparsable value.
 */
export function parseRepoSlugFromUrl(value: string): RepoSlug | null {
  try {
    const url = new URL(value)
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
