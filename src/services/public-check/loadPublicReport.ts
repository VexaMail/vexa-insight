import type { PublicDomainReport } from '../../types/public-check/PublicDomainReport'
import { cachePublicReport } from './cachePublicReport'
import { runPublicDomainCheck } from './runPublicDomainCheck'

export async function loadPublicReport(
  domain: string,
  selector?: string,
): Promise<PublicDomainReport> {
  return cachePublicReport(await runPublicDomainCheck(domain, selector))
}
