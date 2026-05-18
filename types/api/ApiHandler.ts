import type { NextRequest, NextResponse } from 'next/server'

export type ApiHandler<TArgs extends unknown[]> = (
  request: NextRequest,
  ...args: TArgs
) => Promise<NextResponse> | NextResponse
