'use client'

import {
  UPGRADE_COMMAND_DOCKER,
  UPGRADE_COMMAND_SOURCE,
  UPGRADE_COMMAND_WATCHTOWER,
} from '@/constants/updates'
import { ExternalLink } from 'lucide-react'
import type { UpdateAvailableCardProps } from './UpdateAvailableCardProps'
import UpgradeOption from './UpgradeOption'

export default function UpdateAvailableCard({
  latestUrl,
  onCopyText,
}: Readonly<UpdateAvailableCardProps>) {
  return (
    <div className="border-primary/30 bg-primary/5 rounded-md border p-3">
      <p className="text-foreground text-sm font-medium">
        A newer release is available.
      </p>
      {latestUrl ? (
        <a
          href={latestUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="text-primary mt-1 inline-flex items-center gap-1 text-xs hover:underline"
        >
          View release notes
          <ExternalLink className="h-3 w-3" />
        </a>
      ) : null}
      <div className="mt-3 space-y-2">
        <UpgradeOption
          title="Auto-update with Watchtower"
          badge="recommended"
          description="One-time setup. Watchtower polls the published image and recreates the container when a new release is published. Your database is preserved across restarts."
          command={UPGRADE_COMMAND_WATCHTOWER}
          onCopy={onCopyText}
        />
        <UpgradeOption
          title="Update Docker manually"
          description="Pull the latest published image and recreate the container."
          command={UPGRADE_COMMAND_DOCKER}
          onCopy={onCopyText}
        />
        <UpgradeOption
          title="Update from source"
          description="For non-Docker installs. Run on the host where the app is checked out."
          command={UPGRADE_COMMAND_SOURCE}
          onCopy={onCopyText}
        />
      </div>
    </div>
  )
}
