/**
 * Rejects XML carrying DOCTYPE or ENTITY declarations before it reaches the
 * parser, closing the entity-expansion and external-entity vectors.
 */
export function assertSafeDmarcXml(rawXml: string): void {
  if (/<!DOCTYPE/i.test(rawXml) || /<!ENTITY/i.test(rawXml)) {
    throw new Error('DMARC XML must not contain DOCTYPE or ENTITY declarations')
  }
}
