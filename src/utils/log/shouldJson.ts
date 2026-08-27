import { env } from '@/lib/env'

export function shouldJson(): boolean {
  if (env.VEXA_LOG_FORMAT === 'json') return true
  if (env.VEXA_LOG_FORMAT === 'text') return false
  return env.NODE_ENV === 'production'
}
