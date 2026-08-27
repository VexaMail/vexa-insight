import { requireAdminAuth } from '@/services/api'
import { testConnection } from '@/services/imap'
import { getImapAccountsRow } from '@/services/settings-store'
import type { ImapAccountConfig } from '@/types/config'
import { imapTestRequestSchema } from '@/validators/imap'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
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
  const parsed = imapTestRequestSchema.safeParse(body)
  if (!parsed.success) {
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
  const input = parsed.data
  let account: ImapAccountConfig
  if ('accountId' in input) {
    const rows = getImapAccountsRow()
    const row = rows.find((r) => r.id === input.accountId)
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
    account = input.account
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
