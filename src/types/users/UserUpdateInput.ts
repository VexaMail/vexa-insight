/**
 * Fields an admin may change on a user; each is applied only when present.
 */
export type UserUpdateInput = {
  username?: string | undefined
  role?: string | undefined
  allowedDomains?: string[] | undefined
  password?: string | undefined
}
