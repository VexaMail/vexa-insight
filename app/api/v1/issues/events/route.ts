import { withApiAuth } from '@/services/api'
import { getSessionActor, requirePermission } from '@/services/auth'
import {
  canAccessIssueKey,
  listIssueEvents,
  recordIssueEvent,
} from '@/services/issues'
import { issueEventInputSchema } from '@/validators/issues'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/** History of one issue (`?key=`), oldest first. */
export const GET = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('reports:read')
    if (denied) return denied
    const key = request.nextUrl.searchParams.get('key')
    if (!key) {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'key is required' } },
        { status: 400 },
      )
    }
    if (!(await canAccessIssueKey(key))) {
      return NextResponse.json({ data: [] })
    }
    return NextResponse.json({ data: await listIssueEvents([key]) })
  },
)

/** Acknowledge, snooze, reopen, resolve or annotate an issue. */
export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('reports:write')
    if (denied) return denied
    const parsed = issueEventInputSchema.safeParse(
      await request.json().catch(() => null),
    )
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_INPUT',
            message: parsed.error.issues[0]?.message ?? 'Invalid input',
          },
        },
        { status: 400 },
      )
    }
    const { snoozeHours, ...input } = parsed.data
    if (!(await canAccessIssueKey(input.issueKey))) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Issue not found' } },
        { status: 404 },
      )
    }
    await recordIssueEvent({
      ...input,
      snoozedUntil: snoozeHours
        ? Math.floor(Date.now() / 1000) + snoozeHours * 3600
        : null,
      actor: await getSessionActor(),
    })
    return NextResponse.json({ data: { recorded: true } }, { status: 201 })
  },
)
