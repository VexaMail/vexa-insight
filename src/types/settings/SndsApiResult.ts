/** Result of a call to one of the SNDS admin endpoints. */
export type SndsApiResult<T> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly message: string }
