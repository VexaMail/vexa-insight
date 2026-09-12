'use client'

import { Input } from '@/components/ui'
import { PanelsTopLeft } from 'lucide-react'
import type { ProjectNameSectionProps } from './ProjectNameSectionProps'
import { SettingsSectionHeader } from './SettingsSectionHeader'

export function ProjectNameSection({
  projectName,
  onProjectNameChange,
}: ProjectNameSectionProps) {
  return (
    <section
      className="glass-card p-6"
      aria-labelledby="settings-project-name-heading"
    >
      <SettingsSectionHeader
        headingId="settings-project-name-heading"
        icon={<PanelsTopLeft className="h-4 w-4" />}
        iconClassName="bg-brand-100 text-brand-700 flex h-8 w-8 items-center justify-center rounded-lg"
        title="Project identity"
        description="Choose the name shown in the dashboard sidebar and browser titles."
      />
      <label
        htmlFor="settings-project-name"
        className="text-foreground mb-1.5 block text-xs font-medium"
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
        className="bg-secondary border-border/50 text-xs"
        aria-describedby="settings-project-name-help"
      />
      <p
        id="settings-project-name-help"
        className="text-muted-foreground mt-1 text-xs"
      >
        Use 1–80 characters.
      </p>
    </section>
  )
}
