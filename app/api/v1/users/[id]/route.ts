import { getSession } from '@/services/auth'
import { deleteUser, updateUser } from '@/services/users'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
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
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
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
}
