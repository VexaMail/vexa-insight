export function getBaseUrl(): string {
  if (typeof process.env.VERCEL_URL === 'string') {
    return `https://${process.env.VERCEL_URL}`
  }
  if (typeof process.env.NEXT_PUBLIC_APP_URL === 'string') {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  return 'http://localhost:3000'
}
