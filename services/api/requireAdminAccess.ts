import { getSession } from '@/services/auth'
import { getConfig } from '@/services/config'
import type { NextRequest } from 'next/server'
import { isUsableSecret } from './isUsableSecret'
import { timingSafeTokenEqual } from './timingSafeTokenEqual'

export async function requireAdminAccess(
  request: NextRequest,
): Promise<{ status: 401; error: { code: string; message: string } } | null> {
  const apiKey = request.headers.get('x-api-key')
  const auth = request.headers.get('authorization')
  const token = apiKey ?? (auth?.startsWith('Bearer ') ? auth.slice(7) : null)
  if (token) {
    const config = getConfig()
    if (
      isUsableSecret(config.secretKey) &&
      timingSafeTokenEqual(token, config.secretKey)
    ) {
      return null
    }
  }

  const session = await getSession()
  if (session) return null

  return {
    status: 401,
    error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
  }
}
