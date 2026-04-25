import { requireAdminAuth } from '@/services/api'
import { testConnection } from '@/services/imap'
import { getImapAccountsRow } from '@/services/settings'
import type { ImapAccountConfig } from '@/types/config'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { parseAccount } from './parseAccount'

export async function POST(request: NextRequest): Promise<NextResponse> {
  function parseBody(
    body: unknown,
  ): { account: ImapAccountConfig } | { accountId: number } | null {
    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
      return null
    }
    const o = body as Record<string, unknown>
    if (typeof o.accountId === 'number' && o.accountId > 0) {
      return { accountId: o.accountId }
    }
    const fromNested = parseAccount(o.account)
    if (fromNested) return { account: fromNested }
    const fromTop = parseAccount(o)
    if (fromTop) return { account: fromTop }
    return null
  }

  const auth = requireAdminAuth(request)
  if (auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON' } },
      { status: 400 },
    )
  }
  const parsed = parseBody(body)
  if (!parsed) {
    return NextResponse.json(
      {
        error: {
          code: 'BAD_REQUEST',
          message:
            'Body must be { accountId: number } or { server, port?, username, password } (or { account: { ... } })',
        },
      },
      { status: 400 },
    )
  }
  let account: ImapAccountConfig
  if ('accountId' in parsed) {
    const rows = getImapAccountsRow()
    const row = rows.find((r) => r.id === parsed.accountId)
    if (!row) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Account not found' } },
        { status: 404 },
      )
    }
    account = {
      id: row.id,
      server: row.server,
      port: row.port,
      username: row.username,
      password: row.password,
      fetchIncludeTrash: row.fetchIncludeTrash,
      fetchIncludeAllFolders: row.fetchIncludeAllFolders,
      postProcessAction: row.postProcessAction,
      postProcessFolder: row.postProcessFolder,
      moveToTrashAfterProcess: row.moveToTrashAfterProcess,
      markAsReadAfterProcess: row.markAsReadAfterProcess,
    }
  } else {
    account = parsed.account
  }
  const result = await testConnection(account)
  if (!result.success) {
    return NextResponse.json(
      {
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: result.message,
        },
      },
      { status: 503 },
    )
  }
  return NextResponse.json({
    data: { success: true, message: result.message },
  })
}
