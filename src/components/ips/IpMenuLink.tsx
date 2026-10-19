import type { IpMenuLinkProps } from '@/types/ips'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

/** One link of a menu; choosing it closes the menu. */
export function IpMenuLink({
  item,
  Icon,
  onSelect,
}: Readonly<IpMenuLinkProps>) {
  const className =
    'text-foreground hover:bg-accent focus-visible:bg-accent flex min-h-10 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors duration-150 focus-visible:outline-none'
  const body = (
    <>
      <Icon
        className="text-muted-foreground h-4 w-4 shrink-0"
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.external ? (
        <ArrowUpRight
          className="text-muted-foreground h-3.5 w-3.5 shrink-0"
          aria-hidden="true"
        />
      ) : null}
    </>
  )
  return (
    <li>
      {item.external ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSelect}
          className={className}
        >
          {body}
        </a>
      ) : (
        <Link
          href={item.href}
          scroll={false}
          onClick={onSelect}
          className={className}
        >
          {body}
        </Link>
      )}
    </li>
  )
}
