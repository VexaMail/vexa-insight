import { DEV_CSP_DIRECTIVES } from './devCspDirectives'

export function buildDevContentSecurityPolicy(): string {
  return DEV_CSP_DIRECTIVES.join('; ')
}
