'use client'

import SelfUpdatePanel from './SelfUpdatePanel'
import UpdateAvailableCard from './UpdateAvailableCard'
import UpdateLastErrorNotice from './UpdateLastErrorNotice'
import type { UpdateStatusContentProps } from './UpdateStatusContentProps'
import UpdateStatusMetaGrid from './UpdateStatusMetaGrid'

export default function UpdateStatusContent({
  status,
  apiKey,
  handleCopyText,
}: Readonly<UpdateStatusContentProps>) {
  const updateAvailable = status.updateAvailable === true
  const showUpToDate = !updateAvailable && status.latestVersion != null

  return (
    <div className="space-y-4">
      <UpdateStatusMetaGrid status={status} />

      {updateAvailable ? (
        <UpdateAvailableCard
          latestUrl={status.latestUrl}
          onCopyText={handleCopyText}
        />
      ) : null}

      <SelfUpdatePanel apiKey={apiKey} updateAvailable={updateAvailable} />

      {showUpToDate ? (
        <p className="text-muted-foreground text-xs">
          You&rsquo;re on the latest stable release.
        </p>
      ) : null}

      {status.lastError ? (
        <UpdateLastErrorNotice message={status.lastError} />
      ) : null}

      {!status.enabled ? (
        <p className="text-muted-foreground text-xs">
          Update checks are disabled for this instance.
        </p>
      ) : null}
    </div>
  )
}
