import type { DkimParsedRecord } from '@/types/diagnostics'

/** The parsed shape of a selector whose DNS lookup returned nothing. */
export function missingDkimParsedRecord(selector: string): DkimParsedRecord {
  return {
    selector,
    raw: null,
    valid: false,
    version: null,
    keyType: null,
    keyLengthBits: null,
    publicKeyPresent: false,
    errors: ['No DKIM record found for this selector.'],
  }
}
