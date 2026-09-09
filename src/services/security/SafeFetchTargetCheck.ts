import type { SafeFetchResult } from './SafeFetchResult'

export type SafeFetchTargetCheck =
  | { ok: true; url: URL; addresses: string[] }
  | { ok: false; failure: SafeFetchResult }
