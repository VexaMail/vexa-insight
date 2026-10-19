import { DROPDOWN_MENU_ITEM_CLASS } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { DropdownMenuLinkItemProps } from '@/types/ui'
import Link from 'next/link'

/** A `DropdownMenu` item that navigates, downloads or opens another site. */
export function DropdownMenuLinkItem({
  href,
  icon,
  children,
  external = false,
  download = false,
  className,
}: Readonly<DropdownMenuLinkItemProps>) {
  const classes = cn(DROPDOWN_MENU_ITEM_CLASS, className)
  if (external || download) {
    return (
      <a
        href={href}
        role="menuitem"
        tabIndex={-1}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...(download ? { download: true } : {})}
      >
        {icon}
        {children}
      </a>
    )
  }
  return (
    <Link href={href} role="menuitem" tabIndex={-1} className={classes}>
      {icon}
      {children}
    </Link>
  )
}
