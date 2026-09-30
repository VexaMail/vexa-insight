import { MAX_FILE_SIZE } from '@/utils/dmarc'
import type { NextRequest } from 'next/server'

/**
 * The request body, or null when it is larger than an uploaded report may
 * be. The declared length is checked first so an oversized body is refused
 * before it is read.
 */
export async function readTlsrptBody(
  request: NextRequest,
): Promise<Buffer | null> {
  const declared = Number(request.headers.get('content-length') ?? '0')
  if (declared > MAX_FILE_SIZE) return null
  const body = Buffer.from(await request.arrayBuffer())
  return body.length > MAX_FILE_SIZE ? null : body
}
