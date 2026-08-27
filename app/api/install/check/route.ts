import { getOrCreateInstallToken, isInstalled } from '@/services/install'
import { NextResponse } from 'next/server'

/**
 * GET /api/install/check — returns whether the app is installed.
 * When not installed, eagerly creates the boot install token (idempotent;
 * `getOrCreateInstallToken` short-circuits on repeated calls) so it gets
 * printed to stdout even if no remote installer has hit POST yet. The
 * actual token value is never returned in the response.
 */
export function GET(): NextResponse<{
  data: { installed: boolean; requiresToken: boolean }
}> {
  const installed = isInstalled()
  if (!installed) {
    getOrCreateInstallToken()
  }
  return NextResponse.json({
    data: { installed, requiresToken: !installed },
  })
}
