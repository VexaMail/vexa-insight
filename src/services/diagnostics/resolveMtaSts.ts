import type { MtaStsResult } from '@/types/diagnostics'
import { emptyMtaStsResult } from './emptyMtaStsResult'
import { fetchMtaStsPolicy } from './fetchMtaStsPolicy'
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
    const hasId = /id=([^;]+)/.exec(raw) !== null
    const policy = await fetchMtaStsPolicy(domain)

    return {
      raw,
      valid: hasVersion && hasId,
      policyHost: `mta-sts.${domain}`,
      ...policy,
    }
  })
}
