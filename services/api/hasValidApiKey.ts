import { getConfig } from '@/services/config'
import { headers } from 'next/headers'
import { isUsableSecret } from './isUsableSecret'
import { timingSafeTokenEqual } from './timingSafeTokenEqual'

/**
 * Reports whether the current request carries the shared `SECRET_KEY`.
 * Mirrors `requireAdminAccess` token extraction (`x-api-key` header or
 * `Authorization: Bearer`).
 *
 * The key maps to `API_KEY_PERMISSIONS`, not to the `admin` role: it is one
 * secret shared by every automation client, so it must not carry user
 * management or audit-log access.
 */
export async function hasValidApiKey(): Promise<boolean> {
  const requestHeaders = await headers()
  const apiKey = requestHeaders.get('x-api-key')
  const auth = requestHeaders.get('authorization')
  const token = apiKey ?? (auth?.startsWith('Bearer ') ? auth.slice(7) : null)
  if (!token) return false
  const config = getConfig()
  return (
    isUsableSecret(config.secretKey) &&
    timingSafeTokenEqual(token, config.secretKey)
  )
}
