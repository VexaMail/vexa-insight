import type { User, UserPayload } from '@/types/users'

/** Creates or updates the user; resolves to the API's error message, if any. */
export async function submitUser(
  user: User | undefined,
  payload: UserPayload,
): Promise<string | null> {
  const url = user ? `/api/v1/users/${user.id}` : '/api/v1/users'
  const res = await fetch(url, {
    method: user ? 'PUT' : 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) return null
  const err = (await res.json()) as { error?: { message?: string } }
  return err.error?.message || 'Error occurred'
}
