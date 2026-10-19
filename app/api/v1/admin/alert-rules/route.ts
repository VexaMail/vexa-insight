import { createAlertRule, listAlertRules } from '@/services/alerts'
import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { alertRuleInputSchema } from '@/validators/alerts'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(async (): Promise<NextResponse> => {
  const denied = await requirePermission('settings:read')
  if (denied) return denied
  return NextResponse.json({ data: await listAlertRules() })
})

/** Rules fire `auth.fail_rate_spike` through the configured webhooks. */
export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('settings:write')
    if (denied) return denied
    const parsed = alertRuleInputSchema.safeParse(
      await request.json().catch(() => null),
    )
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_INPUT',
            message: parsed.error.issues[0]?.message ?? 'Invalid alert rule',
          },
        },
        { status: 400 },
      )
    }
    const id = await createAlertRule(parsed.data)
    return NextResponse.json({ data: { id } }, { status: 201 })
  },
)
