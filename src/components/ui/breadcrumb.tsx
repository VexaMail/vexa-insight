'use client'

import { breadcrumbLabel } from '@/utils/shell'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  if (paths.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground flex min-w-0 items-center gap-1.5 text-sm"
    >
      <Link
        href="/"
        className="hover:text-foreground flex items-center transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {paths.map((p, i) => {
        const href = `/${paths.slice(0, i + 1).join('/')}`
        const isLast = i === paths.length - 1
        const title = breadcrumbLabel(p)

        return (
          <Fragment key={href}>
            <ChevronRight className="h-3.5 w-3.5" />
            {isLast ? (
              <span
                className="text-foreground truncate font-medium"
                suppressHydrationWarning
              >
                {title}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground transition-colors"
                suppressHydrationWarning
              >
                {title}
              </Link>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
