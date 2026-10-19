'use client'

import { useUpdateStatus } from '@/hooks/settings'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { SettingsSection } from './SettingsSection'
import UpdateStatusContent from './UpdateStatusContent'
import { UpdateStatusHeader } from './UpdateStatusHeader'
import type { UpdateStatusSectionProps } from './UpdateStatusSectionProps'

export default function UpdateStatusSection({
  apiKey,
}: Readonly<UpdateStatusSectionProps>) {
  const {
    status,
    isLoading,
    isRefreshing,
    error,
    handleRefreshClick,
    handleCopyText,
  } = useUpdateStatus(apiKey)
  const updateAvailable = status?.updateAvailable === true

  return (
    <SettingsSection
      anchorId="updates"
      headingId="settings-updates-heading"
      icon={updateAvailable ? <Sparkles /> : <CheckCircle2 />}
      title="Updates"
      description="Compares the installed version with the latest release. Notification only; never applied on its own."
      actions={
        <UpdateStatusHeader
          isRefreshing={isRefreshing}
          isLoading={isLoading}
          apiKey={apiKey}
          onRefresh={handleRefreshClick}
        />
      }
    >
      {isLoading && !status ? (
        <p className="text-muted-foreground text-xs">Loading…</p>
      ) : null}

      {status ? (
        <UpdateStatusContent
          status={status}
          apiKey={apiKey}
          handleCopyText={handleCopyText}
        />
      ) : null}

      {error ? <p className="text-danger mt-3 text-xs">{error}</p> : null}
    </SettingsSection>
  )
}
