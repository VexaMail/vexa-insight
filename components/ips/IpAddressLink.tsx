import Link from 'next/link'
import type { IpAddressLinkProps } from './IpAddressLinkProps'

export function IpAddressLink({ ip, ipAsLink }: IpAddressLinkProps) {
  const content = (
    <span className="truncate font-mono text-sm text-zinc-900 dark:text-zinc-50">
      {ip}
    </span>
  )

  if (ipAsLink) {
    return (
      <Link
        href={`/ips/${encodeURIComponent(ip)}`}
        className="hover:text-primary text-zinc-900 transition-colors dark:text-zinc-50"
      >
        <span className="truncate font-mono text-sm text-inherit">{ip}</span>
      </Link>
    )
  }

  return content
}
