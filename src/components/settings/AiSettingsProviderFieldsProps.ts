import type { ProviderModelInfo } from '@/types/ai'
import type {
  AiSettingsFormState,
  AiSettingsSaveStatus,
} from '@/types/settings'

export type AiSettingsProviderFieldsProps = {
  readonly form: AiSettingsFormState
  readonly apiKeyMasked: string | null
  readonly isConfigured: boolean
  readonly saveStatus: AiSettingsSaveStatus
  readonly models: ProviderModelInfo[]
  readonly isLoadingModels: boolean
  readonly modelsError: string | null
  readonly onApiKeyChange: (value: string) => void
  readonly onModelChange: (value: string) => void
  readonly onSave: () => Promise<void>
  readonly onClear: () => Promise<void>
}
