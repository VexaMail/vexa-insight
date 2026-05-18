export function getAllowedOriginsFromEnv(): string[] {
  return (process.env.VEXA_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
