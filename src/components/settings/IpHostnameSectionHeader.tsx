'use client'

import { Globe } from 'lucide-react'

export function IpHostnameSectionHeader() {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-lg">
        <Globe className="h-4 w-4" />
      </div>
      <div>
        <h2
          id="settings-ip-hostname-heading"
          className="font-display text-foreground text-sm font-semibold"
        >
          IP to Hostname Lookup
        </h2>
        <p className="text-muted-foreground text-xs">
          Automatically resolve and cache hostnames for incoming IP addresses
        </p>
      </div>
    </div>
  )
}
