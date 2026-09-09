import type { SafeFetchResult } from './SafeFetchResult'

export type SafeFetchAddressCheck =
  { ok: true; addresses: string[] } | { ok: false; failure: SafeFetchResult }
