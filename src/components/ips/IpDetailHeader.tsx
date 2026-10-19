import { CopyIconButton, EntityHeader, StatusPill } from '@/components/ui'
import type { IpDetailHeaderProps } from '@/types/ips'
import { formatCountryName } from '@/utils/ips'
import { ArrowUpRight, Globe } from 'lucide-react'
import Link from 'next/link'
import { IpFlag } from './IpFlag'
import { IpHeaderActions } from './IpHeaderActions'
import { SourceCausePill } from './SourceCausePill'

/** IP with copy, country, reverse DNS, cause, named sender and actions. */
export function IpDetailHeader({
  ctx,
  actions,
}: Readonly<IpDetailHeaderProps>) {
  const { data, sender } = ctx
  const country = formatCountryName(data.countryCode)
  return (
    <EntityHeader
      kind="Sending source"
      title={ctx.ip}
      mono
      leading={
        <Globe className="text-primary h-7 w-7 shrink-0" aria-hidden="true" />
      }
      titleAddon={<CopyIconButton value={ctx.ip} label="IP address" />}
      actions={<IpHeaderActions ctx={ctx} actions={actions} />}
      chips={
        <>
          <span className="text-foreground inline-flex h-6 items-center gap-1.5 text-sm">
            <IpFlag countryCode={data.countryCode} countryName={country} />
            {country ?? 'Unknown country'}
          </span>
          <span aria-hidden className="bg-border h-4 w-px" />
          {data.hostname ? (
            <Link
              href={ctx.tabs.dns.href}
              scroll={false}
              title="Reverse DNS and network"
              className="text-foreground hover:text-primary inline-flex min-w-0 items-center gap-1 font-mono text-sm"
            >
              <span className="truncate">{data.hostname}</span>
              <ArrowUpRight
                className="text-muted-foreground h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
            </Link>
          ) : (
            <span className="text-muted-foreground text-sm">
              No reverse DNS
            </span>
          )}
          <SourceCausePill cause={ctx.cause} />
          {sender ? (
            <StatusPill tone="neutral">{sender.name}</StatusPill>
          ) : null}
        </>
      }
    />
  )
}
