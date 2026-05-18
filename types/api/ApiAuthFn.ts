import type { NextRequest } from 'next/server'

export type ApiAuthFn = (
  request: NextRequest,
) => Promise<{ status: 401; error: { code: string; message: string } } | null>
