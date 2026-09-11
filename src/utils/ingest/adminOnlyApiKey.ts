/** The shared token drives admin-only actions; never ship it to viewers. */
export function adminOnlyApiKey(
  role: string,
  apiToken: string | null | undefined,
): string {
  return role === 'admin' ? (apiToken ?? '') : ''
}
