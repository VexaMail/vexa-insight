import type { BimiResult } from '@/types/diagnostics'
import { resolveTxtSafe } from './resolveTxtSafe'
import { withDiagnosticsCache } from './withDiagnosticsCache'

export async function resolveBimi(domain: string): Promise<BimiResult> {
  return withDiagnosticsCache(`bimi:${domain}`, 5 * 60 * 1000, async () => {
    const hostname = `default._bimi.${domain}`
    const txtRecords = await resolveTxtSafe(hostname)
    const raw = txtRecords.flat().join('')

    if (raw.length === 0) {
      return { raw: null, valid: false, logoUrl: null, certificateUrl: null }
    }

    const hasVersion = raw.includes('v=BIMI1')
    const logoMatch = /l=([^;]+)/.exec(raw)
    const certMatch = /a=([^;]+)/.exec(raw)

    const logoUrl = logoMatch?.[1]?.trim() ?? null
    const certificateUrl = certMatch?.[1]?.trim() ?? null
    const valid = hasVersion && logoUrl !== null

    return { raw, valid, logoUrl, certificateUrl }
  })
}
