export function validatePublicSpfHostMechanism(term: string): string | null {
  const address = /^(?:a|mx)(?::[^/\s]+)?(?:\/(\d+))?(?:\/\/(\d+))?$/i.exec(
    term,
  )
  if (
    address &&
    Number(address[1] ?? 32) <= 32 &&
    Number(address[2] ?? 128) <= 128
  )
    return null
  return `Unknown or malformed SPF mechanism: ${term}.`
}
