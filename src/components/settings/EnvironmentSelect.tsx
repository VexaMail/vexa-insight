'use client'

import {
  SETTINGS_CONTROL_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import type { EnvironmentSelectProps } from './EnvironmentSelectProps'
import type { EnvironmentType } from './EnvironmentType'

export function EnvironmentSelect({ value, onChange }: EnvironmentSelectProps) {
  return (
    <div>
      <label
        htmlFor="settings-environment"
        className={SETTINGS_LABEL_CLASS_NAME}
      >
        Environment
      </label>
      <select
        id="settings-environment"
        value={value}
        onChange={(e) => {
          onChange(e.target.value as EnvironmentType)
        }}
        className={SETTINGS_CONTROL_CLASS_NAME}
      >
        <option value="development">development</option>
        <option value="staging">staging</option>
        <option value="production">production</option>
      </select>
    </div>
  )
}
