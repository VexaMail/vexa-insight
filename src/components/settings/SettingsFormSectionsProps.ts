import type { useSettingsConfig } from '@/hooks/settings'

export type SettingsFormSectionsProps = {
  readonly settings: ReturnType<typeof useSettingsConfig>
}
