/**
 * HTTP status codes that carry a `Location` header safeFetch should follow.
 */
export const REDIRECT_STATUSES: ReadonlySet<number> = new Set([
  301, 302, 303, 307, 308,
])
