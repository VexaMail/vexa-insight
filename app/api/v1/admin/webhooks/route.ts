import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import {
  createWebhookEndpoint,
  listWebhookEndpoints,
} from '@/services/notifications'
import { webhookEndpointInputSchema } from '@/validators/webhooks'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(async (): Promise<NextResponse> => {
  const denied = await requirePermission('settings:read')
  if (denied) return denied
  const rows = listWebhookEndpoints()
  const data = rows.map((row) => ({
    ...row,
    secret: row.secret ? '••••••••' : null,
    events: row.events.split(',').map((s) => s.trim()),
  }))
  return NextResponse.json({ data })
})

export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('settings:write')
    if (denied) return denied
    let body: unknown
    try {
      body = await request.json()
    } catch {
      body = null
    }
    const parsed = webhookEndpointInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_INPUT',
            message:
              parsed.error.issues[0]?.message ?? 'Invalid webhook config',
          },
        },
        { status: 400 },
      )
    }
    const inserted = createWebhookEndpoint(parsed.data)
    return NextResponse.json(
      {
        data: {
          ...inserted,
          secret: inserted.secret ? '••••••••' : null,
          events: inserted.events.split(',').map((s) => s.trim()),
        },
      },
      { status: 201 },
    )
  },
)
