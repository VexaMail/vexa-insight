import type { NextRequest } from 'next/server'

/** The JSON body, or null when there is none or it does not parse. */
export async function readJsonOrNull(request: NextRequest): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    return null
  }
}
