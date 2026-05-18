'use client'

import { APP_VERSION } from '@/constants/app'
import { useSidebarVersionStatus } from '@/hooks/shell'

/**
 * Footer badge shown at the bottom of the sidebar.
 * Renders the current app version and, if a newer release is detected,
 * a discreet pulse-dot link pointing the admin to the Settings page.
 */
export default function SidebarVersionStatus() {
  const { status } = useSidebarVersionStatus()
  const updateAvailable = status?.updateAvailable === true
  const latest = status?.latestVersion

  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-muted-foreground/50 text-center text-[10px]">
        Vexa Insight v{APP_VERSION}
      </p>
      {updateAvailable && latest ? (
        <a
          href="/settings"
          className="text-primary inline-flex items-center gap-1.5 text-[10px] font-medium hover:underline"
          aria-label={`Update available: v${latest}`}
        >
          <span
            aria-hidden="true"
            className="bg-primary inline-block h-1.5 w-1.5 animate-pulse rounded-full"
          />
          Update available: v{latest}
        </a>
      ) : null}
    </div>
  )
}
