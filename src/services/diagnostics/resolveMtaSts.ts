import { safeFetch } from '@/services/security'
import type { MtaStsResult } from '@/types/diagnostics'
import { DNS_TIMEOUT_MS } from './dnsTimeoutMs'
import { emptyMtaStsResult } from './emptyMtaStsResult'
import { MTA_STS_HOSTNAME_REGEX } from './mtaStsHostnameRegex'
import { resolveTxtSafe } from './resolveTxtSafe'
import { withDiagnosticsCache } from './withDiagnosticsCache'

export async function resolveMtaSts(domain: string): Promise<MtaStsResult> {
  return withDiagnosticsCache(`mta-sts:${domain}`, 5 * 60 * 1000, async () => {
    if (!MTA_STS_HOSTNAME_REGEX.test(domain)) {
      return emptyMtaStsResult()
    }
    const hostname = `_mta-sts.${domain}`
    const txtRecords = await resolveTxtSafe(hostname)
    const raw = txtRecords.flat().join('')

    if (raw.length === 0) {
      return emptyMtaStsResult()
    }

    const hasVersion = raw.includes('v=STSv1')
    const idMatch = /id=([^;]+)/.exec(raw)
    const hasId = idMatch !== null

    let policyFileAccessible = false
    let mode: string | null = null
    let fileAge: string | null = null
    const mxRecords: string[] = []

    const policyUrl = `https://mta-sts.${domain}/.well-known/mta-sts.txt`
    const res = await safeFetch(policyUrl, {
      method: 'GET',
      timeoutMs: DNS_TIMEOUT_MS,
    })
    if (res.ok && res.response && res.response.ok) {
      try {
        policyFileAccessible = true
        const policyText = await res.response.text()
        const modeMatch = /mode:\s*(\S+)/.exec(policyText)
        mode = modeMatch?.[1] ?? null
        const ageMatch = /max_age:\s*(\d+)/.exec(policyText)
        fileAge = ageMatch?.[1] ?? null
        const mxMatches = policyText.matchAll(/mx:\s*(\S+)/g)
        for (const m of mxMatches) {
          if (m[1]) mxRecords.push(m[1])
        }
      } catch {
        // Policy body not readable
      }
    }

    const valid = hasVersion && hasId

    return {
      raw,
      valid,
      policyFileAccessible,
      policyHost: `mta-sts.${domain}`,
      mode,
      fileAge,
      mxRecords,
    }
  })
}
