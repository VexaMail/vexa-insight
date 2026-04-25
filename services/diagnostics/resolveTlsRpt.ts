import type { TlsRptResult } from '@/types/diagnostics'
import { resolveTxtSafe } from './resolveTxtSafe'
import { withDiagnosticsCache } from './withDiagnosticsCache'

export async function resolveTlsRpt(domain: string): Promise<TlsRptResult> {
  return withDiagnosticsCache(`tls-rpt:${domain}`, 5 * 60 * 1000, async () => {
    const hostname = `_smtp._tls.${domain}`
    const txtRecords = await resolveTxtSafe(hostname)
    const raw = txtRecords.flat().join('')

    if (raw.length === 0) {
      return { raw: null, valid: false, ruaAddresses: [] }
    }

    const hasVersion = raw.includes('v=TLSRPTv1')
    const ruaMatch = /rua=([^;]+)/.exec(raw)
    const ruaAddresses: string[] = []

    if (ruaMatch && ruaMatch[1]) {
      const addresses = ruaMatch[1].split(',').map((a) => a.trim())
      ruaAddresses.push(...addresses)
    }

    const valid = hasVersion && ruaAddresses.length > 0

    return { raw, valid, ruaAddresses }
  })
}
