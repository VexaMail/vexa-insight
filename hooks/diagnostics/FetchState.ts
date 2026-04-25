import type { DnsDiagnostics } from '@/types/diagnostics'

export type FetchState = {
  /** The domainId for which data/error was last settled. null = never fetched. */
  fetchedForDomainId: number | null
  data: DnsDiagnostics | null
  error: string | null
}
