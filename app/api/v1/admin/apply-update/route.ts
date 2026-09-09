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
import { invalidRefResponse } from './invalidRefResponse'
import { readJsonOrNull } from './readJsonOrNull'
import { requestClientIp } from './requestClientIp'
import { selfUpdateUnavailableResponse } from './selfUpdateUnavailableResponse'

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
  if (!capability.canApply) return selfUpdateUnavailableResponse(capability)

  const parsed = selfUpdateApplySchema.safeParse(await readJsonOrNull(request))
  if (!parsed.success) return invalidRefResponse(parsed.error)

  const refToApply = parsed.data.ref ?? null
  const session = await getSession()
  writeSelfUpdateAuditEntry({
    timestamp: new Date().toISOString(),
    actor: session?.user.username ?? 'api-key',
    actorType: session ? 'session' : 'api-key',
    ip: requestClientIp(request),
    ref: refToApply,
    userAgent: request.headers.get('user-agent'),
  })

  runSelfUpdate(refToApply)

  const data = getSelfUpdateStatus()
  return NextResponse.json({ data })
}
