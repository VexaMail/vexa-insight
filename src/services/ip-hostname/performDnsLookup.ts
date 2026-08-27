import dns from 'node:dns'

/**
 * Wraps the native reverse-DNS lookup with a timeout.
 */
export async function performDnsLookup(
  ip: string,
  timeoutMs: number,
): Promise<string[]> {
  let timer: NodeJS.Timeout | undefined
  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => {
      reject(new Error('TIMEOUT'))
    }, timeoutMs)
  })
  try {
    return await Promise.race([dns.promises.reverse(ip), timeoutPromise])
  } finally {
    clearTimeout(timer)
  }
}
