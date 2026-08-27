import { performDnsLookup } from './performDnsLookup'

/**
 * Executes reverse DNS and normalizes failures to hostname lookup states.
 */
export async function executeDns(
  ip: string,
  timeoutMs: number,
): Promise<{
  hostname: string | null
  status: 'success' | 'failed' | 'not_found'
  error: string | null
}> {
  try {
    const hostnames = await performDnsLookup(ip, timeoutMs)
    if (hostnames.length > 0) {
      return {
        hostname: hostnames[0] ?? null,
        status: 'success',
        error: null,
      }
    }
    return { hostname: null, status: 'not_found', error: 'No PTR record' }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorCode = (error as { code?: string }).code

    if (errorCode === 'ENOTFOUND') {
      return { hostname: null, status: 'not_found', error: 'ENOTFOUND' }
    }
    if (errorMessage === 'TIMEOUT') {
      return {
        hostname: null,
        status: 'failed',
        error: 'Timeout resolving DNS',
      }
    }
    return {
      hostname: null,
      status: 'failed',
      error: errorMessage || 'Unknown DNS Error',
    }
  }
}
