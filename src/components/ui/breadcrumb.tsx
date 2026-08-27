'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  if (paths.length === 0) return null

  return (
    <nav className="text-muted-foreground flex items-center space-x-1.5 text-xs">
      <Link
        href="/"
        className="hover:text-foreground flex items-center transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {paths.map((p, i) => {
        const href = `/${paths.slice(0, i + 1).join('/')}`
        const isLast = i === paths.length - 1
        let title = p.charAt(0).toUpperCase() + p.slice(1)

        // Truncate UUID style or long IDs
        if (title.length > 20 && !title.includes(' ')) {
          title = `${title.slice(0, 8)}...`
        }

        return (
          <Fragment key={href}>
            <ChevronRight className="h-3.5 w-3.5" />
            {isLast ? (
              <span
                className="text-foreground font-semibold tracking-tight"
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
