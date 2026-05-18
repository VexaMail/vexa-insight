export function shouldJson(): boolean {
  if (process.env.VEXA_LOG_FORMAT === 'json') return true
  if (process.env.VEXA_LOG_FORMAT === 'text') return false
  return process.env.NODE_ENV === 'production'
}
