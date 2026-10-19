import { isPublicDnsName } from '@/utils/diagnostics'
import { extractSpfChildDomains } from './extractSpfChildDomains'

/**
 * The include and redirect targets of a candidate record that are not public
 * DNS names. A planned record is typed by a user, so it must not make this
 * server resolve names that only exist on its own network.
 */
export function findNonPublicSpfTargets(record: string): string[] {
  return extractSpfChildDomains(record).filter(
    (target) => !isPublicDnsName(target),
  )
}
