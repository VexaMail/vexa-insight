'use client'

import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import { Server } from 'lucide-react'
import type { AdvancedSectionProps } from './AdvancedSectionProps'
import { EnvironmentSelect } from './EnvironmentSelect'
import { SettingsSection } from './SettingsSection'

export default function AdvancedSection({
  corsOrigins,
  environment,
  onCorsChange,
  onEnvironmentChange,
}: Readonly<AdvancedSectionProps>) {
  return (
    <SettingsSection
      anchorId="advanced"
      headingId="settings-advanced-heading"
      icon={<Server />}
      title="Advanced"
      description="Allowed CORS origins and the environment this instance reports."
    >
      <div className="grid max-w-xl gap-4">
        <div>
          <label htmlFor="settings-cors" className={SETTINGS_LABEL_CLASS_NAME}>
            CORS origins
          </label>
          <Input
            id="settings-cors"
            type="text"
            value={corsOrigins}
            onChange={(e) => {
              onCorsChange(e.target.value)
            }}
            className={`${SETTINGS_INPUT_CLASS_NAME} font-mono`}
            aria-describedby="settings-cors-help"
          />
          <p
            id="settings-cors-help"
            className="text-muted-foreground mt-1.5 text-xs"
          >
            Comma-separated, scheme included.
          </p>
        </div>
        <EnvironmentSelect value={environment} onChange={onEnvironmentChange} />
      </div>
    </SettingsSection>
  )
}
