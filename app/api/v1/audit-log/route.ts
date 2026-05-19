import { withApiAuth } from '@/services/api'
import { listAuditEvents } from '@/services/audit'
import { requirePermission } from '@/services/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * GET /api/v1/audit-log — returns recent audit-log entries (newest first).
 * Gated by the `audit:read` permission (admin-only by default; see
 * `constants/auth/rolePermissions.ts`).
 */
export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('audit:read')
    if (denied) return denied
    const url = new URL(request.url)
    const rawLimit = Number(url.searchParams.get('limit') ?? '100')
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.trunc(rawLimit), 1), 500)
      : 100
    const data = await listAuditEvents(limit)
    return NextResponse.json({ data })
  },
)
