import { useEffect } from 'react'
import type { PublicDomainHistoryOptions } from '../../../types/public-check/PublicDomainHistoryOptions'
import { readPublicDomainPath } from '../readPublicDomainPath'
import { setPublicDomainMetadata } from '../setPublicDomainMetadata'

export function usePublicDomainHistory({
  initialDomain,
  load,
  reset,
  setDomain,
}: PublicDomainHistoryOptions): void {
  useEffect(() => {
    const synchronize = () => {
      const domain = readPublicDomainPath()
      reset()
      setDomain(domain)
      setPublicDomainMetadata(domain)
      if (domain)
        void load(
          domain,
          new URLSearchParams(window.location.search).get('selector') ??
            undefined,
        )
    }
    synchronize()
    window.addEventListener('popstate', synchronize)
    return () => {
      window.removeEventListener('popstate', synchronize)
    }
  }, [initialDomain, load, reset, setDomain])
}
