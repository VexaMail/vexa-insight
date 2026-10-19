import { CopyIconButton, EntityHeader } from '@/components/ui'
import type { IpDetailHeaderProps } from '@/types/ips'
import { formatCountryName } from '@/utils/ips'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { IpFlag } from './IpFlag'
import { IpHeaderActions } from './IpHeaderActions'
import { IpHeaderChips } from './IpHeaderChips'

/** The address with copy, its flag and hostname, facts and actions. */
export function IpDetailHeader({
  ctx,
  actions,
}: Readonly<IpDetailHeaderProps>) {
  const { data } = ctx
  return (
    <EntityHeader
      kind="Sending source"
      title={ctx.ip}
      mono
      titleAddon={
        <span className="flex min-w-0 items-center gap-3">
          <CopyIconButton value={ctx.ip} label="IP address" />
          <span className="hidden text-2xl sm:inline-flex">
            <IpFlag
              countryCode={data.countryCode}
              countryName={formatCountryName(data.countryCode)}
            />
          </span>
          {data.hostname ? (
            <Link
              href={ctx.tabs.dns.href}
              scroll={false}
              title="Reverse DNS and network"
              className="text-foreground hover:text-primary hidden min-w-0 items-center gap-1 font-mono text-base sm:inline-flex"
            >
              <span className="truncate">{data.hostname}</span>
              <ArrowUpRight
                className="text-muted-foreground h-4 w-4 shrink-0"
                aria-hidden="true"
              />
            </Link>
          ) : null}
        </span>
      }
      actions={<IpHeaderActions ctx={ctx} actions={actions} />}
      chips={<IpHeaderChips ctx={ctx} />}
    />
  )
}
