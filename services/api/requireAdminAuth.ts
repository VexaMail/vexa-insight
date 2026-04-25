import { getConfig } from '@/services/config'
import type { NextRequest } from 'next/server'

export function requireAdminAuth(
  request: NextRequest,
): { status: 401; error: { code: string; message: string } } | null {
  const config = getConfig()
  const apiKey = request.headers.get('x-api-key')
  const auth = request.headers.get('authorization')
  const token = apiKey ?? (auth?.startsWith('Bearer ') ? auth.slice(7) : null)
  if (!token || token !== config.secretKey) {
    return {
      status: 401,
      error: { code: 'UNAUTHORIZED', message: 'Invalid or missing API key' },
    }
  }
  return null
}
