'use client'

import { Clock } from 'lucide-react'
import { IngestionDaysBackField } from './IngestionDaysBackField'
import { IngestionIntervalField } from './IngestionIntervalField'
import type { IngestionSectionProps } from './IngestionSectionProps'
import { SettingsSection } from './SettingsSection'

export default function IngestionSection({
  intervalMinutes,
  daysBack,
  onIntervalChange,
  onDaysBackChange,
}: Readonly<IngestionSectionProps>) {
  return (
    <SettingsSection
      anchorId="ingestion"
      headingId="settings-ingestion-heading"
      icon={<Clock />}
      title="Ingestion"
      description="How often to check mail and how far back each run looks. Older mail is only picked up by a full rescan."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <IngestionIntervalField
          value={intervalMinutes}
          onChange={onIntervalChange}
        />
        <IngestionDaysBackField value={daysBack} onChange={onDaysBackChange} />
      </div>
    </SettingsSection>
  )
}
