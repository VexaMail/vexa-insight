import type { ApiAuthFn } from './ApiAuthFn'

export type WithApiAuthOptions = {
  /** Test seam. Defaults to requireAdminAccess. */
  authFn?: ApiAuthFn
}
