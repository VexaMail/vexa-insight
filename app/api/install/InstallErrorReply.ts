import type { NextResponse } from 'next/server'

export type InstallErrorReply = NextResponse<{
  error: { code: string; message: string }
}>
