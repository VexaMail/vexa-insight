import { safeFetch } from '@/services/security'
import type { MtaStsPolicyFile } from '@/types/diagnostics'
import { parseMtaStsPolicyText } from '@/utils/diagnostics'
import { DNS_TIMEOUT_MS } from './dnsTimeoutMs'

/**
 * Fetches the policy file over HTTPS. An unreachable file is reported as
 * inaccessible; a reachable file whose body cannot be read still counts as
 * accessible, with no fields.
 */
export async function fetchMtaStsPolicy(
  domain: string,
): Promise<MtaStsPolicyFile> {
  const policyUrl = `https://mta-sts.${domain}/.well-known/mta-sts.txt`
  const res = await safeFetch(policyUrl, {
    method: 'GET',
    timeoutMs: DNS_TIMEOUT_MS,
  })
  if (!res.ok || !res.response || !res.response.ok) {
    return {
      policyFileAccessible: false,
      mode: null,
      fileAge: null,
      mxRecords: [],
    }
  }
  try {
    const policyText = await res.response.text()
    return { policyFileAccessible: true, ...parseMtaStsPolicyText(policyText) }
  } catch {
    // Policy body not readable
    return {
      policyFileAccessible: true,
      mode: null,
      fileAge: null,
      mxRecords: [],
    }
  }
}
