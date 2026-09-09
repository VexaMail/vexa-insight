import { isPrivateIp } from './isPrivateIp'
import { resolveHostAddresses } from './resolveHostAddresses'
import type { SafeFetchAddressCheck } from './SafeFetchAddressCheck'
import { safeFetchErrorResult } from './safeFetchErrorResult'

/** Resolves the host and rejects it if any address is private or reserved. */
export async function resolvePublicAddresses(
  host: string,
): Promise<SafeFetchAddressCheck> {
  let addresses: string[]
  try {
    addresses = await resolveHostAddresses(host)
  } catch (err) {
    return {
      ok: false,
      failure: safeFetchErrorResult(
        'DNS_FAILED',
        err instanceof Error ? err.message : 'DNS lookup failed',
      ),
    }
  }

  for (const addr of addresses) {
    if (isPrivateIp(addr)) {
      return {
        ok: false,
        failure: safeFetchErrorResult(
          'PRIVATE_HOST_NOT_ALLOWED',
          `Host ${host} resolves to private/reserved address ${addr}`,
        ),
      }
    }
  }

  return { ok: true, addresses }
}
