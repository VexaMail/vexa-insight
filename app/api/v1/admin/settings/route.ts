import { invalidateConfigCache } from '@/lib/config'
import { requireAdminAuth } from '@/services/api'
import { getSettingsPublic, updateSettings } from '@/services/settings'
import { settingsUpdateSchema } from '@/utils/validation'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function GET(request: NextRequest): NextResponse {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const data = getSettingsPublic()
  if (!data) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Settings not found' } },
      { status: 404 },
    )
  }
  return NextResponse.json({ data })
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } },
      { status: 400 },
    )
  }
  const parsed = settingsUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: parsed.error.message,
        },
      },
      { status: 400 },
    )
  }
  updateSettings(parsed.data)
  invalidateConfigCache()
  const data = getSettingsPublic()
  if (!data) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to read settings' } },
      { status: 500 },
    )
  }
  return NextResponse.json({ data })
}
