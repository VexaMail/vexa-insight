/** The v= tag of a DKIM record and the error when it is not DKIM1. */
export function parseDkimVersion(record: string): {
  version: string | null
  error: string | null
} {
  const versionMatch = /v=([^;]+)/.exec(record)
  const version = versionMatch?.[1]?.trim() ?? null
  const error =
    version && version !== 'DKIM1'
      ? `Invalid version: "${version}". Expected "DKIM1".`
      : null
  return { version, error }
}
