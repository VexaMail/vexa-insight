import { requireAdminAccess, requireAdminAuth } from '@/services/api'
import { getSession, requirePermission } from '@/services/auth'
import {
  getSelfUpdateCapability,
  getSelfUpdateStatus,
  runSelfUpdate,
  writeSelfUpdateAuditEntry,
} from '@/services/updates'
import { selfUpdateApplySchema } from '@/validators/updates'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const access = await requireAdminAccess(request)
  if (access) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }
  const denied = await requirePermission('settings:read')
  if (denied) return denied
  const data = getSelfUpdateStatus()
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const capability = getSelfUpdateCapability()
  if (!capability.canApply) {
    return NextResponse.json(
      {
        error: {
          code: 'SELF_UPDATE_UNAVAILABLE',
          message:
            capability.reasons[0] ??
            'Self-update not supported on this install',
        },
      },
      { status: 409 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    body = null
  }
  const parsed = selfUpdateApplySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'INVALID_REF',
          message:
            parsed.error.issues[0]?.message ??
            'ref must match vMAJOR.MINOR.PATCH',
        },
      },
      { status: 400 },
    )
  }

  const refToApply = parsed.data.ref ?? null
  const session = await getSession()
  const ipHeader =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  writeSelfUpdateAuditEntry({
    timestamp: new Date().toISOString(),
    actor: session?.user.username ?? 'api-key',
    actorType: session ? 'session' : 'api-key',
    ip: ipHeader,
    ref: refToApply,
    userAgent: request.headers.get('user-agent'),
  })

  runSelfUpdate(refToApply)

  const data = getSelfUpdateStatus()
  return NextResponse.json({ data })
}
