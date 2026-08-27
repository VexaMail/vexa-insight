import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { createUser, getUsers } from '@/services/users'
import { createUserInputSchema } from '@/validators/users'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(async (): Promise<NextResponse> => {
  const denied = await requirePermission('users:read')
  if (denied) return denied
  const usersList = getUsers()
  return NextResponse.json({ data: usersList })
})

export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const denied = await requirePermission('users:write')
    if (denied) return denied

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } },
        { status: 400 },
      )
    }

    const parsed = createUserInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message:
              parsed.error.issues[0]?.message ??
              'Username and password are required',
          },
        },
        { status: 400 },
      )
    }

    try {
      const result = await createUser(parsed.data)
      return NextResponse.json({ data: result })
    } catch (err: unknown) {
      // If it's a unique constraint failure typically err.code === 'SQLITE_CONSTRAINT_UNIQUE'
      const errorMessage = err instanceof Error ? err.message : String(err)
      if (errorMessage.includes('UNIQUE')) {
        return NextResponse.json(
          {
            error: { code: 'BAD_REQUEST', message: 'Username already exists' },
          },
          { status: 400 },
        )
      }
      return NextResponse.json(
        {
          error: {
            code: 'BAD_REQUEST',
            message: err instanceof Error ? err.message : String(err),
          },
        },
        { status: 400 },
      )
    }
  },
)
