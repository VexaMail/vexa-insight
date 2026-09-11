import { getSession } from '@/services/auth'
import { getConfig } from '@/services/config'
import { isUsableSecret, timingSafeTokenEqual } from '@/services/credentials'
import type { NextRequest } from 'next/server'

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
      timingSafeTokenEqual(token, config.apiToken)
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
