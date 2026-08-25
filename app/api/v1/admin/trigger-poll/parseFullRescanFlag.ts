import type { NextRequest } from 'next/server'

/**
 * Reads the optional { fullRescan: boolean } request body. The endpoint is
 * also called with no body at all, so anything unparseable means "no".
 */
export async function parseFullRescanFlag(
  request: NextRequest,
): Promise<boolean> {
  try {
    const body: unknown = await request.json()
    return (
      typeof body === 'object' &&
      body !== null &&
      (body as { fullRescan?: unknown }).fullRescan === true
    )
  } catch {
    return false
  }
}
