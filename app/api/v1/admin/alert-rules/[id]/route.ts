import { deleteAlertRule, updateAlertRule } from '@/services/alerts'
import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import type { IdRouteParams } from '@/types/api'
import { parseIdParam } from '@/utils/api'
import { alertRuleUpdateSchema } from '@/validators/alerts'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const PATCH = withApiAuth(
  async (
    request: NextRequest,
    { params }: IdRouteParams,
  ): Promise<NextResponse> => {
    const denied = await requirePermission('settings:write')
    if (denied) return denied
    const id = parseIdParam((await params).id)
    const parsed = alertRuleUpdateSchema.safeParse(
      await request.json().catch(() => null),
    )
    if (id == null || !parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_INPUT',
            message: parsed.error?.issues[0]?.message ?? 'Invalid id',
          },
        },
        { status: 400 },
      )
    }
    const updated = await updateAlertRule(id, parsed.data)
    return updated
      ? NextResponse.json({ data: { id } })
      : NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Alert rule not found' } },
          { status: 404 },
        )
  },
)

export const DELETE = withApiAuth(
  async (
    _request: NextRequest,
    { params }: IdRouteParams,
  ): Promise<NextResponse> => {
    const denied = await requirePermission('settings:write')
    if (denied) return denied
    const id = parseIdParam((await params).id)
    if (id == null || !(await deleteAlertRule(id))) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Alert rule not found' } },
        { status: 404 },
      )
    }
    return NextResponse.json({ data: { id } })
  },
)
