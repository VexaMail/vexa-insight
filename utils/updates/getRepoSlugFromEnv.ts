import { DEFAULT_REPO_SLUG } from '@/constants/updates'
import { env } from '@/lib/env'
import type { RepoSlug } from '@/types/updates'
import { parseRepoSlug } from './parseRepoSlug'

/**
 * Resolve the repo slug to query. Order of precedence:
 * 1) VEXA_UPDATE_REPO env (e.g. "owner/repo" or full GitHub URL)
 * 2) DEFAULT_REPO_SLUG constant baked at build time
 */
export function getRepoSlugFromEnv(): RepoSlug {
  const fromEnv = parseRepoSlug(env.VEXA_UPDATE_REPO)
  if (fromEnv) return fromEnv
  const fallback = parseRepoSlug(DEFAULT_REPO_SLUG)
  if (!fallback) {
    throw new Error(
      `DEFAULT_REPO_SLUG "${DEFAULT_REPO_SLUG}" is not a valid owner/repo string`,
    )
  }
  return fallback
}
