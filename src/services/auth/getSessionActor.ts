import type { Actor } from '@/types/issues'
import { getSession } from './getSession'

/** The signed-in user as an actor; null for API-key callers. */
export async function getSessionActor(): Promise<Actor | null> {
  const session = await getSession()
  return session ? { id: session.user.id, name: session.user.username } : null
}
