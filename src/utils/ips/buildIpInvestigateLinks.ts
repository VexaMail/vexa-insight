import type { IpDetailContext, IpMenuItem } from '@/types/ips'

/**
 * Where to go next from a source: each related domain's diagnostics, the
 * source's reports, its DNS and network facts and its event timeline.
 */
export function buildIpInvestigateLinks(ctx: IpDetailContext): IpMenuItem[] {
  const diagnostics = (ctx.domains ?? [])
    .slice(0, 5)
    .map((row): IpMenuItem => ({
      key: `diagnostics-${row.domain}`,
      kind: 'diagnostics',
      label: `Diagnostics of ${row.domain}`,
      href: `/diagnostics/${encodeURIComponent(row.domain)}`,
    }))
  return [
    ...diagnostics,
    {
      key: 'reports',
      kind: 'reports',
      label: 'Reports from this source',
      href: ctx.tabs.reports.href,
    },
    {
      key: 'dns',
      kind: 'dns',
      label: 'DNS and network',
      href: ctx.tabs.dns.href,
    },
    {
      key: 'timeline',
      kind: 'timeline',
      label: 'Event timeline',
      href: ctx.tabs.timeline.href,
    },
  ]
}
