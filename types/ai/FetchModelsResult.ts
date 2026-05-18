import type { ProviderModelInfo } from './ProviderModelInfo'

export type FetchModelsResult = {
  models: ProviderModelInfo[]
  error: string | null
}
