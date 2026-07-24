import { getConfig } from '@/services/config'
import type { Role } from '@/types/auth'
import { headers } from 'next/headers'
import { isUsableSecret } from './isUsableSecret'
import { timingSafeTokenEqual } from './timingSafeTokenEqual'

/**
 * Maps the shared admin API key on the current request to an RBAC role.
 * Mirrors `requireAdminAccess` token extraction (`x-api-key` header or
 * `Authorization: Bearer`): the holder of SECRET_KEY is the instance
 * operator, so a valid key is treated as the `admin` role for permission
 * checks. Returns null when no valid key is present.
 */
export async function getApiKeyRole(): Promise<Role | null> {
  const requestHeaders = await headers()
  const apiKey = requestHeaders.get('x-api-key')
  const auth = requestHeaders.get('authorization')
  const token = apiKey ?? (auth?.startsWith('Bearer ') ? auth.slice(7) : null)
  if (!token) return null
  const config = getConfig()
  if (
    isUsableSecret(config.secretKey) &&
    timingSafeTokenEqual(token, config.secretKey)
  ) {
    return 'admin'
  }
  return null
}
