import Link from 'next/link'
import type { BackButtonProps } from './BackButtonProps'

export function BackButton({ href, children }: Readonly<BackButtonProps>) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring -ml-2 inline-flex min-h-10 w-fit items-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
    >
      {children}
    </Link>
  )
}
