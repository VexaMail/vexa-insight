import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import {
  deleteWebhookEndpoint,
  dispatchWebhookEvent,
  updateWebhookEndpoint,
} from '@/services/notifications'
import type { IdRouteParams } from '@/types/api'
import { webhookEndpointUpdateSchema } from '@/validators/webhooks'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const PATCH = withApiAuth(
  async (
    request: NextRequest,
    { params }: IdRouteParams,
  ): Promise<NextResponse> => {
    const denied = await requirePermission('settings:write')
    if (denied) return denied
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
    const parsed = webhookEndpointUpdateSchema.safeParse(body)
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
    updateWebhookEndpoint(numericId, parsed.data)
    return NextResponse.json({ data: { id: numericId, updated: true } })
  },
)

export const DELETE = withApiAuth(
  async (
    _request: NextRequest,
    { params }: IdRouteParams,
  ): Promise<NextResponse> => {
    const denied = await requirePermission('settings:write')
    if (denied) return denied
    const { id } = await params
    const numericId = Number.parseInt(id, 10)
    if (!Number.isFinite(numericId)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'id must be numeric' } },
        { status: 400 },
      )
    }
    deleteWebhookEndpoint(numericId)
    return NextResponse.json({ data: { id: numericId, deleted: true } })
  },
)

export const POST = withApiAuth(
  async (
    _request: NextRequest,
    { params }: IdRouteParams,
  ): Promise<NextResponse> => {
    const denied = await requirePermission('settings:write')
    if (denied) return denied
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
