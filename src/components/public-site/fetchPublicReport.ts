import type { PublicCheckError } from '../../types/public-check/PublicCheckError'
import type { PublicDomainReport } from '../../types/public-check/PublicDomainReport'

export async function fetchPublicReport(
  domain: string,
  signal?: AbortSignal,
  selector?: string,
): Promise<PublicDomainReport> {
  const response = await fetch(
    `/api/public/domain-check?domain=${encodeURIComponent(domain)}${selector ? `&selector=${encodeURIComponent(selector)}` : ''}`,
    {
      signal: signal
        ? AbortSignal.any([signal, AbortSignal.timeout(20_000)])
        : AbortSignal.timeout(20_000),
    },
  )
  const body = (await response.json()) as PublicDomainReport | PublicCheckError
  if ('error' in body) throw new Error(body.error)
  if (!response.ok)
    throw new Error('The check could not finish. Try again shortly.')
  return body
}
