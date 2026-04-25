import { MIN_LENGTH } from './minLength'

/**
 * Returns a random hex string of at least MIN_LENGTH characters for use as API key.
 */
function generateApiKey(): string {
  const bytes = Math.ceil(MIN_LENGTH / 2)
  const array = new Uint8Array(bytes)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array)
  }
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

export { generateApiKey }
