import type { AIServiceErrorCode } from '@/types/ai'

export class AIServiceErrorException extends Error {
  public readonly code: AIServiceErrorCode
  public readonly providerMessage?: string

  constructor(
    code: AIServiceErrorCode,
    message: string,
    providerMessage?: string,
  ) {
    super(message)
    this.name = 'AIServiceError'
    this.code = code
    if (providerMessage !== undefined) {
      this.providerMessage = providerMessage
    }
  }
}
