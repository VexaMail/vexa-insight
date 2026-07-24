import { withApiAuth } from '@/services/api'
import { requirePermission } from '@/services/auth'
import { deleteUser, updateUser } from '@/services/users'
import { updateUserInputSchema } from '@/validators/users'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const PUT = withApiAuth(
  async (
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
  ): Promise<NextResponse> => {
    const denied = await requirePermission('users:write')
    if (denied) return denied

    const { id } = await context.params

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } },
        { status: 400 },
      )
    }

    const parsed = updateUserInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: parsed.error.issues[0]?.message ?? 'Invalid user update',
          },
        },
        { status: 400 },
      )
    }

    try {
      await updateUser(id, parsed.data)
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
    const denied = await requirePermission('users:write')
    if (denied) return denied

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
