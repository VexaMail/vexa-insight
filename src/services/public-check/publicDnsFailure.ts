export function publicDnsFailure(error: unknown): [] | null {
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    (error.code === 'ENODATA' || error.code === 'ENOTFOUND')
  )
    return []
  return null
}
