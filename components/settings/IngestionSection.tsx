'use client'

import { Input } from '@/components/ui'
import { DEFAULT_DAYS_BACK } from '@/utils/install'
import { m as motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import type { IngestionSectionProps } from './IngestionSectionProps'

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
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-warning/10 text-warning flex h-8 w-8 items-center justify-center rounded-lg">
          <Clock className="h-4 w-4" />
        </div>
        <div>
          <h2
            id="settings-ingestion-heading"
            className="font-display text-foreground text-sm font-semibold"
          >
            Ingestion Settings
          </h2>
          <p className="text-muted-foreground text-xs">
            How often to check mail and how far back each run looks. Older mail
            is only picked up by a full rescan.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="settings-ingestion-interval"
              className="text-foreground mb-1.5 block text-xs font-medium"
            >
              Interval (minutes)
            </label>
            <Input
              id="settings-ingestion-interval"
              type="number"
              min={1}
              max={1440}
              value={intervalMinutes}
              onChange={(e) =>
                onIntervalChange(parseInt(e.target.value, 10) || 60)
              }
              className="bg-secondary border-border/50 text-xs"
            />
          </div>
          <div>
            <label
              htmlFor="settings-ingestion-days"
              className="text-foreground mb-1.5 block text-xs font-medium"
            >
              Days back
            </label>
            <Input
              id="settings-ingestion-days"
              type="number"
              min={1}
              max={365}
              value={daysBack}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10)
                onDaysBackChange(
                  Number.isFinite(n) && n >= 1 ? n : DEFAULT_DAYS_BACK,
                )
              }}
              className="bg-secondary border-border/50 text-xs"
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
