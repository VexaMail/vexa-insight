import { requireAdminAuth } from '@/services/api'
import {
  getGeoIpAdminSettings,
  setGeoIpMaxmindLicenseKey,
} from '@/services/geoip'
import { geoipSettingsUpdateSchema } from '@/validators/geoip'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const auth = requireAdminAuth(request)
  if (auth)
    return NextResponse.json({ error: auth.error }, { status: auth.status })

  const settings = await getGeoIpAdminSettings()
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

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON' } },
      { status: 400 },
    )
  }

  const parsed = geoipSettingsUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message:
            parsed.error.issues[0]?.message ?? 'licenseKey must be a string',
        },
      },
      { status: 400 },
    )
  }

  const updated = await setGeoIpMaxmindLicenseKey(parsed.data.licenseKey)
  if (!updated) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Settings not found' } },
      { status: 404 },
    )
  }

  return NextResponse.json({ data: { success: true } })
}
