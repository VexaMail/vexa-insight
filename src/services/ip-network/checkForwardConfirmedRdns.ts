import type { ForwardConfirmedRdns } from '@/types/ip-network'
import dns from 'node:dns'
import { isIPv4 } from 'node:net'

/** Looks up the PTR names of an address and checks each resolves back to it. */
export async function checkForwardConfirmedRdns(
  ip: string,
): Promise<ForwardConfirmedRdns> {
  let ptrNames: string[]
  try {
    ptrNames = await dns.promises.reverse(ip)
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    const status =
      code === 'ENOTFOUND' || code === 'ENODATA' ? 'no_ptr' : 'error'
    return { ptrNames: [], confirmedName: null, status }
  }
  if (ptrNames.length === 0) {
    return { ptrNames, confirmedName: null, status: 'no_ptr' }
  }
  const resolve = isIPv4(ip) ? dns.promises.resolve4 : dns.promises.resolve6
  for (const name of ptrNames) {
    const addresses = await resolve(name).catch(() => [] as string[])
    if (addresses.includes(ip)) {
      return { ptrNames, confirmedName: name, status: 'confirmed' }
    }
  }
  return { ptrNames, confirmedName: null, status: 'mismatch' }
}
