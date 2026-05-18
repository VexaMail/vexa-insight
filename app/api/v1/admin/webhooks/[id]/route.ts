import { getDb, webhookEndpoints } from '@/lib/db'
import { withApiAuth } from '@/services/api'
import { dispatchWebhookEvent } from '@/services/notifications'
import type { IdRouteParams } from '@/types/api'
import { webhookEndpointInputSchema } from '@/validators/webhooks'
import { eq } from 'drizzle-orm'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const PATCH = withApiAuth(
  async (
    request: NextRequest,
    { params }: IdRouteParams,
  ): Promise<NextResponse> => {
    const { id } = await params
    const numericId = Number.parseInt(id, 10)
    if (!Number.isFinite(numericId)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'id must be numeric' } },
        { status: 400 },
      )
    }
    let body: unknown
    try {
      body = await request.json()
    } catch {
      body = null
    }
    const parsed = webhookEndpointInputSchema.partial().safeParse(body)
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
    const db = getDb()
    const updates: Record<string, unknown> = { updatedAt: new Date() }
    if (parsed.data.name !== undefined) updates.name = parsed.data.name
    if (parsed.data.url !== undefined) updates.url = parsed.data.url
    if (parsed.data.enabled !== undefined) updates.enabled = parsed.data.enabled
    if (parsed.data.events !== undefined)
      updates.events = parsed.data.events.join(',')
    if (parsed.data.secret !== undefined) updates.secret = parsed.data.secret
    db.update(webhookEndpoints)
      .set(updates)
      .where(eq(webhookEndpoints.id, numericId))
      .run()
    return NextResponse.json({ data: { id: numericId, updated: true } })
  },
)

export const DELETE = withApiAuth(
  async (
    _request: NextRequest,
    { params }: IdRouteParams,
  ): Promise<NextResponse> => {
    const { id } = await params
    const numericId = Number.parseInt(id, 10)
    if (!Number.isFinite(numericId)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'id must be numeric' } },
        { status: 400 },
      )
    }
    const db = getDb()
    db.delete(webhookEndpoints).where(eq(webhookEndpoints.id, numericId)).run()
    return NextResponse.json({ data: { id: numericId, deleted: true } })
  },
)

export const POST = withApiAuth(
  async (
    _request: NextRequest,
    { params }: IdRouteParams,
  ): Promise<NextResponse> => {
    const { id } = await params
    const numericId = Number.parseInt(id, 10)
    if (!Number.isFinite(numericId)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'id must be numeric' } },
        { status: 400 },
      )
    }
    await dispatchWebhookEvent('test.ping', {
      note: 'Test ping from /api/v1/admin/webhooks/<id> POST',
      endpointId: numericId,
    })
    return NextResponse.json({ data: { dispatched: true } })
  },
)
