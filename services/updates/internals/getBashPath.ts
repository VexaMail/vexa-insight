import { DEFAULT_BASH_PATH } from '@/constants/updates'
import { env } from '@/lib/env'

/**
 * Resolve the bash binary used to run the self-update script. Always an
 * absolute path so the spawn never falls back to $PATH lookup.
 * Override via `VEXA_BASH` for non-FHS hosts.
 */
export function getBashPath(): string {
  const fromEnv = env.VEXA_BASH
  if (fromEnv && fromEnv.startsWith('/')) return fromEnv
  return DEFAULT_BASH_PATH
}
