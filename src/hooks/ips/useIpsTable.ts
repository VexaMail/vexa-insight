import type { IpSummaryData } from '@/types/ips'
import { extractMainDomain } from '@/utils/domains'
import { useCallback, useMemo } from 'react'

export function useIpsTable(ips: readonly IpSummaryData[]) {
  const regionNames = useMemo(() => {
    try {
      return new Intl.DisplayNames(['en'], { type: 'region' })
    } catch {
      return null
    }
  }, [])

  const getCountryLabel = useCallback(
    (code: string) => {
      if (!regionNames) return code
      try {
        const name = regionNames.of(code)
        return name ? `${name} - ${code}` : code
      } catch {
        return code
      }
    },
    [regionNames],
  )

  const uniqueCountries = useMemo(() => {
    const countriesSet = new Set<string>()
    for (const ip of ips) {
      if (ip.countryCode) countriesSet.add(ip.countryCode)
    }
    return Array.from(countriesSet)
      .map((code) => ({ code, label: getCountryLabel(code) }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [ips, getCountryLabel])

  const uniqueMainDomains = useMemo(() => {
    const domainsSet = new Set<string>()
    for (const ip of ips) {
      if (!ip.hostname) continue
      const mainDomain = extractMainDomain(ip.hostname)
      if (mainDomain) domainsSet.add(mainDomain)
    }
    return Array.from(domainsSet).sort((a, b) => a.localeCompare(b))
  }, [ips])

  return { uniqueCountries, uniqueMainDomains }
}
