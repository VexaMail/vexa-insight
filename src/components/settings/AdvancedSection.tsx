'use client'

import { Input } from '@/components/ui'
import { m as motion } from 'framer-motion'
import { Server } from 'lucide-react'
import type { AdvancedSectionProps } from './AdvancedSectionProps'
import { EnvironmentSelect } from './EnvironmentSelect'
import { SettingsSectionHeader } from './SettingsSectionHeader'

export default function AdvancedSection({
  corsOrigins,
  environment,
  onCorsChange,
  onEnvironmentChange,
}: Readonly<AdvancedSectionProps>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-6"
      aria-labelledby="settings-advanced-heading"
    >
      <SettingsSectionHeader
        headingId="settings-advanced-heading"
        icon={<Server className="h-4 w-4" />}
        iconClassName="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-lg"
        title="Advanced"
        description="CORS, environment, and system configuration"
      />
      <div className="space-y-4">
        <div>
          <label
            htmlFor="settings-cors"
            className="text-foreground mb-1.5 block text-xs font-medium"
          >
            CORS origins (comma-separated)
          </label>
          <Input
            id="settings-cors"
            type="text"
            value={corsOrigins}
            onChange={(e) => {
              onCorsChange(e.target.value)
            }}
            className="bg-secondary border-border/50 text-xs"
          />
        </div>
        <EnvironmentSelect value={environment} onChange={onEnvironmentChange} />
      </div>
    </motion.section>
  )
}
