import { getDb, webhookEndpoints } from '@/lib/db'
import { requireAdminAccess } from '@/services/api'
import { webhookEndpointInputSchema } from '@/validators/webhooks'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const access = await requireAdminAccess(request)
  if (access) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }
  const db = getDb()
  const rows = db.select().from(webhookEndpoints).all()
  const data = rows.map((row) => ({
    ...row,
    secret: row.secret ? '••••••••' : null,
    events: row.events.split(',').map((s) => s.trim()),
  }))
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const access = await requireAdminAccess(request)
  if (access) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }
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
          message: parsed.error.issues[0]?.message ?? 'Invalid webhook config',
        },
      },
      { status: 400 },
    )
  }
  const db = getDb()
  const now = new Date()
  const inserted = db
    .insert(webhookEndpoints)
    .values({
      name: parsed.data.name,
      url: parsed.data.url,
      enabled: parsed.data.enabled,
      events: parsed.data.events.join(','),
      secret: parsed.data.secret ?? null,
      createdAt: now,
      updatedAt: now,
    })
    .returning()
    .get()
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
}
