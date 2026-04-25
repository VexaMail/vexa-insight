import type { DkimParsedRecord, DkimRecord } from '@/types/diagnostics'

export function parseDkimRecord(dkim: DkimRecord): DkimParsedRecord {
  const errors: string[] = []

  if (!dkim.record) {
    return {
      selector: dkim.selector,
      raw: null,
      valid: false,
      version: null,
      keyType: null,
      keyLengthBits: null,
      publicKeyPresent: false,
      errors: ['No DKIM record found for this selector.'],
    }
  }

  const record = dkim.record

  // Version
  const versionMatch = /v=([^;]+)/.exec(record)
  const version = versionMatch?.[1]?.trim() ?? null
  if (version && version !== 'DKIM1') {
    errors.push(`Invalid version: "${version}". Expected "DKIM1".`)
  }

  // Key type
  const keyTypeMatch = /k=([^;]+)/.exec(record)
  const keyType = keyTypeMatch?.[1]?.trim() ?? 'rsa'

  // Public key
  const publicKeyMatch = /p=([^;]*)/.exec(record)
  const publicKeyBase64 = publicKeyMatch?.[1]?.trim() ?? ''
  const publicKeyPresent = publicKeyBase64.length > 0

  if (!publicKeyPresent) {
    errors.push('Public key (p=) is empty or revoked.')
  }

  // Estimate key length from base64
  let keyLengthBits: number | null = null
  if (publicKeyPresent) {
    const byteLength = Math.ceil((publicKeyBase64.length * 3) / 4)
    keyLengthBits = byteLength * 8

    if (keyLengthBits < 1024) {
      errors.push(
        `Key length is approximately ${keyLengthBits} bits. Minimum recommended is 1024 bits.`,
      )
    } else if (keyLengthBits < 2048) {
      errors.push(
        `Key length is approximately ${keyLengthBits} bits. 2048 bits or higher is recommended for better security.`,
      )
    }
  }

  // Check for duplicate tags
  const tags = record.split(';').map((t) => t.trim().split('=')[0])
  const seen = new Set<string>()
  for (const tag of tags) {
    if (!tag || tag.length === 0) continue
    if (seen.has(tag)) {
      errors.push(`Duplicate tag "${tag}" found.`)
    }
    seen.add(tag)
  }

  return {
    selector: dkim.selector,
    raw: record,
    valid: dkim.valid && errors.length === 0,
    version,
    keyType,
    keyLengthBits,
    publicKeyPresent,
    errors,
  }
}
