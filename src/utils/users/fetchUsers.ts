import type { User } from '@/types/users'

/** Loads every user; resolves to null when the request is rejected. */
export async function fetchUsers(): Promise<User[] | null> {
  const res = await fetch('/api/v1/users')
  if (!res.ok) return null
  const json = (await res.json()) as { data: User[] }
  return json.data
}
