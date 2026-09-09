import { apiErrorMessage } from './apiErrorMessage'

/** Deletes the user; resolves to the API's error message, if any. */
export async function deleteUser(id: string): Promise<string | null> {
  const res = await fetch(`/api/v1/users/${id}`, { method: 'DELETE' })
  if (res.ok) return null
  const errorBody: unknown = await res.json()
  return apiErrorMessage(errorBody, 'Failed to delete user')
}
