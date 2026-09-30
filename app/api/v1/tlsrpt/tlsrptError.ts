import { NextResponse } from 'next/server'

/** An error response of the TLS-RPT receiver in the API's error shape. */
export function tlsrptError(
  status: number,
  code: string,
  message: string,
): NextResponse {
  return NextResponse.json({ error: { code, message } }, { status })
}
