import type { DmarcTagInfo } from '@/types/diagnostics'
import { dmarcDefaultTags } from './dmarcDefaultTags'
import { dmarcTagDescriptions } from './dmarcTagDescriptions'

export function parseDmarcTags(dmarcRecord: string): DmarcTagInfo[] {
  const tags = dmarcRecord
    .split(';')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)

  const result: DmarcTagInfo[] = []
  const foundTags = new Set<string>()

  for (const tag of tags) {
    const eqIdx = tag.indexOf('=')
    if (eqIdx === -1) continue

    const name = tag.substring(0, eqIdx).trim().toLowerCase()
    const value = tag.substring(eqIdx + 1).trim()
    foundTags.add(name)

    const describer = dmarcTagDescriptions[name]
    const description = describer
      ? describer(value)
      : `Tag "${name}" with value "${value}".`

    result.push({ tag: `${name}=${value}`, value, description })
  }

  // Add defaults for tags not explicitly set
  for (const [defaultTag, defaultValue] of Object.entries(dmarcDefaultTags)) {
    if (!foundTags.has(defaultTag)) {
      const describer = dmarcTagDescriptions[defaultTag]
      const description = describer
        ? `${describer(defaultValue)} (default value)`
        : `Default value for ${defaultTag}.`

      result.push({
        tag: `${defaultTag}=${defaultValue}`,
        value: defaultValue,
        description,
      })
    }
  }

  return result
}
