/** The system-then-user message pair of an OpenAI-compatible chat request. */
export function buildChatMessages(systemPrompt: string, userPrompt: string) {
  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]
}
