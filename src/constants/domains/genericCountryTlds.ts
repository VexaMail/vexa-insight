/**
 * Country-code TLDs sold as generic names, so a flag would mislead: a `.io`
 * domain says nothing about the British Indian Ocean Territory.
 */
export const GENERIC_COUNTRY_TLDS: ReadonlySet<string> = new Set([
  'ai',
  'cc',
  'co',
  'fm',
  'io',
  'me',
  'tv',
  'ws',
])
