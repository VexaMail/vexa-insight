import type { UserPayload } from './UserPayload'

export type UserPayloadResult =
  { readonly payload: UserPayload } | { readonly error: string }
