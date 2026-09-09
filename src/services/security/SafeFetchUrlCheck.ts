import type { SafeFetchResult } from './SafeFetchResult'

export type SafeFetchUrlCheck =
  { ok: true; url: URL } | { ok: false; failure: SafeFetchResult }
