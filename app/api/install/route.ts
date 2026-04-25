import { runMigrations } from '@/lib/db'
import { completeInstall, isInstalled } from '@/services/install'
import { validateInstallBody } from '@/utils/install'
import { NextResponse } from 'next/server'
import { isPartiallyInstalled } from '../../../services/install/isPartiallyInstalled'

/**
 * POST /api/install — complete initial setup. No auth.
 * Returns 403 if already installed; 400 on validation error; 200 { data: { redirect: '/settings' } } on success.
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
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON' } },
      { status: 400 },
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
  return NextResponse.json({ data: { redirect: '/settings' } })
}
