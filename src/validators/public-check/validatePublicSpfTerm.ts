import { validatePublicSpfAddress } from './validatePublicSpfAddress'
import { validatePublicSpfHostMechanism } from './validatePublicSpfHostMechanism'

export function validatePublicSpfTerm(term: string): string | null {
  if (/^[a-z][\w.-]*=\S+$/i.test(term)) return null
  const mechanism = term.replace(/^[+?~-]/, '')
  if (/^ip[46]:/i.test(mechanism)) return validatePublicSpfAddress(mechanism)
  if (/^all$/i.test(mechanism)) return null
  if (/^(?:include|exists):\S+$/i.test(mechanism)) return null
  if (/^ptr(?::[^/\s]+)?$/i.test(mechanism)) return null
  return validatePublicSpfHostMechanism(mechanism)
}
