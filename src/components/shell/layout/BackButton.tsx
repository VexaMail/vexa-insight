import Link from 'next/link'
import type { BackButtonProps } from './BackButtonProps'

export function BackButton({ href, children }: Readonly<BackButtonProps>) {
  return (
    <Link
      href={href}
      className="bg-foreground text-background hover:bg-foreground/90 focus-visible:outline-ring inline-flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {children}
    </Link>
  )
}
