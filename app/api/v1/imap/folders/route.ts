import { requireAdminAuth } from '@/services/api'
import { listFolders, serializeImapFolders } from '@/services/imap'
import { findImapAccountConfig } from '@/services/settings-store'
import { imapFoldersRequestSchema } from '@/validators/imap'
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
  const parsed = imapFoldersRequestSchema.safeParse(body)
  if (!parsed.success) {
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
  const account = findImapAccountConfig(parsed.data.accountId)
  if (!account) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Account not found' } },
      { status: 404 },
    )
  }
  try {
    const folders = await listFolders(account)
    return NextResponse.json({ data: serializeImapFolders(folders) })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { error: { code: 'SERVICE_UNAVAILABLE', message } },
      { status: 503 },
    )
  }
}
