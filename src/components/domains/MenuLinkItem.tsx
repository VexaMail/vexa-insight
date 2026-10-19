import { MENU_ITEM_CLASS } from '@/constants/domains'
import Link from 'next/link'
import type { MenuLinkItemProps } from './MenuLinkItemProps'

/** A menu row that navigates, in the app or to an external page. */
export function MenuLinkItem({
  href,
  icon,
  children,
  external = false,
  download = false,
}: Readonly<MenuLinkItemProps>) {
  if (external || download) {
    return (
      <a
        href={href}
        className={MENU_ITEM_CLASS}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...(download ? { download: true } : {})}
      >
        {icon}
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={MENU_ITEM_CLASS}>
      {icon}
      {children}
    </Link>
  )
}
