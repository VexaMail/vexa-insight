import { getPublicDmarcTags } from './getPublicDmarcTags'

export function getEffectivePublicDmarcRecord(record: string): string {
  const tags = getPublicDmarcTags(record)
  if (tags.get('t')?.toLowerCase() !== 'y') return record
  const policy =
    tags.get('p')?.toLowerCase() === 'reject' ? 'quarantine' : 'none'
  return record.replace(/(^|;)\s*p\s*=[^;]*/i, `$1 p=${policy}`)
}
