import { withApiAuth } from '@/services/api'
import { getSession } from '@/services/auth'
import { deleteUser, updateUser } from '@/services/users'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const PUT = withApiAuth(
  async (
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    const session = await getSession()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Forbidden' } },
        { status: 403 },
      )
    }

    const { id } = await context.params
    const body = await request.json()

    try {
      await updateUser(id, body)
      return NextResponse.json({ data: { success: true } })
    } catch (err: unknown) {
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

export const DELETE = withApiAuth(
  async (
    _request: NextRequest,
    context: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    const session = await getSession()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Forbidden' } },
        { status: 403 },
      )
    }

    const { id } = await context.params

    try {
      await deleteUser(id)
      return NextResponse.json({ data: { success: true } })
    } catch (err: unknown) {
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
