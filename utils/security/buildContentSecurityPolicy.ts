import { DEV_CSP_DIRECTIVES } from './devCspDirectives'
import { PROD_CSP_DIRECTIVES } from './prodCspDirectives'

export function buildContentSecurityPolicy(isProd: boolean): string {
  const directives = isProd ? PROD_CSP_DIRECTIVES : DEV_CSP_DIRECTIVES
  return directives.join('; ')
}
