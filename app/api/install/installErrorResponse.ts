import { NextResponse } from 'next/server'
import type { InstallErrorReply } from './InstallErrorReply'

export function installErrorResponse(
  code: string,
  message: string,
  status: number,
): InstallErrorReply {
  return NextResponse.json({ error: { code, message } }, { status })
}
