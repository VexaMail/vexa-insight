import { generateInstallToken } from './generateInstallToken'
import { getInstallToken } from './getInstallToken'
import { isInstalled } from './isInstalled'
import { setInstallTokenForBoot } from './setInstallTokenForBoot'

/**
 * Returns the active install token, creating a fresh one if none exists yet.
 * Returns null once the app is fully installed so callers can short-circuit.
 */
export function getOrCreateInstallToken(): string | null {
  if (isInstalled()) return null
  const existing = getInstallToken()
  if (existing) return existing
  const fresh = generateInstallToken()
  setInstallTokenForBoot(fresh)
  return fresh
}
