import { withApiAuth } from '@/services/api'
import { getSession } from '@/services/auth'
import { createUser, getUsers } from '@/services/users'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const GET = withApiAuth(async (): Promise<NextResponse> => {
  const session = await getSession()
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Forbidden' } },
      { status: 403 },
    )
  }
  const usersList = await getUsers()
  return NextResponse.json({ data: usersList })
})

export const POST = withApiAuth(
  async (request: NextRequest): Promise<NextResponse> => {
    const session = await getSession()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Forbidden' } },
        { status: 403 },
      )
    }

    const body = await request.json()

    if (!body.username || !body.password) {
      return NextResponse.json(
        {
          error: {
            code: 'BAD_REQUEST',
            message: 'Username and password are required',
          },
        },
        { status: 400 },
      )
    }

    try {
      const result = await createUser(body)
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
