'use client'

import type { IngestTabButtonProps } from './IngestTabButtonProps'

export function IngestTabButton({
  active,
  onClick,
  children,
}: Readonly<IngestTabButtonProps>) {
  return (
    <button
      className={`font-display focus-visible:ring-ring shrink-0 cursor-pointer border-b-2 px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none sm:px-4 ${
        active
          ? 'border-primary text-foreground'
          : 'text-muted-foreground hover:border-border hover:text-foreground border-transparent'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
