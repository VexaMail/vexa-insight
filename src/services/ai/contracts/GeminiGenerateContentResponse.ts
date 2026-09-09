/** The fields of a Gemini `generateContent` reply the adapter reads. */
export type GeminiGenerateContentResponse = {
  candidates: { content: { parts: { text: string }[] } }[]
  modelVersion?: string
  usageMetadata?: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
}
