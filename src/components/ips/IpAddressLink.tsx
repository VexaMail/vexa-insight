import Link from 'next/link'
import type { IpAddressLinkProps } from './IpAddressLinkProps'

export function IpAddressLink({ ip, ipAsLink }: IpAddressLinkProps) {
  if (ipAsLink) {
    return (
      <Link
        href={`/ips/${encodeURIComponent(ip)}`}
        className="text-foreground hover:text-primary transition-colors"
      >
        <span className="truncate font-mono text-sm text-inherit">{ip}</span>
      </Link>
    )
  }

  return (
    <span className="text-foreground truncate font-mono text-sm">{ip}</span>
  )
}
