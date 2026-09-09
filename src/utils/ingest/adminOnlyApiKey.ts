/** The shared key drives admin-only actions; never ship it to viewers. */
export function adminOnlyApiKey(
  role: string,
  secretKey: string | null | undefined,
): string {
  return role === 'admin' ? (secretKey ?? '') : ''
}
