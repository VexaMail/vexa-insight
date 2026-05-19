import { env } from '@/lib/env'

export function getBaseUrl(): string {
  if (typeof env.VERCEL_URL === 'string') {
    return `https://${env.VERCEL_URL}`
  }
  if (typeof env.NEXT_PUBLIC_APP_URL === 'string') {
    return env.NEXT_PUBLIC_APP_URL
  }
  return 'http://localhost:3000'
}
