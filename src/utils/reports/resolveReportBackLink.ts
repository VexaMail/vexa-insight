import type { ReportBackLink } from '@/types/reports'

/** Back to the domain the report was opened from, else to the reports list. */
export function resolveReportBackLink(fromDomain: unknown): ReportBackLink {
  if (typeof fromDomain === 'string' && fromDomain.length > 0) {
    return {
      href: `/domains/${encodeURIComponent(fromDomain)}`,
      label: 'Domain overview',
    }
  }
  return { href: '/reports', label: 'Reports' }
}
