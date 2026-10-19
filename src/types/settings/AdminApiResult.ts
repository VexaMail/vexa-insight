/** Result of a call to an admin API route, with `data` unwrapped. */
export type AdminApiResult<T> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly message: string }
