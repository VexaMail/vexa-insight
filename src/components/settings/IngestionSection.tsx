'use client'

import { m as motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { IngestionDaysBackField } from './IngestionDaysBackField'
import { IngestionIntervalField } from './IngestionIntervalField'
import type { IngestionSectionProps } from './IngestionSectionProps'
import { SettingsSectionHeader } from './SettingsSectionHeader'

export default function IngestionSection({
  intervalMinutes,
  daysBack,
  onIntervalChange,
  onDaysBackChange,
}: Readonly<IngestionSectionProps>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6"
      aria-labelledby="settings-ingestion-heading"
    >
      <SettingsSectionHeader
        headingId="settings-ingestion-heading"
        icon={<Clock className="h-4 w-4" />}
        iconClassName="bg-warning/10 text-warning flex h-8 w-8 items-center justify-center rounded-lg"
        title="Ingestion Settings"
        description="How often to check mail and how far back each run looks. Older mail is only picked up by a full rescan."
      />
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <IngestionIntervalField
            value={intervalMinutes}
            onChange={onIntervalChange}
          />
          <IngestionDaysBackField
            value={daysBack}
            onChange={onDaysBackChange}
          />
        </div>
      </div>
    </motion.section>
  )
}
