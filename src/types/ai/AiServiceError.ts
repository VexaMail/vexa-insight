import type { AIServiceErrorCode } from './AiServiceErrorCode'

export type AIServiceError = {
  code: AIServiceErrorCode
  message: string
  providerMessage?: string
}
