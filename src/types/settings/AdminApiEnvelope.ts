/** The JSON body every admin API route answers with. */
export type AdminApiEnvelope<T> = {
  readonly data?: T
  readonly error?: { readonly message?: string }
}
