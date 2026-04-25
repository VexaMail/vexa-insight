import { isInstalled } from '@/services/install'
import { NextResponse } from 'next/server'

/**
 * GET /api/install/check — returns whether the app is installed.
 * Used by proxy to decide redirect. No auth.
 */
export async function GET(): Promise<
  NextResponse<{ data: { installed: boolean } }>
> {
  const installed = isInstalled()
  return NextResponse.json({ data: { installed } })
}
