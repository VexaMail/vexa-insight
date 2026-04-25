'use client'

import { Input } from '@/components/ui'
import { m as motion } from 'framer-motion'
import { Server } from 'lucide-react'
import type { AdvancedSectionProps } from './AdvancedSectionProps'
import type { EnvironmentType } from './EnvironmentType'

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
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-lg">
          <Server className="h-4 w-4" />
        </div>
        <div>
          <h2
            id="settings-advanced-heading"
            className="font-display text-foreground text-sm font-semibold"
          >
            Advanced
          </h2>
          <p className="text-muted-foreground text-xs">
            CORS, environment, and system configuration
          </p>
        </div>
      </div>
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
            onChange={(e) => onCorsChange(e.target.value)}
            className="bg-secondary border-border/50 text-xs"
          />
        </div>
        <div>
          <label
            htmlFor="settings-environment"
            className="text-foreground mb-1.5 block text-xs font-medium"
          >
            Environment
          </label>
          <select
            id="settings-environment"
            value={environment}
            onChange={(e) =>
              onEnvironmentChange(e.target.value as EnvironmentType)
            }
            className="bg-secondary border-border/50 text-foreground h-9 w-full rounded-md border px-3 text-xs"
          >
            <option value="development">development</option>
            <option value="staging">staging</option>
            <option value="production">production</option>
          </select>
        </div>
      </div>
    </motion.section>
  )
}
