import type { DkimParsedRecord, DkimRecord } from '@/types/diagnostics'
import { findDuplicateDkimTags } from './findDuplicateDkimTags'
import { missingDkimParsedRecord } from './missingDkimParsedRecord'
import { parseDkimPublicKey } from './parseDkimPublicKey'
import { parseDkimVersion } from './parseDkimVersion'

export function parseDkimRecord(dkim: DkimRecord): DkimParsedRecord {
  if (!dkim.record) {
    return missingDkimParsedRecord(dkim.selector)
  }
  const record = dkim.record
  const errors: string[] = []

  const { version, error: versionError } = parseDkimVersion(record)
  if (versionError) errors.push(versionError)

  const keyTypeMatch = /k=([^;]+)/.exec(record)
  const keyType = keyTypeMatch?.[1]?.trim() ?? 'rsa'

  const publicKey = parseDkimPublicKey(record, keyType)
  errors.push(...publicKey.errors)
  errors.push(...findDuplicateDkimTags(record))

  return {
    selector: dkim.selector,
    raw: record,
    valid: dkim.valid && errors.length === 0,
    version,
    keyType,
    keyLengthBits: publicKey.keyLengthBits,
    publicKeyPresent: publicKey.publicKeyPresent,
    errors,
  }
}
