import { getConfig } from '@/services/config'
import type { NextRequest } from 'next/server'
import { isUsableSecret } from './isUsableSecret'
import { timingSafeTokenEqual } from './timingSafeTokenEqual'

export function requireAdminAuth(
  request: NextRequest,
): { status: 401 | 503; error: { code: string; message: string } } | null {
  const config = getConfig()
  if (!isUsableSecret(config.secretKey)) {
    return {
      status: 503,
      error: {
        code: 'SECRET_KEY_NOT_CONFIGURED',
        message:
          'Admin API is disabled until SECRET_KEY is set to a 32+ character value (run the installer or rotate via Settings).',
      },
    }
  }
  const apiKey = request.headers.get('x-api-key')
  const auth = request.headers.get('authorization')
  const token = apiKey ?? (auth?.startsWith('Bearer ') ? auth.slice(7) : null)
  if (!token || !timingSafeTokenEqual(token, config.secretKey)) {
    return {
      status: 401,
      error: { code: 'UNAUTHORIZED', message: 'Invalid or missing API key' },
    }
  }
  return null
}
