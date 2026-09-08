/**
 * Maximum number of redirects safeFetch follows before giving up with
 * TOO_MANY_REDIRECTS. Kept small: the callers fetch policy files and post
 * webhooks, neither of which legitimately bounces more than a couple of times.
 */
export const MAX_REDIRECT_HOPS = 3
