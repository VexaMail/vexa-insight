'use client'

import { trackPublicEvent } from './trackPublicEvent'

export function PublicInstallLink() {
  return (
    <a
      href="https://github.com/VexaMail/vexa-insight#quick-start"
      onClick={() => {
        trackPublicEvent('installation_click')
      }}
      className="bg-primary text-primary-foreground focus-visible:ring-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 font-semibold focus-visible:ring-2"
    >
      Install Vexa Insight for free
    </a>
  )
}
