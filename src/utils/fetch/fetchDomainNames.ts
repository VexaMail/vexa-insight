import type { DomainNamesResponse } from '@/types/domains'

/** Names of every monitored domain the session can see; empty on failure. */
export async function fetchDomainNames(): Promise<string[]> {
  try {
    const res = await fetch('/api/v1/domains')
    if (!res.ok) return []
    const body = (await res.json()) as DomainNamesResponse
    return (body.data ?? []).map((row) => row.name)
  } catch {
    return []
  }
}
