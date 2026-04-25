import { requireAdminAuth } from '@/services/api'
import { listFolders } from '@/services/imap'
import { getImapAccountsRow } from '@/services/settings'
import type { ImapAccountConfig } from '@/types/config'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  function parseBody(body: unknown): { accountId: number } | null {
    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
      return null
    }
    const o = body as Record<string, unknown>
    if (typeof o.accountId === 'number' && o.accountId > 0) {
      return { accountId: o.accountId }
    }
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
          message: 'Body must be { accountId: number }',
        },
      },
      { status: 400 },
    )
  }
  const rows = getImapAccountsRow()
  const row = rows.find((r) => r.id === parsed.accountId)
  if (!row) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Account not found' } },
      { status: 404 },
    )
  }
  const account: ImapAccountConfig = {
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
  try {
    const folders = await listFolders(account)
    return NextResponse.json({
      data: folders.map((f) => ({
        path: f.path,
        name: f.name,
        delimiter: f.delimiter,
        specialUse: f.specialUse,
      })),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { error: { code: 'SERVICE_UNAVAILABLE', message } },
      { status: 503 },
    )
  }
}
