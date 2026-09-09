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
import type { InstallErrorReply } from './InstallErrorReply'
import { installErrorResponse } from './installErrorResponse'
import { providedInstallToken } from './providedInstallToken'
import { remoteInstallForbiddenMessage } from './remoteInstallForbiddenMessage'

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
): Promise<NextResponse<{ data: { redirect: string } }> | InstallErrorReply> {
  runMigrations()
  if (isInstalled()) {
    return installErrorResponse('FORBIDDEN', 'Already installed', 403)
  }
  if (!ALLOW_REMOTE_INSTALL && !isLoopbackRequest(request)) {
    return installErrorResponse('FORBIDDEN', remoteInstallForbiddenMessage, 403)
  }
  const expectedToken = getOrCreateInstallToken()
  if (!expectedToken) {
    return installErrorResponse('CONFLICT', 'Install already complete', 409)
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return installErrorResponse('BAD_REQUEST', 'Invalid JSON', 400)
  }
  const provided = providedInstallToken(request, body)
  if (!provided || !timingSafeStringEqual(provided, expectedToken)) {
    return installErrorResponse('UNAUTHORIZED', 'Invalid install token', 401)
  }
  const isPartial = isPartiallyInstalled()
  const result = validateInstallBody(body, isPartial)
  if (!result.ok) {
    return installErrorResponse('BAD_REQUEST', result.message, 400)
  }
  await completeInstall(result.payload, isPartial)
  clearInstallToken()
  return NextResponse.json({ data: { redirect: '/settings' } })
}
