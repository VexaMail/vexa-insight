import { runMigrations } from '@/lib/db'
import {
  clearInstallToken,
  completeInstall,
  getOrCreateInstallToken,
  isInstalled,
  isLoopbackRequest,
  isPartiallyInstalled,
} from '@/services/install'
import {
  ALLOW_REMOTE_INSTALL,
  timingSafeStringEqual,
  validateInstallBody,
} from '@/utils/install'
import { NextResponse } from 'next/server'

/**
 * POST /api/install — complete initial setup. No session auth, but gated by:
 *   1. Loopback-only origin (override with VEXA_ALLOW_REMOTE_INSTALL=1).
 *   2. One-time install token printed to server stdout on boot (header
 *      `x-install-token` or body field `installToken`).
 *
 * Returns 403 if already installed or remote-but-not-allowed, 401 on bad
 * token, 400 on validation error, 409 if the token store is somehow empty
 * mid-install, 200 { data: { redirect: '/settings' } } on success.
 */
export async function POST(
  request: Request,
): Promise<
  | NextResponse<{ data: { redirect: string } }>
  | NextResponse<{ error: { code: string; message: string } }>
> {
  runMigrations()
  if (isInstalled()) {
    return NextResponse.json(
      { error: { code: 'FORBIDDEN', message: 'Already installed' } },
      { status: 403 },
    )
  }
  if (!ALLOW_REMOTE_INSTALL && !isLoopbackRequest(request)) {
    return NextResponse.json(
      {
        error: {
          code: 'FORBIDDEN',
          message:
            'Install is restricted to loopback. Set VEXA_ALLOW_REMOTE_INSTALL=1 to allow remote install, or reach the installer via 127.0.0.1.',
        },
      },
      { status: 403 },
    )
  }
  const expectedToken = getOrCreateInstallToken()
  if (!expectedToken) {
    return NextResponse.json(
      { error: { code: 'CONFLICT', message: 'Install already complete' } },
      { status: 409 },
    )
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON' } },
      { status: 400 },
    )
  }
  const headerToken = request.headers.get('x-install-token')
  const bodyToken =
    typeof body === 'object' && body !== null && 'installToken' in body
      ? String((body as Record<string, unknown>).installToken ?? '')
      : ''
  const provided = headerToken ?? bodyToken
  if (!provided || !timingSafeStringEqual(provided, expectedToken)) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Invalid install token' } },
      { status: 401 },
    )
  }
  const isPartial = isPartiallyInstalled()
  const result = validateInstallBody(body, isPartial)
  if (!result.ok) {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: result.message } },
      { status: 400 },
    )
  }
  await completeInstall(result.payload, isPartial)
  clearInstallToken()
  return NextResponse.json({ data: { redirect: '/settings' } })
}
