export function extractMainDomain(
  hostname: string | null | undefined,
): string | null {
  if (!hostname) return null
  // Basic implementation to extract the main domain.
  // For production, a library like psl (Public Suffix List) or parse-domain is better,
  // but for common domains (e.g. .com, .net, .co.uk), this regex approximation works.

  // Clean hostname (remove trailing dot, lower case)
  const cleanHostname = hostname.toLowerCase().replace(/\.$/, '')

  // A simple split approach to get the last two or three parts depending on standard second-level TLDs
  const parts = cleanHostname.split('.')

  if (parts.length <= 2) {
    return cleanHostname
  }

  // Handle some common second-level TLDs (.co.uk, .com.au, etc) where the last part is 2 chars
  const lastPart = parts[parts.length - 1]
  const secondLastPart = parts[parts.length - 2]

  if (!lastPart || !secondLastPart) {
    return cleanHostname
  }

  if (
    (lastPart.length === 2 && secondLastPart.length <= 3) || // .co.uk, .com.au
    secondLastPart === 'co' ||
    secondLastPart === 'com' ||
    secondLastPart === 'org' ||
    secondLastPart === 'net'
  ) {
    if (parts.length >= 3) {
      return parts.slice(-3).join('.')
    }
  }

  // Default: return the last two parts as the main domain
  return parts.slice(-2).join('.')
}
