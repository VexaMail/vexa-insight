import { appSettings, getDb } from '@/lib/db'
import { requireAdminAuth } from '@/services/api'
import { eq } from 'drizzle-orm'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const auth = requireAdminAuth(request)
  if (auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status })

  const db = getDb()
  const settingsResult = await db
    .select({
      geoipLastDbUpdateAt: appSettings.geoipLastDbUpdateAt,
      geoipLastDbUpdateError: appSettings.geoipLastDbUpdateError,
      licenseKey: appSettings.geoipMaxmindLicenseKey,
    })
    .from(appSettings)
    .limit(1)

  const settings = settingsResult[0]
  if (!settings) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Settings not found' } },
      { status: 404 },
    )
  }

  return NextResponse.json({
    data: {
      geoipLastDbUpdateAt: settings.geoipLastDbUpdateAt,
      geoipLastDbUpdateError: settings.geoipLastDbUpdateError,
      hasLicenseKey: !!settings.licenseKey,
    },
  })
}

export async function POST(request: NextRequest) {
  const auth = requireAdminAuth(request)
  if (auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status })

  let body: { licenseKey?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON' } },
      { status: 400 },
    )
  }

  if (typeof body.licenseKey !== 'string') {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'licenseKey must be a string',
        },
      },
      { status: 400 },
    )
  }

  const db = getDb()
  const settingsResult = await db.select().from(appSettings).limit(1)
  const settings = settingsResult[0]
  if (!settings) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Settings not found' } },
      { status: 404 },
    )
  }

  await db
    .update(appSettings)
    .set({ geoipMaxmindLicenseKey: body.licenseKey, updatedAt: new Date() })
    .where(eq(appSettings.id, settings.id))

  return NextResponse.json({ data: { success: true } })
}
