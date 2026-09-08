import { redirect } from 'next/navigation'
import { getSession } from './getSession'

/**
 * Resolves the current session for a server-rendered page and redirects to
 * the login page when there is none. The proxy only checks that a `session`
 * cookie exists, so every page under the app shell must go through this
 * before rendering anything a signed-in user is meant to see.
 */
export async function requirePageSession(): Promise<
  NonNullable<Awaited<ReturnType<typeof getSession>>>
> {
  const session = await getSession()
  if (!session) redirect('/login')
  return session
}
