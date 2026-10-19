'use client'

import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import { PanelsTopLeft } from 'lucide-react'
import type { ProjectNameSectionProps } from './ProjectNameSectionProps'
import { SettingsSection } from './SettingsSection'

export function ProjectNameSection({
  projectName,
  onProjectNameChange,
}: ProjectNameSectionProps) {
  return (
    <SettingsSection
      anchorId="general"
      headingId="settings-project-name-heading"
      icon={<PanelsTopLeft />}
      title="General"
      description="The name shown in the sidebar and in browser titles."
    >
      <div className="max-w-xl">
        <label
          htmlFor="settings-project-name"
          className={SETTINGS_LABEL_CLASS_NAME}
        >
          Project name
        </label>
        <Input
          id="settings-project-name"
          type="text"
          value={projectName}
          maxLength={80}
          onChange={(event) => {
            onProjectNameChange(event.target.value)
          }}
          className={SETTINGS_INPUT_CLASS_NAME}
          aria-describedby="settings-project-name-help"
        />
        <p
          id="settings-project-name-help"
          className="text-muted-foreground mt-1.5 text-xs"
        >
          Use 1–80 characters.
        </p>
      </div>
    </SettingsSection>
  )
}
