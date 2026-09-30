/** A report fetch: 404 is how SNDS says there is no data, not a failure. */
export type SndsFetchResult =
  | { readonly status: 'ok'; readonly body: unknown }
  | { readonly status: 'no-data' }
