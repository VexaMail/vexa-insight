import { validateDmarcTag } from '@/validators/diagnostics'
import { VALID_DMARC_POLICIES } from './validDmarcPolicies'
import { VALID_DMARC_TAGS } from './validDmarcTags'

/**
 * Validates a DMARC record string and returns an array of warnings.
 * Returns empty array if the record is syntactically valid.
 */
export function extractDmarcWarnings(dmarcRecord: string): string[] {
  const warnings: string[] = []

  if (!dmarcRecord.startsWith('v=DMARC1')) {
    warnings.push('Record must start with v=DMARC1.')
    return warnings
  }

  const tags = dmarcRecord
    .split(';')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)

  const tagNames = new Set<string>()
  for (const tag of tags) {
    const eqIdx = tag.indexOf('=')
    if (eqIdx === -1) {
      warnings.push(`Tag "${tag}" has no value (missing "=").`)
      continue
    }
    const name = tag.substring(0, eqIdx).trim().toLowerCase()
    if (name === 'v') {
      tagNames.add(name)
      continue
    }
    if (tagNames.has(name)) {
      warnings.push(`Duplicate tag "${name}".`)
    }
    tagNames.add(name)
    if (!VALID_DMARC_TAGS.has(name)) {
      warnings.push(`Unknown tag "${name}".`)
    }
    const value = tag.substring(eqIdx + 1).trim()
    const tagWarning = validateDmarcTag(name, value, VALID_DMARC_POLICIES)
    if (tagWarning) warnings.push(tagWarning)
  }

  if (!tagNames.has('p')) {
    warnings.push('Required tag "p" (policy) is missing.')
  }

  return warnings
}
