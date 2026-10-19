import { THEME_BOOTSTRAP_SCRIPT } from '@/constants/shell'
import { headers } from 'next/headers'
import Script from 'next/script'

/** Applies the stored or system theme before first paint, with the CSP nonce. */
export default async function ThemeScript() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <Script id="theme-bootstrap" strategy="beforeInteractive" nonce={nonce}>
      {THEME_BOOTSTRAP_SCRIPT}
    </Script>
  )
}
