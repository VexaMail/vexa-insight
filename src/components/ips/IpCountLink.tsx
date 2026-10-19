import type { IpCountLinkProps } from '@/types/ips'
import Link from 'next/link'

/** A small bordered count that opens the tab listing all of them. */
export function IpCountLink({ href, children }: Readonly<IpCountLinkProps>) {
  return (
    <Link
      href={href}
      scroll={false}
      className="border-border text-muted-foreground hover:text-foreground hover:bg-accent inline-flex h-7 items-center rounded-md border px-2 text-xs transition-colors duration-150"
    >
      {children}
    </Link>
  )
}
